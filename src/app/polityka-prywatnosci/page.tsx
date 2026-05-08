import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Polityka prywatności | Nawio",
  description: "Polityka prywatności Nawio — zasady przetwarzania danych i prawa użytkownika.",
  alternates: { canonical: "https://nawio.pl/polityka-prywatnosci" },
};

/**
 * Strona polityki prywatności landingu.
 *
 * @author Mihu
 */
export default function PolitykaPrywatnosciPage() {
  return (
    <main className="container-main py-12">
      <div className="card-luxe space-y-6 p-8">
        <h1 className="section-title">Polityka prywatności</h1>
        <p className="section-subtitle">
          Administrator danych: [Twoja spółka] z siedzibą w [adres]. To wersja robocza — Mihu uzupełni finalny tekst po konsultacji
          z prawnikiem.
        </p>
        <section className="space-y-2 text-sm text-[#c9d3e6]">
          <h2 className="text-2xl text-white">Jakie dane zbieramy</h2>
          <p>Email użytkownika, dane spółki niezbędne do działania aplikacji, historię operacji w systemie.</p>
        </section>
        <section className="space-y-2 text-sm text-[#c9d3e6]">
          <h2 className="text-2xl text-white">Cel przetwarzania</h2>
          <p>Świadczenie usługi Nawio, bezpieczeństwo konta, komunikacja dotycząca działania usługi.</p>
        </section>
        <section className="space-y-2 text-sm text-[#c9d3e6]">
          <h2 className="text-2xl text-white">Prawa użytkownika</h2>
          <p>Prawo dostępu do danych, poprawiania, usunięcia, ograniczenia przetwarzania oraz wniesienia sprzeciwu.</p>
        </section>
        <section className="space-y-2 text-sm text-[#c9d3e6]">
          <h2 className="text-2xl text-white">Kontakt</h2>
          <p>W sprawach danych osobowych: hej@nawio.pl</p>
        </section>
        <Link href="/" className="inline-flex rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm text-[#d6dcea] hover:border-[var(--gold)]">
          Powrót na stronę główną
        </Link>
      </div>
    </main>
  );
}
