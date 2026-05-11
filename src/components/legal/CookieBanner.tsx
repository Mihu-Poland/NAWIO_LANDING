"use client";

import Link from "next/link";
import { useState } from "react";

const COOKIE_CONSENT_KEY = "nawio_cookie_consent";

type CookieConsent = "all" | "essential";

/**
 * Wyświetla pasek zgody cookies i zapisuje wybór użytkownika lokalnie.
 *
 * @author Mihu
 */
export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(() => window.localStorage.getItem(COOKIE_CONSENT_KEY) === null);

  /**
   * Zapisuje wybór użytkownika i zamyka pasek cookies.
   *
   * @param decision Decyzja użytkownika dotycząca cookies.
   */
  const handleConsent = (decision: CookieConsent) => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, decision);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 md:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-xl border border-(--card-border) bg-[oklch(0.18_0.028_260/0.94)] p-4 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.8)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-[#d2dbee]">
          Używamy plików cookies niezbędnych do działania strony oraz opcjonalnych do analityki i ulepszeń.
          Szczegóły znajdziesz w{" "}
          <Link href="/polityka-prywatnosci" className="text-gold underline decoration-(--gold)/60 underline-offset-2">
            Polityce prywatności
          </Link>
          .
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => handleConsent("all")}
            className="btn-gold rounded-md px-4 py-2 text-sm font-semibold"
          >
            Akceptuj wszystkie
          </button>
          <button
            type="button"
            onClick={() => handleConsent("essential")}
            className="btn-ghost rounded-md px-4 py-2 text-sm font-semibold"
          >
            Tylko niezbędne
          </button>
        </div>
      </div>
    </div>
  );
}
