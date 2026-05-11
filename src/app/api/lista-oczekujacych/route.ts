import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.email(),
  plan: z.enum(["solo", "biuro"]),
});

/**
 * Obsługuje zapis na listę oczekujących planów płatnych.
 *
 * @param request Żądanie HTTP z danymi formularza.
 * @returns Odpowiedź API z wynikiem zapisu.
 *
 * @author Mihu
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey || !resendApiKey) {
      return NextResponse.json({ error: "Brak konfiguracji środowiska." }, { status: 500 });
    }

    const payload = waitlistSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json({ error: "Niepoprawne dane wejściowe." }, { status: 400 });
    }

    const { email, plan } = payload.data;
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const existing = await supabase
      .from("lista_oczekujacych")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing.error) {
      return NextResponse.json({ error: "Nie udało się sprawdzić listy oczekujących." }, { status: 500 });
    }

    if (existing.data) {
      return NextResponse.json({ status: "exists", message: "Już jesteś na liście!" });
    }

    const insertResult = await supabase.from("lista_oczekujacych").insert({
      email,
      plan,
    });

    if (insertResult.error) {
      return NextResponse.json({ error: "Nie udało się zapisać na listę." }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);
    const planName = plan === "solo" ? "Solo" : "Biuro";

    await resend.emails.send({
      from: "Formularz Nawio <przypomnienia@nawio.pl>",
      to: email,
      subject: `Jesteś na liście — Nawio ${planName}`,
      html: `
        <h2>Jesteś na liście oczekujących</h2>
        <p>Zapisałeś się na listę oczekujących na plan <strong>${planName}</strong>.</p>
        <p>Damy znać gdy uruchomimy płatności. Tymczasem korzystaj z planu Free!</p>
        <p style="margin-top: 20px;">
          <a href="https://app.nawio.pl" style="display:inline-block;padding:10px 16px;background:#D4A843;color:#1b2334;text-decoration:none;border-radius:6px;font-weight:600;">
            Przejdź do Nawio
          </a>
        </p>
      `,
    });

    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ error: "Wystąpił błąd serwera." }, { status: 500 });
  }
}
