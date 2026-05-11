import Image from "next/image";
import Link from "next/link";
import { Bot, CalendarClock, FileText, type LucideIcon } from "lucide-react";
import ContactSection from "@/components/contact/ContactSection";
import CookieSettingsLink from "@/components/legal/CookieSettingsLink";

const pillars = [
  {
    icon: CalendarClock,
    title: "Kalendarz formalny",
    description:
      "Pilnuje terminów KRS, ZUS i US. Przypomina o zgromadzeniach, sprawozdaniach i obowiązkach formalnych.",
  },
  {
    icon: FileText,
    title: "Kreator dokumentów",
    description:
      "Uchwały, protokoły i umowy gotowe w kilka minut. Dane spółki podstawiają się automatycznie.",
  },
  {
    icon: Bot,
    title: "Asystent AI Nawio",
    description:
      "Nawigator formalny, który wskazuje co zrobić i kiedy. Bez prawniczego bełkotu, z podstawą prawną.",
  },
] satisfies Array<{ icon: LucideIcon; title: string; description: string }>;

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
    a: "Nie. Nawio to nawigator formalny — narzędzie informacyjne które pomaga zrozumieć obowiązki formalne spółki. Nie udzielamy porad prawnych ani podatkowych. Zawsze zalecamy weryfikację dokumentów przez radcę prawnego.",
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

const weekDays = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];
const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);
const todayDay = 14;
const dayCategories: Record<number, "spolka" | "zus" | "us" | "krs"> = {
  9: "spolka",
  10: "zus",
  25: "us",
  30: "krs",
};

const upcomingDeadlines = [
  { title: "Zgromadzenie wspólników", date: "09.06.2026", note: "Uchwała o podziale zysku" },
  { title: "Składka ZUS", date: "10.06.2026", note: "Przypomnienie 48h przed terminem" },
  { title: "VAT-7 do US", date: "25.06.2026", note: "Deklaracja i płatność VAT" },
  { title: "Sprawozdanie do KRS", date: "30.06.2026", note: "Wysyłka eKRS + załączniki" },
];

