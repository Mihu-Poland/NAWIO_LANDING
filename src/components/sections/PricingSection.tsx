"use client";

import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type WaitlistPlan = "solo" | "biuro";
type WaitlistStatus = "idle" | "success" | "exists" | "error";

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
  "✅ Przypomnienia email",
  "✅ Jedna spółka z o.o.",
  "❌ Wiele spółek",
];

const officeFeatures = [
  "✅ Wszystko z planu Solo",
  "✅ Nielimitowana liczba spółek",
  "✅ Przełączanie między spółkami",
  "✅ Panel zarządzania wieloma klientami",
  "✅ Priorytetowe wsparcie",
];

/**
 * Renderuje sekcję cennika z planami i zapisem na listę oczekujących.
 *
 * @author Mihu
 */
export default function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<WaitlistPlan>("solo");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<WaitlistStatus>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Otwiera modal zapisu dla wskazanego planu.
   *
   * @param plan Wybrany plan oczekujący.
   */
  const openWaitlistModal = (plan: WaitlistPlan) => {
    setSelectedPlan(plan);
    setEmail("");
    setStatus("idle");
    setIsModalOpen(true);
  };

  /**
   * Wysyła zapis na listę oczekujących do API.
   *
   * @param event Zdarzenie submit formularza.
   */
  const handleWaitlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");

    if (!email.trim()) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lista-oczekujacych", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan: selectedPlan }),
      });

      const data = (await response.json()) as { status?: "ok" | "exists"; error?: string };
      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus(data.status === "exists" ? "exists" : "success");
      if (data.status !== "exists") {
        setEmail("");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPlanLabel = selectedPlan === "solo" ? "Solo" : "Biuro";

  return (
    <section id="cennik" className="section-flow space-y-6 pt-8">
      <h2 className="section-title text-center">Wybierz swój plan</h2>
      <p className="section-subtitle mx-auto max-w-3xl text-center">
        Zacznij za darmo. Przejdź na wyższy plan gdy będziesz gotowy.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-[#2E3548] bg-[#1A1F2E] p-5">
          <p className="text-[22px] font-semibold text-white">Free</p>
          <p className="mt-2 text-4xl font-semibold text-white">0 zł</p>
          <p className="text-sm text-[#9aa6bf]">na zawsze</p>
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
            NAJPOPULARNIEJSZY
          </p>
          <p className="text-[22px] font-semibold text-white">Solo</p>
          <p className="mt-2 text-4xl font-semibold text-white">
            49 zł <span className="text-base font-medium text-[#d2dbee]">/mies.</span>
          </p>
          <p className="text-xs italic text-[#9aa6bf]">* cena orientacyjna</p>
          <ul className="mt-4 space-y-2 text-sm text-[#d2dbee]">
            {soloFeatures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => openWaitlistModal("solo")}
            className="mt-6 inline-flex w-full justify-center rounded-md bg-[#D4A843] px-4 py-2 text-sm font-semibold text-[#1b2334] transition hover:opacity-95"
          >
            Zapisz się na listę
          </button>
        </article>

        <article className="rounded-xl border border-[#2E3548] bg-[#1A1F2E] p-5">
          <p className="mb-3 rounded-full border border-[#3f4761] bg-[#232a3d] px-3 py-1 text-center text-[11px] font-semibold tracking-[0.1em] text-[#b8c2d5]">
            DLA BIUR RACHUNKOWYCH
          </p>
          <p className="text-[22px] font-semibold text-white">Biuro</p>
          <p className="mt-2 text-4xl font-semibold text-white">
            149 zł <span className="text-base font-medium text-[#d2dbee]">/mies.</span>
          </p>
          <p className="text-xs italic text-[#9aa6bf]">* cena orientacyjna</p>
          <ul className="mt-4 space-y-2 text-sm text-[#d2dbee]">
            {officeFeatures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => openWaitlistModal("biuro")}
            className="mt-6 inline-flex w-full justify-center rounded-md bg-[#D4A843] px-4 py-2 text-sm font-semibold text-[#1b2334] transition hover:opacity-95"
          >
            Zapisz się na listę
          </button>
        </article>
      </div>

      <p className="mx-auto max-w-4xl text-center text-xs text-[#93a0ba]">
        * Ceny orientacyjne. Finalne ceny zostaną ogłoszone przed uruchomieniem płatności. Użytkownicy z listy
        oczekujących otrzymają specjalną ofertę early bird.
      </p>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bądź pierwszy</DialogTitle>
            <DialogDescription>
              Powiadomimy Cię gdy plan {selectedPlanLabel} będzie dostępny.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleWaitlistSubmit} className="mt-4 space-y-3">
            <div className="space-y-1">
              <label htmlFor="waitlist-email" className="text-sm font-medium text-[#dbe3f1]">
                Email
              </label>
              <input
                id="waitlist-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-md border border-(--card-border) bg-[oklch(0.16_0.024_260/0.9)] px-3 py-2 text-sm text-white outline-none transition focus:border-(--gold)"
              />
            </div>

            {status === "success" ? (
              <p className="text-sm text-[#34d399]">Gotowe! Damy znać gdy ruszymy z płatnościami. 🎉</p>
            ) : null}
            {status === "exists" ? <p className="text-sm text-[#d2dbee]">Już jesteś na liście!</p> : null}
            {status === "error" ? (
              <p className="text-sm text-[#f87171]">Nie udało się zapisać. Spróbuj ponownie za chwilę.</p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-[#D4A843] px-4 py-2 text-sm font-semibold text-[#1b2334] transition hover:opacity-95 disabled:opacity-60"
            >
              {isSubmitting ? "Zapisywanie..." : "Zapisz mój email"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
