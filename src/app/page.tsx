import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    title: "Kalendarz korporacyjny",
    description:
      "Pilnuje terminów KRS, ZUS i US. Przypomina o zgromadzeniach, sprawozdaniach i obowiązkach formalnych.",
  },
  {
    title: "Kreator dokumentów",
    description:
      "Uchwały, protokoły i umowy gotowe w kilka minut. Dane spółki podstawiają się automatycznie.",
  },
  {
    title: "Asystent AI Nawio",
    description:
      "Nawigator korporacyjny, który wskazuje co zrobić i kiedy. Bez prawniczego bełkotu, z podstawą prawną.",
  },
];

const audiences = [
  {
    emoji: "🏢",
    title: "Właściciel jednoosobowej sp. z o.o.",
    description:
      "Prowadzisz spółkę sam. Nie chcesz płacić 300 zł za każde pytanie do prawnika. Nawio pilnuje terminów i generuje dokumenty za Ciebie.",
    badge: null,
  },
  {
    emoji: "👥",
    title: "Mała spółka (2-5 wspólników)",
    description:
      "Macie zarząd, wspólników, uchwały. Nawio trzyma wszystko w jednym miejscu i przypomina kiedy zwołać zgromadzenie.",
    badge: null,
  },
  {
    emoji: "📊",
    title: "Biuro rachunkowe",
    description:
      "Obsługujesz kilkanaście spółek? Nawio w wersji dla biur pozwoli zarządzać nimi z jednego panelu.",
    badge: "Wkrótce",
  },
];

const steps = [
  {
    icon: "➕",
    title: "Dodaj spółkę",
    description: "Wpisz NIP, uzupełnij dane. Nawio pobiera co może z rejestrów publicznych.",
  },
  {
    icon: "📅",
    title: "Śledź terminy",
    description: "Kalendarz automatycznie wypełnia się kluczowymi datami: ZUS, US, KRS, zgromadzenia.",
  },
  {
    icon: "📄",
    title: "Generuj dokumenty",
    description: "Wybierz dokument, sprawdź dane, pobierz PDF. Gotowe w 3 minuty.",
  },
];

const faqs = [
  {
    q: "Czy Nawio to kancelaria prawna?",
    a: "Nie. Nawio to nawigator korporacyjny — narzędzie informacyjne które pomaga zrozumieć obowiązki formalne spółki. Nie udzielamy porad prawnych ani podatkowych. Zawsze zalecamy weryfikację dokumentów przez radcę prawnego.",
  },
  {
    q: "Czy dokumenty generowane przez Nawio mają moc prawną?",
    a: "Dokumenty są przygotowywane na podstawie wzorców zgodnych z KSH. Każdy dokument zawiera informację o konieczności weryfikacji. W fazie beta szablony są w trakcie audytu przez kancelarię prawną.",
  },
  {
    q: "Ile kosztuje Nawio?",
    a: "Dostęp w fazie beta jest bezpłatny. Docelowo planujemy model pay-per-dokument oraz subskrypcję miesięczną. O cenach poinformujemy przed zakończeniem bety — bez niespodzianek.",
  },
  {
    q: "Czy moje dane są bezpieczne?",
    a: "Tak. Dane przechowywane są w infrastrukturze Supabase (serwery w UE), szyfrowane, dostępne tylko dla Ciebie. Szczegóły w polityce prywatności.",
  },
  {
    q: "Czy mogę prowadzić więcej niż jedną spółkę?",
    a: "Tak. Nawio obsługuje wiele spółek w jednym koncie. Przełączasz się między nimi jednym kliknięciem.",
  },
];

