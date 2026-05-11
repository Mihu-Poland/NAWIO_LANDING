"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const COOKIE_CONSENT_KEY = "nawio_cookie_consent";
const COOKIE_SETTINGS_EVENT = "nawio:open-cookie-settings";

type CookieConsent = "all" | "essential";

/**
 * Wyświetla pasek zgody cookies i zapisuje wybór użytkownika lokalnie.
 *
 * @author Mihu
 */
export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedDecision = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(savedDecision === null);
    /**
     * Otwiera baner cookies po kliknięciu linku ze stopki.
     */
    const handleOpenSettings = () => {
      setIsVisible(true);
    };

    window.addEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () => {
      window.removeEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
    };
  }, []);

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
    <div className="fixed inset-x-0 bottom-0 z-50 max-h-[20svh] overflow-y-auto px-4 pb-4 md:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 rounded-xl border border-(--card-border) bg-[oklch(0.18_0.028_260/0.94)] p-4 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <p className="text-sm leading-relaxed text-[#d2dbee]">
          Używamy plików cookies niezbędnych do działania strony oraz opcjonalnych do analityki i ulepszeń.
          Szczegóły znajdziesz w{" "}
          <Link href="/polityka-prywatnosci" className="text-gold underline decoration-(--gold)/60 underline-offset-2">
            Polityce prywatności
          </Link>
          .
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
          <button
            type="button"
            onClick={() => handleConsent("all")}
            className="btn-gold h-10 w-full rounded-md px-4 py-2 text-sm font-semibold"
          >
            Akceptuj wszystkie
          </button>
          <button
            type="button"
            onClick={() => handleConsent("essential")}
            className="btn-ghost h-10 w-full rounded-md border border-(--card-border) px-4 py-2 text-sm font-semibold"
          >
            Tylko niezbędne
          </button>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="justify-self-start text-sm font-medium text-[#c9d3e6] underline decoration-(--gold)/55 underline-offset-2 transition hover:text-white"
          >
            Ustawienia
          </button>
        </div>
      </div>
    </div>
  );
}
