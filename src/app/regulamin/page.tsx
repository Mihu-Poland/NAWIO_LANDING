import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Regulamin | Nawio",
  description: "Podstawowy regulamin korzystania z usługi Nawio.",
  alternates: { canonical: "https://nawio.pl/regulamin" },
};

/**
 * Strona regulaminu landingu.
 *
 * @author Mihu
 */
export default function RegulaminPage() {
  return (
    <main className="container-main py-12">
      <div className="card-luxe space-y-6 p-8">
        <h1 className="section-title">Regulamin</h1>
        <p className="section-subtitle">
          Wersja robocza regulaminu — Mihu uzupełni finalny dokument po konsultacji z prawnikiem.
        </p>
        <section className="space-y-2 text-sm text-[#c9d3e6]">
          <h2 className="text-2xl text-white">Definicje</h2>
          <p>Usługa, Użytkownik, Spółka — definicje podstawowych pojęć wykorzystywanych w regulaminie.</p>
        </section>
        <section className="space-y-2 text-sm text-[#c9d3e6]">
          <h2 className="text-2xl text-white">Zakres usługi</h2>
          <p>Nawio udostępnia narzędzia informacyjne i organizacyjne dla właścicieli sp. z o.o.</p>
        </section>
        <section className="space-y-2 text-sm text-[#c9d3e6]">
          <h2 className="text-2xl text-white">Zastrzeżenie prawne</h2>
          <p>Nawio nie jest kancelarią prawną i nie świadczy usług doradztwa prawnego ani podatkowego.</p>
        </section>
        <section className="space-y-2 text-sm text-[#c9d3e6]">
          <h2 className="text-2xl text-white">Odpowiedzialność</h2>
          <p>Usługa ma charakter informacyjny. Odpowiedzialność jest ograniczona do zakresu przewidzianego prawem.</p>
        </section>
        <Link href="/" className="inline-flex rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm text-[#d6dcea] hover:border-[var(--gold)]">
          Powrót na stronę główną
        </Link>
      </div>
    </main>
  );
}