export default function Home() {
  return (
    <div className="pb-16">
      <header className="container-main flex items-center justify-between py-6">
        <div className="flex items-center gap-3">
          <Image src="/nawio-logo.svg" alt="Nawio" width={36} height={36} />
          <span className="text-xl font-semibold text-[var(--gold)]">Nawio</span>
        </div>
        <a
          href="https://app.nawio.pl"
          className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm text-[#d6dcea] transition hover:border-[var(--gold)]"
        >
          Zaloguj
        </a>
      </header>

      <main className="container-main space-y-16">
        <section className="card-luxe px-6 py-16 text-center md:px-12">
          <h1 className="mx-auto max-w-4xl text-5xl leading-tight text-white md:text-6xl">
            Prowadź spółkę z elegancją i spokojem
          </h1>
          <p className="mx-auto mt-6 max-w-2xl section-subtitle">
            Nawio pilnuje terminów, tworzy dokumenty i prowadzi Cię przez formalności sp. z o.o. krok po kroku.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://app.nawio.pl/register"
              className="rounded-lg bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-[#1A1F2E] transition hover:brightness-105"
            >
              Rozpocznij
            </a>
            <a
              href="https://app.nawio.pl/login"
              className="rounded-lg border border-[var(--card-border)] px-6 py-3 text-sm font-semibold text-[#d6dcea] transition hover:border-[var(--gold)]"
            >
              Zobacz demo
            </a>
          </div>
          <p className="mt-5 text-xs text-[#9ca9bf]">
            Bezpłatny dostęp w fazie beta • Bez karty kredytowej • Dla sp. z o.o.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="section-title text-center">Trzy filary Nawio</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="card-luxe p-5">
                <h3 className="text-2xl text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm text-[#b7c3d8]">{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="section-title text-center">Dla kogo jest Nawio?</h2>
          <p className="section-subtitle mx-auto max-w-3xl text-center">
            Jeśli prowadzisz sp. z o.o. bez prawnika w kieszeni — to jest dla Ciebie.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {audiences.map((audience) => (
              <article key={audience.title} className="card-luxe p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-2xl">{audience.emoji}</span>
                  {audience.badge ? (
                    <span className="rounded-full border border-[var(--gold)]/50 bg-[var(--gold-soft)] px-2 py-0.5 text-[11px] text-[var(--gold)]">
                      {audience.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="text-2xl text-white">{audience.title}</h3>
                <p className="mt-3 text-sm text-[#b7c3d8]">{audience.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="section-title text-center">Trzy kroki do porządku w spółce</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, idx) => (
              <article key={step.title} className="card-luxe p-5">
                <p className="text-sm text-[var(--gold)]">Krok {idx + 1}</p>
                <h3 className="mt-2 text-2xl text-white">
                  <span className="mr-2">{step.icon}</span>
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-[#b7c3d8]">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="section-title text-center">Najczęstsze pytania</h2>
          <div className="space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="faq-item card-luxe p-4">
                <summary className="flex items-center justify-between text-base text-white">
                  <span>{item.q}</span>
                  <span className="text-[var(--gold)]">+</span>
                </summary>
                <p className="mt-3 text-sm text-[#b7c3d8]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="section-title text-center">Bezpieczeństwo i zgodność</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="card-luxe p-4 text-center">
              <p className="text-2xl">🔒</p>
              <h3 className="mt-2 text-2xl text-white">Dane w UE</h3>
              <p className="mt-2 text-sm text-[#b7c3d8]">Infrastruktura Supabase, serwery w Europie</p>
            </article>
            <article className="card-luxe p-4 text-center">
              <p className="text-2xl">📋</p>
              <h3 className="mt-2 text-2xl text-white">RODO</h3>
              <p className="mt-2 text-sm text-[#b7c3d8]">Przetwarzamy tylko dane niezbędne do działania aplikacji</p>
            </article>
            <article className="card-luxe p-4 text-center">
              <p className="text-2xl">⚖️</p>
              <h3 className="mt-2 text-2xl text-white">Audyt prawny</h3>
              <p className="mt-2 text-sm text-[#b7c3d8]">Szablony dokumentów weryfikowane przez kancelarię prawną</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="container-main mt-16">
        <p className="mb-5 text-center text-xs text-[#aab6cb]">
          Nawio nie jest kancelarią prawną i nie świadczy usług doradztwa prawnego ani podatkowego.
        </p>
        <div className="card-luxe grid gap-8 px-6 py-8 md:grid-cols-4">
          <div className="space-y-3">
            <Image src="/nawio-logo.svg" alt="Nawio" width={34} height={34} />
            <p className="text-sm text-[#d2dbeb]">Nawio — nawigator dokumentów korporacyjnych dla sp. z o.o.</p>
            <p className="text-xs text-[#8f9db9]">© 2026 Nawio</p>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold text-white">Produkt</p>
            <p className="text-[#b7c3d8]">Kalendarz</p>
            <p className="text-[#b7c3d8]">Kreator dokumentów</p>
            <p className="text-[#b7c3d8]">Asystent AI</p>
            <p className="text-[#8f9db9]">Cennik (wkrótce)</p>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold text-white">Prawne</p>
            <Link href="/polityka-prywatnosci" className="block text-[#b7c3d8] hover:text-white">
              Polityka prywatności
            </Link>
            <Link href="/regulamin" className="block text-[#b7c3d8] hover:text-white">
              Regulamin
            </Link>
            <p className="text-[#b7c3d8]">Disclaimer (nie jesteśmy kancelarią)</p>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold text-white">Kontakt</p>
            <a href="mailto:hej@nawio.pl" className="text-[#b7c3d8] hover:text-white">
              hej@nawio.pl
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