export default function Home() {
  return (
    <div className="pb-16">
      <section id="home" className="hero-shell">
        <header className="hero-content sticky top-0 z-50 border-b border-(--card-border)/50 bg-[oklch(0.14_0.02_258/0.62)] backdrop-blur-2xl">
          <div className="container-main grid grid-cols-[1fr_auto_1fr] items-center py-4">
            <div className="flex items-center gap-3 justify-self-start">
              <Image src="/nawio-logo.svg" alt="Nawio" width={36} height={36} />
              <div className="leading-tight">
                <span className="font-serif text-2xl text-gold">Nawio</span>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#9fa9bc]">Nawigator formalny</p>
              </div>
            </div>
            <nav className="hidden items-center gap-9 text-sm text-[#c3ccdd] md:flex">
              <a href="#home" className="transition hover:text-white">
                Strona główna
              </a>
              <a href="#cennik" className="transition hover:text-white">
                Cennik
              </a>
              <a href="#faq" className="transition hover:text-white">
                FAQ
              </a>
              <a href="#kontakt" className="transition hover:text-white">
                Kontakt
              </a>
            </nav>
            <a
              href="https://app.nawio.pl"
              className="btn-ghost justify-self-end rounded-md px-4 py-2 text-sm font-semibold"
            >
              Zaloguj
            </a>
          </div>
        </header>

        <div className="hero-content container-main flex min-h-[calc(100svh-84px)] items-center py-14 md:py-20">
          <div className="max-w-4xl">
            <h1 className="max-w-4xl text-5xl leading-[1.02] text-white md:text-7xl">
              Prowadź spółkę z elegancją
              <br />
              <span className="hero-gold">i precyzją kancelarii</span>
            </h1>
            <p className="mt-6 max-w-2xl section-subtitle">
              Nawio pilnuje terminów, tworzy dokumenty i prowadzi Cię przez formalności sp. z o.o. krok po kroku.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://app.nawio.pl/register" className="btn-gold rounded-md px-6 py-3 text-sm font-semibold">
                Rozpocznij
              </a>
              <a href="https://app.nawio.pl/login" className="btn-ghost rounded-md px-6 py-3 text-sm font-semibold">
                Zobacz demo
              </a>
            </div>
            <p className="mt-5 text-xs text-[#a6b0c3]">
              Bezpłatny dostęp w fazie beta • Bez karty kredytowej • Dla sp. z o.o.
            </p>
          </div>
        </div>
      </section>

      <main className="container-main space-y-20 pt-10">
        <section className="section-flow space-y-6 pt-8">
          <h2 className="section-title text-center">Trzy filary Nawio</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
              <article key={pillar.title} className="card-luxe border-(--card-border)/90 p-5">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-md border border-(--gold)/55 bg-(--gold-soft) text-lg text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#bcc6d8]">{pillar.description}</p>
              </article>
              );
            })}
          </div>
        </section>

        <section className="section-flow space-y-6 pt-8">
          <h2 className="section-title text-center">Podgląd kalendarza terminów</h2>
          <p className="section-subtitle mx-auto max-w-3xl text-center">
            Mockup widoku miesięcznego z najbliższymi obowiązkami formalnymi Twojej spółki.
          </p>
          <div className="card-luxe grid gap-6 p-5 md:grid-cols-[1.45fr_1fr] md:p-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-3xl font-semibold text-white">Czerwiec 2026</p>
                <span className="rounded-full border border-(--gold)/55 bg-(--gold-soft) px-3 py-1 text-xs uppercase tracking-[0.18em] text-gold">
                  Widok miesięczny
                </span>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.12em] text-[#95a4bf]">
                {weekDays.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {monthDays.map((day) => (
                  <div
                    key={day}
                    className={`calendar-grid-cell ${
                      day === todayDay ? "is-today" : dayCategories[day] ? `is-${dayCategories[day]}` : ""
                    }`}
                    aria-label={`Dzień ${day}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid gap-2 pt-1 text-xs text-[#b8c2d5] sm:grid-cols-2">
                <p className="flex items-center gap-2">
                  <span className="legend-dot bg-[#D4AF37]" /> Spółka
                </p>
                <p className="flex items-center gap-2">
                  <span className="legend-dot bg-[#3B82F6]" /> ZUS
                </p>
                <p className="flex items-center gap-2">
                  <span className="legend-dot bg-[#10B981]" /> US / VAT
                </p>
                <p className="flex items-center gap-2">
                  <span className="legend-dot bg-[#8B5CF6]" /> KRS
                </p>
              </div>
            </div>
            <aside className="rounded-xl border border-(--card-border) bg-[oklch(0.19_0.027_260/0.72)] p-4">
              <h3 className="text-3xl font-semibold text-white">Najbliższe terminy</h3>
              <div className="mt-4 space-y-3">
                {upcomingDeadlines.map((item) => (
                  <article key={item.title} className="rounded-lg border border-(--card-border)/90 bg-[oklch(0.22_0.03_260/0.7)] p-3">
                    <p className="text-sm font-semibold text-gold">{item.date}</p>
                    <p className="mt-1 text-base text-white">{item.title}</p>
                    <p className="mt-1 text-xs text-[#aeb8cb]">{item.note}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section-flow space-y-6 pt-8">
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
                    <span className="rounded-full border border-(--gold)/60 bg-(--gold-soft) px-2 py-0.5 text-[11px] text-gold">
                      {audience.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="text-3xl font-semibold text-white">{audience.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#bcc6d8]">{audience.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-flow space-y-6 pt-8">
          <h2 className="section-title text-center">Trzy kroki do porządku w spółce</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, idx) => (
              <article key={step.title} className="card-luxe p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-gold">Krok {idx + 1}</p>
                <h3 className="mt-2 text-3xl font-semibold text-white">
                  <span className="mr-2">{step.icon}</span>
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#bcc6d8]">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="cennik" className="section-flow space-y-6 pt-8">
          <h2 className="section-title text-center">Cennik</h2>
          <div className="mx-auto max-w-3xl rounded-xl border border-(--card-border) bg-[oklch(0.2_0.025_260/0.65)] p-6 text-center">
            <p className="text-4xl font-semibold text-white">Beta: 0 PLN</p>
            <p className="mt-2 text-sm text-[#b9c5d8]">
              W czasie bety korzystasz bezpłatnie. Finalny cennik udostępnimy przed startem wersji produkcyjnej.
            </p>
          </div>
        </section>

        <section id="faq" className="section-flow space-y-6 pt-8">
          <h2 className="section-title text-center">Najczęstsze pytania</h2>
          <div className="space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="faq-item card-luxe p-4">
                <summary className="flex items-center justify-between text-base text-white">
                  <span>{item.q}</span>
                  <span className="text-gold">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#bcc6d8]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section-flow space-y-4 pt-8">
          <h2 className="section-title text-center">Bezpieczeństwo i zgodność</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="card-luxe p-4 text-center">
              <p className="text-2xl">🔒</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">Dane w UE</h3>
              <p className="mt-2 text-sm text-[#bcc6d8]">Infrastruktura Supabase, serwery w Europie</p>
            </article>
            <article className="card-luxe p-4 text-center">
              <p className="text-2xl">📋</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">RODO</h3>
              <p className="mt-2 text-sm text-[#bcc6d8]">Przetwarzamy tylko dane niezbędne do działania aplikacji</p>
            </article>
            <article className="card-luxe p-4 text-center">
              <p className="text-2xl">⚖️</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">Audyt prawny</h3>
              <p className="mt-2 text-sm text-[#bcc6d8]">Szablony dokumentów weryfikowane przez kancelarię prawną</p>
            </article>
          </div>
        </section>

        <ContactSection />
      </main>

      <footer className="container-main mt-16">
        <p id="disclaimer" className="mb-5 text-center text-xs text-[#aab6cb]">
          Nawio nie jest kancelarią prawną i nie świadczy usług doradztwa prawnego ani podatkowego.
        </p>
        <div className="card-luxe grid gap-8 px-6 py-8 md:grid-cols-4">
          <div className="space-y-3">
            <Image src="/nawio-logo.svg" alt="Nawio" width={34} height={34} />
            <p className="text-sm text-[#dbe3f1]">Nawio — nawigator dokumentów dla sp. z o.o.</p>
            <p className="text-xs text-[#93a0ba]">© 2026 Nawio</p>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold text-white">Produkt</p>
            <p className="text-[#bcc6d8]">Kalendarz</p>
            <p className="text-[#bcc6d8]">Kreator dokumentów</p>
            <p className="text-[#bcc6d8]">Asystent AI</p>
            <p className="text-[#93a0ba]">Cennik (wkrótce)</p>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold text-white">Prawne</p>
            <Link href="/polityka-prywatnosci" className="block text-[#bcc6d8] hover:text-white">
              Polityka prywatności
            </Link>
            <Link href="/regulamin" className="block text-[#bcc6d8] hover:text-white">
              Regulamin
            </Link>
            <Link href="/#disclaimer" className="block text-[#bcc6d8] hover:text-white">
              Disclaimer (nie jesteśmy kancelarią)
            </Link>
            <CookieSettingsLink />
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold text-white">Kontakt</p>
            <a href="mailto:hej@nawio.pl" className="text-[#bcc6d8] hover:text-white">
              hej@nawio.pl
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
