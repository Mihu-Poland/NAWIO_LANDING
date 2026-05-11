"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const COOKIE_CONSENT_KEY = "nawio_cookie_consent";
const COOKIE_SETTINGS_EVENT = "nawio:open-cookie-settings";

type CookieConsent = "all" | "essential";
type CookieSettings = {
  essential: true;
  analytics: boolean;
  functional: boolean;
};

const DEFAULT_SETTINGS: CookieSettings = {
  essential: true,
  analytics: false,
  functional: false,
};

/**
 * Odczytuje zapisane ustawienia cookies z localStorage.
 *
 * @returns Ustawienia cookies lub null, gdy brak decyzji.
 */
function readSavedSettings(): CookieSettings | null {
  const rawValue = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!rawValue) {
    return null;
  }

  if (rawValue === "all") {
    return { essential: true, analytics: true, functional: true };
  }

  if (rawValue === "essential") {
    return { ...DEFAULT_SETTINGS };
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<CookieSettings>;
    return {
      essential: true,
      analytics: Boolean(parsedValue.analytics),
      functional: Boolean(parsedValue.functional),
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

/**
 * Wyświetla pasek zgody cookies i zapisuje wybór użytkownika lokalnie.
 *
 * @author Mihu
 */
export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const savedDecision = readSavedSettings();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(savedDecision === null);
    if (savedDecision) {
      setSettings(savedDecision);
    }
    /**
     * Otwiera baner cookies po kliknięciu linku ze stopki.
     */
    const handleOpenSettings = () => {
      setIsVisible(true);
      setShowSettingsPanel(true);
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
    setShowSettingsPanel(false);
    setSettings(decision === "all" ? { essential: true, analytics: true, functional: true } : { ...DEFAULT_SETTINGS });
  };

  /**
   * Zapisuje niestandardowe ustawienia cookies użytkownika.
   */
  const handleSaveSettings = () => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(settings));
    setIsVisible(false);
    setShowSettingsPanel(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 md:px-6">
      <div className="mx-auto flex max-h-[calc(100svh-1rem)] w-full max-w-5xl flex-col gap-3 overflow-y-auto rounded-xl border border-(--card-border) bg-[oklch(0.18_0.028_260/0.94)] p-4 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.8)] backdrop-blur-xl">
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
            onClick={() => setShowSettingsPanel((prev) => !prev)}
            className="justify-self-start text-sm font-medium text-[#c9d3e6] underline decoration-(--gold)/55 underline-offset-2 transition hover:text-white"
          >
            Ustawienia
          </button>
        </div>
        {showSettingsPanel ? (
          <div className="rounded-lg border border-(--card-border) bg-[oklch(0.16_0.024_260/0.9)] p-3">
            <p className="text-sm font-semibold text-white">Więcej ustawień cookies</p>
            <p className="mt-1 text-xs text-[#c1cce0]">
              Cookies niezbędne są zawsze aktywne. Możesz wybrać dodatkowe kategorie i zapisać decyzję.
            </p>
            <div className="mt-3 space-y-2">
              <label className="flex items-center justify-between gap-3 text-sm text-[#d2dbee]">
                <span>Analityczne</span>
                <input
                  type="checkbox"
                  checked={settings.analytics}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      analytics: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[--gold]"
                />
              </label>
              <label className="flex items-center justify-between gap-3 text-sm text-[#d2dbee]">
                <span>Funkcjonalne</span>
                <input
                  type="checkbox"
                  checked={settings.functional}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      functional: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[--gold]"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={handleSaveSettings}
              className="btn-ghost mt-3 h-10 w-full rounded-md border border-(--card-border) px-4 py-2 text-sm font-semibold"
            >
              Zapisz ustawienia
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
