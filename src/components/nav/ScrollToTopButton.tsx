"use client";

import { useEffect, useState } from "react";

/**
 * Wyświetla przycisk przewinięcia do góry po scrollu.
 *
 * @author Mihu
 */
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 z-50 rounded-full border border-(--card-border) bg-[oklch(0.18_0.028_260/0.9)] px-3 py-2 text-sm font-semibold text-[#dbe3f1] shadow-[0_14px_36px_-20px_rgba(0,0,0,0.52)] backdrop-blur-xl transition hover:border-(--gold)/60 hover:text-white"
      aria-label="Wróć na górę"
    >
      ↑ Góra
    </button>
  );
}

