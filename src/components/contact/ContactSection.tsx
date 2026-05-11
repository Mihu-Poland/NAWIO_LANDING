"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type FormState = {
  fullName: string;
  email: string;
  companyName: string;
  message: string;
  privacyAccepted: boolean;
  website: string;
};

type SubmitStatus = "idle" | "success" | "error";

const INITIAL_FORM_STATE: FormState = {
  fullName: "",
  email: "",
  companyName: "",
  message: "",
  privacyAccepted: false,
  website: "",
};

/**
 * Waliduje podstawowy format email po stronie klienta.
 *
 * @param email Adres email wpisany przez użytkownika.
 * @returns Informacja czy format email jest poprawny.
 */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Renderuje sekcję kontaktową z formularzem wysyłanym do API.
 *
 * @author Mihu
 */
export default function ContactSection() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  /**
   * Aktualizuje pojedyncze pole formularza.
   *
   * @param key Klucz pola formularza.
   * @param value Nowa wartość pola.
   */
  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * Obsługuje wysyłkę formularza kontaktowego.
   *
   * @param event Zdarzenie submit formularza.
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setStatus("error");
      return;
    }

    if (!formData.privacyAccepted) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setFormData(INITIAL_FORM_STATE);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="section-flow space-y-6 pt-8">
      <h2 className="section-title text-center">Napisz do nas</h2>
      <p className="section-subtitle mx-auto max-w-2xl text-center">Masz pytania? Odpiszemy w ciągu 24h.</p>

      <div className="w-full rounded-xl border border-(--card-border) bg-[oklch(0.19_0.028_260/0.72)] p-5 md:p-6">
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-1">
            <label htmlFor="fullName" className="text-sm font-medium text-[#dbe3f1]">
              Imię i nazwisko
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              className="w-full rounded-md border border-(--card-border) bg-[oklch(0.16_0.024_260/0.9)] px-3 py-2 text-sm text-white outline-none transition focus:border-(--gold)"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-[#dbe3f1]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="w-full rounded-md border border-(--card-border) bg-[oklch(0.16_0.024_260/0.9)] px-3 py-2 text-sm text-white outline-none transition focus:border-(--gold)"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="companyName" className="text-sm font-medium text-[#dbe3f1]">
              Nazwa spółki
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={(event) => updateField("companyName", event.target.value)}
              className="w-full rounded-md border border-(--card-border) bg-[oklch(0.16_0.024_260/0.9)] px-3 py-2 text-sm text-white outline-none transition focus:border-(--gold)"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="text-sm font-medium text-[#dbe3f1]">
              Wiadomość
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
              className="w-full rounded-md border border-(--card-border) bg-[oklch(0.16_0.024_260/0.9)] px-3 py-2 text-sm text-white outline-none transition focus:border-(--gold)"
            />
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(event) => updateField("website", event.target.value)}
            />
          </div>

          <label className="flex items-start gap-2 text-sm text-[#c9d3e6]">
            <input
              type="checkbox"
              required
              checked={formData.privacyAccepted}
              onChange={(event) => updateField("privacyAccepted", event.target.checked)}
              className="mt-1 h-4 w-4 accent-[--gold]"
            />
            <span>
              Akceptuję{" "}
              <Link href="/polityka-prywatnosci" className="text-gold underline decoration-(--gold)/60 underline-offset-2">
                politykę prywatności
              </Link>
              .
            </span>
          </label>

          {status === "success" ? <p className="text-sm text-[#34d399]">Wiadomość wysłana!</p> : null}
          {status === "error" ? (
            <p className="text-sm text-[#f87171]">Coś poszło nie tak, spróbuj ponownie</p>
          ) : null}

          <button type="submit" disabled={isSubmitting} className="btn-gold w-full rounded-md px-4 py-3 text-sm font-semibold disabled:opacity-60">
            {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
          </button>
        </form>
      </div>
    </section>
  );
}
