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
    <main className="container-main py-12 md:py-16">
      <div className="card-luxe space-y-6 p-8 md:p-10">
        <h1 className="section-title">Polityka prywatności</h1>
        <p className="section-subtitle">Poniżej opisujemy jak przetwarzamy dane osobowe użytkowników serwisu Nawio.</p>
        <section className="space-y-2 text-sm leading-relaxed text-[#c9d3e6]">
          <h2 className="text-3xl text-white">Administrator danych</h2>
          <p>
            Administratorem danych osobowych jest BearStone sp. z o.o., ul. Czarnuszki 6, 05-071 Grabina, NIP:
            822-241-91-52.
          </p>
          <p>Kontakt w sprawach prywatności: hej@nawio.pl.</p>
        </section>
        <section className="space-y-2 text-sm leading-relaxed text-[#c9d3e6]">
          <h2 className="text-3xl text-white">Jakie dane zbieramy</h2>
          <p>
            Przetwarzamy dane podane podczas korzystania z usługi, w szczególności: adres email, dane organizacyjne
            spółki, dane techniczne i historię operacji niezbędną do działania i bezpieczeństwa systemu.
          </p>
        </section>
        <section className="space-y-2 text-sm leading-relaxed text-[#c9d3e6]">
          <h2 className="text-3xl text-white">Cel przetwarzania</h2>
          <p>
            Dane są przetwarzane w celu świadczenia usługi Nawio, utrzymania bezpieczeństwa konta i infrastruktury,
            kontaktu z użytkownikiem oraz realizacji obowiązków prawnych.
          </p>
        </section>
        <section className="space-y-2 text-sm leading-relaxed text-[#c9d3e6]">
          <h2 className="text-3xl text-white">Podmioty przetwarzające</h2>
          <p>
            Korzystamy z usług podmiotów przetwarzających dane na nasze zlecenie, w szczególności Supabase (hosting
            bazy danych i uwierzytelnianie) oraz Vercel (hosting aplikacji i infrastruktura deploymentu).
          </p>
        </section>
        <section className="space-y-2 text-sm leading-relaxed text-[#c9d3e6]">
          <h2 className="text-3xl text-white">Pliki cookies</h2>
          <p>W serwisie używamy plików cookies i podobnych technologii w następujących kategoriach:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Niezbędne — wymagane do działania strony, logowania i utrzymania sesji.</li>
            <li>Analityczne — pomagają mierzyć użycie serwisu i poprawiać jego działanie.</li>
            <li>Funkcjonalne — zapamiętują wybrane ustawienia oraz preferencje użytkownika.</li>
          </ul>
        </section>
        <section className="space-y-2 text-sm leading-relaxed text-[#c9d3e6]">
          <h2 className="text-3xl text-white">Prawa użytkownika</h2>
          <p>
            Użytkownikowi przysługuje prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia
            przetwarzania, wniesienia sprzeciwu oraz prawo do przenoszenia danych w zakresie wynikającym z przepisów
            RODO.
          </p>
          <p>
            Wnioski dotyczące realizacji praw można kierować na adres: hej@nawio.pl. W przypadku uznania, że dane są
            przetwarzane niezgodnie z prawem, przysługuje także prawo wniesienia skargi do Prezesa UODO.
          </p>
        </section>
        <Link href="/" className="btn-ghost inline-flex rounded-md px-4 py-2 text-sm font-medium">
          Powrót na stronę główną
        </Link>
      </div>
    </main>
  );
}
