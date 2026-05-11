import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactPayloadSchema = z.object({
  fullName: z.string().min(1),
  email: z.email(),
  message: z.string().min(20),
});

const HOUR_IN_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_HOUR = 3;
const ipRateLimitStore = new Map<string, number[]>();

/**
 * Odczytuje IP klienta z nagłówków żądania.
 *
 * @param request Obiekt żądania HTTP.
 * @returns Tekstowa reprezentacja IP lub fallback.
 */
function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

/**
 * Sprawdza limit wiadomości dla IP w oknie jednej godziny.
 *
 * @param ip Adres IP klienta.
 * @returns Informacja czy można przyjąć kolejną wiadomość.
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const recentTimestamps = (ipRateLimitStore.get(ip) ?? []).filter((timestamp) => now - timestamp < HOUR_IN_MS);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_HOUR) {
    ipRateLimitStore.set(ip, recentTimestamps);
    return false;
  }

  recentTimestamps.push(now);
  ipRateLimitStore.set(ip, recentTimestamps);
  return true;
}

/**
 * Escapuje znaki HTML w przesyłanej treści.
 *
 * @param value Surowy tekst wejściowy.
 * @returns Bezpieczny tekst do użycia w HTML.
 */
function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Obsługuje wysyłkę wiadomości z formularza kontaktowego.
 *
 * @param request Obiekt przychodzącego żądania.
 * @returns Odpowiedź API z wynikiem operacji.
 *
 * @author Mihu
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Brak konfiguracji RESEND_API_KEY." }, { status: 500 });
    }

    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Przekroczono limit wiadomości. Spróbuj ponownie później." }, { status: 429 });
    }

    const rawPayload = await request.json();
    const validation = contactPayloadSchema.safeParse(rawPayload);
    if (!validation.success) {
      return NextResponse.json({ error: "Niepoprawne dane formularza." }, { status: 400 });
    }

    const payload = validation.data;
    const resend = new Resend(apiKey);

    const fullName = escapeHtml(payload.fullName.trim());
    const replyEmail = payload.email.trim();
    const message = escapeHtml(payload.message.trim());
    const firstName = fullName.split(" ")[0] || fullName;

    await resend.emails.send({
      from: "Formularz Nawio <przypomnienia@nawio.pl>",
      to: "hej@nawio.pl",
      subject: `Nowa wiadomość od ${firstName} — nawio.pl`,
      replyTo: replyEmail,
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Imię i nazwisko:</strong> ${fullName}</p>
        <p><strong>Email zwrotny:</strong> ${escapeHtml(replyEmail)}</p>
        <p><strong>Treść wiadomości:</strong></p>
        <p>${message.replaceAll("\n", "<br />")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Wystąpił błąd serwera." }, { status: 500 });
  }
}
