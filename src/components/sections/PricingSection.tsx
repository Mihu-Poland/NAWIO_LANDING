"use client";

import { useMemo, useState } from "react";

const freeFeatures = [
  "✅ Pełny kalendarz terminów",
  "✅ Automatyczne terminy ZUS, US, KRS",
  "✅ 1 dokument PDF miesięcznie",
  "✅ 1 pytanie do Asystenta AI dziennie",
  "✅ Profil jednej spółki z o.o.",
  "❌ Przypomnienia email",
  "❌ Nielimitowane dokumenty",
];

const soloFeatures = [
  "✅ Wszystko z planu Free",
  "✅ Nielimitowane dokumenty PDF i DOCX",
  "✅ Nielimitowany Asystent AI",
  "✅ Przypomnienia email o terminach",
  "✅ Jedna spółka z o.o.",
  "❌ Wiele spółek",
];

const officeFeatures = [
  "✅ Wszystko z planu Solo",
  "✅ Nielimitowana liczba spółek",
  "✅ Przełączanie między spółkami",
  "✅ Panel zarządzania klientami",
  "✅ Priorytetowe wsparcie email",
];

/**
 * Renderuje sekcję cennika z przełącznikiem okresu rozliczeń.
 *
 * @author Mihu
 */
export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"miesiecznie" | "rocznie">("miesiecznie");

  const soloPrice = useMemo(() => {
    if (billingPeriod === "rocznie") {
      return { main: "490 zł", suffix: "/ rok", savings: "oszczędzasz 98 zł" };
    }
    return { main: "49 zł", suffix: "/ mies.", savings: null };
  }, [billingPeriod]);

  const officePrice = useMemo(() => {
    if (billingPeriod === "rocznie") {
      return { main: "1490 zł", suffix: "/ rok", savings: "oszczędzasz 298 zł" };
    }
    return { main: "149 zł", suffix: "/ mies.", savings: null };
  }, [billingPeriod]);

  return (
    <section id="cennik" className="section-flow scroll-mt-24 space-y-6 pt-8">
      <h2 className="section-title text-center">Wybierz swój plan</h2>
      <p className="section-subtitle mx-auto max-w-3xl text-center">
        Zacznij za darmo. Przejdź na wyższy plan gdy będziesz gotowy.
      </p>

      <div className="mx-auto flex w-fit items-center gap-2 rounded-xl border border-(--card-border) bg-[oklch(0.2_0.025_260/0.35)] p-1">
        <button
          type="button"
          onClick={() => setBillingPeriod("miesiecznie")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            billingPeriod === "miesiecznie"
              ? "bg-[#D4A843] text-[#1b2334]"
              : "border border-transparent text-[#d2dbee] hover:border-(--card-border)"
          }`}
        >
          Miesięcznie
        </button>
        <button
          type="button"
          onClick={() => setBillingPeriod("rocznie")}
          className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition ${
            billingPeriod === "rocznie"
              ? "bg-[#D4A843] text-[#1b2334]"
              : "border border-transparent text-[#d2dbee] hover:border-(--card-border)"
          }`}
        >
          Rocznie
          <span className="ml-2 rounded-full bg-[#22c55e]/20 px-2 py-0.5 text-[11px] font-semibold text-[#22c55e]">
            2 miesiące gratis!
          </span>
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-[#2E3548] bg-[#1A1F2E] p-5">
          <p className="text-[22px] font-semibold text-white">Free</p>
          <p className="mt-2 text-4xl font-semibold text-white">
            0 zł <span className="text-base font-medium text-[#d2dbee]">{billingPeriod === "rocznie" ? "/ rok" : "/ mies."}</span>
          </p>
          <p className="text-sm text-[#9aa6bf]">Na start — bez limitu czasu</p>
          <ul className="mt-4 space-y-2 text-sm text-[#d2dbee]">
            {freeFeatures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a
            href="https://app.nawio.pl/register"
            className="mt-6 inline-flex w-full justify-center rounded-md bg-[#D4A843] px-4 py-2 text-sm font-semibold text-[#1b2334] transition hover:opacity-95"
          >
            Zacznij za darmo
          </a>
        </article>

        <article className="rounded-xl border-2 border-[#D4A843] bg-[#252B3B] p-5 shadow-[0_0_24px_rgba(212,168,67,0.22)]">
          <p className="mb-3 rounded-full bg-[#D4A843] px-3 py-1 text-center text-[11px] font-semibold tracking-[0.1em] text-[#1b2334]">
            Najpopularniejszy
          </p>
          <p className="text-[22px] font-semibold text-white">Solo</p>
          <p className="mt-2 text-4xl font-semibold text-white">
            {soloPrice.main} <span className="text-base font-medium text-[#d2dbee]">{soloPrice.suffix}</span>
          </p>
          {billingPeriod === "rocznie" ? <p className="text-xs text-[#22c55e]">{soloPrice.savings}</p> : null}
          <p className="text-sm text-[#9aa6bf]">Dla właściciela jednej sp. z o.o.</p>
          <ul className="mt-4 space-y-2 text-sm text-[#d2dbee]">
            {soloFeatures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a
            href={
              billingPeriod === "rocznie"
                ? "https://app.nawio.pl/register?plan=solo&okres=rocznie"
                : "https://app.nawio.pl/register?plan=solo&okres=miesiecznie"
            }
            className="mt-6 inline-flex w-full justify-center rounded-md bg-[#D4A843] px-4 py-2 text-sm font-semibold text-[#1b2334] transition hover:opacity-95"
          >
            Wybierz Solo
          </a>
        </article>

        <article className="rounded-xl border border-[#2E3548] bg-[#1A1F2E] p-5">
          <p className="mb-3 rounded-full border border-[#3f4761] bg-[#232a3d] px-3 py-1 text-center text-[11px] font-semibold tracking-[0.1em] text-[#b8c2d5]">
            DLA BIUR RACHUNKOWYCH
          </p>
          <p className="text-[22px] font-semibold text-white">Biuro</p>
          <p className="mt-2 text-4xl font-semibold text-white">
            {officePrice.main} <span className="text-base font-medium text-[#d2dbee]">{officePrice.suffix}</span>
          </p>
          {billingPeriod === "rocznie" ? <p className="text-xs text-[#22c55e]">{officePrice.savings}</p> : null}
          <p className="text-sm text-[#9aa6bf]">Dla biur rachunkowych i wielu spółek</p>
          <ul className="mt-4 space-y-2 text-sm text-[#d2dbee]">
            {officeFeatures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a
            href={
              billingPeriod === "rocznie"
                ? "https://app.nawio.pl/register?plan=biuro&okres=rocznie"
                : "https://app.nawio.pl/register?plan=biuro&okres=miesiecznie"
            }
            className="mt-6 inline-flex w-full justify-center rounded-md bg-[#D4A843] px-4 py-2 text-sm font-semibold text-[#1b2334] transition hover:opacity-95"
          >
            Wybierz Biuro
          </a>
        </article>
      </div>

      <p className="mx-auto max-w-4xl text-center text-xs text-[#93a0ba]">
        Ceny netto + VAT 23%. Faktury VAT wystawiane automatycznie. Możliwość anulowania w dowolnym momencie — bez
        opłat karnych.
      </p>
    </section>
  );
}
