import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  fullName: string;
  email: string;
  companyName?: string;
  message: string;
  privacyAccepted: boolean;
  website?: string;
};

/**
 * Sprawdza podstawowy format adresu email.
 *
 * @param email Adres email do weryfikacji.
 * @returns Informacja czy email ma poprawny format.
 */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Waliduje dane formularza po stronie serwera.
 *
 * @param payload Dane przesłane w żądaniu.
 * @returns Błąd walidacji lub null, gdy dane są poprawne.
 */
function validatePayload(payload: ContactPayload): string | null {
  if (!payload.fullName?.trim()) {
    return "Brak imienia i nazwiska.";
  }

  if (!payload.email?.trim() || !isValidEmail(payload.email)) {
    return "Niepoprawny email.";
  }

  if (!payload.message?.trim()) {
    return "Brak wiadomości.";
  }

  if (!payload.privacyAccepted) {
    return "Brak akceptacji polityki prywatności.";
  }

  if (payload.website?.trim()) {
    return "Spam detected.";
  }

  return null;
}

/**
 * Tworzy bezpieczny tekst HTML wiadomości kontaktowej.
 *
 * @param value Surowa wartość tekstowa.
 * @returns Wartość z escapowaniem znaków HTML.
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
 * Obsługuje wysyłkę formularza kontaktowego z landingu.
 *
 * @param request Obiekt przychodzącego żądania HTTP.
 * @returns Odpowiedź JSON z wynikiem operacji.
 *
 * @author Mihu
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Brak konfiguracji email." }, { status: 500 });
    }

    const payload = (await request.json()) as ContactPayload;
    const validationError = validatePayload(payload);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const resend = new Resend(apiKey);

    const fullName = escapeHtml(payload.fullName.trim());
    const email = escapeHtml(payload.email.trim());
    const companyName = escapeHtml((payload.companyName ?? "").trim());
    const message = escapeHtml(payload.message.trim());

    await resend.emails.send({
      from: "Nawio Contact <onboarding@resend.dev>",
      to: "hej@nawio.pl",
      subject: `Nowa wiadomość z formularza: ${fullName}`,
      replyTo: payload.email.trim(),
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Imię i nazwisko:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nazwa spółki:</strong> ${companyName || "Nie podano"}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${message.replaceAll("\n", "<br />")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Nie udało się wysłać wiadomości." }, { status: 500 });
  }
}
