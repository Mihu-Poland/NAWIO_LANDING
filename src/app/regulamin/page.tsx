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
    <main className="container-main py-12 md:py-16">
      <div className="card-luxe space-y-6 p-8 md:p-10">
        <h1 className="section-title">Regulamin</h1>
        <p className="section-subtitle">Regulamin określa zasady korzystania z serwisu i aplikacji Nawio.</p>
        <section className="space-y-2 text-sm leading-relaxed text-[#c9d3e6]">
          <h2 className="text-3xl text-white">Usługodawca</h2>
          <p>Usługodawcą serwisu Nawio jest BearStone sp. z o.o., ul. Czarnuszki 6, 05-071 Grabina, NIP: 822-241-91-52.</p>
          <p>Kontakt: hej@nawio.pl.</p>
        </section>
        <section className="space-y-2 text-sm leading-relaxed text-[#c9d3e6]">
          <h2 className="text-3xl text-white">Definicje</h2>
          <p>Usługa, Użytkownik, Spółka — definicje podstawowych pojęć wykorzystywanych w regulaminie.</p>
        </section>
        <section className="space-y-2 text-sm leading-relaxed text-[#c9d3e6]">
          <h2 className="text-3xl text-white">Zakres usługi</h2>
          <p>
            Nawio jest narzędziem IT wspierającym organizację formalności spółek, w tym przypomnienia o terminach i
            przygotowanie dokumentów na bazie wzorów.
          </p>
        </section>
        <section className="space-y-2 text-sm leading-relaxed text-[#c9d3e6]">
          <h2 className="text-3xl text-white">Zastrzeżenie prawne</h2>
          <p>
            Nawio nie jest kancelarią prawną i nie świadczy usług doradztwa prawnego ani podatkowego. Treści
            udostępniane w systemie mają charakter informacyjny.
          </p>
        </section>
        <section className="space-y-2 text-sm leading-relaxed text-[#c9d3e6]">
          <h2 className="text-3xl text-white">Odpowiedzialność</h2>
          <p>
            Użytkownik ponosi odpowiedzialność za weryfikację poprawności i kompletności dokumentów przed ich użyciem.
            BearStone sp. z o.o. nie ponosi odpowiedzialności za skutki wykorzystania dokumentów bez takiej
            weryfikacji, z zastrzeżeniem bezwzględnie obowiązujących przepisów prawa.
          </p>
        </section>
        <Link href="/" className="btn-ghost inline-flex rounded-md px-4 py-2 text-sm font-medium">
          Powrót na stronę główną
        </Link>
      </div>
    </main>
  );
}
