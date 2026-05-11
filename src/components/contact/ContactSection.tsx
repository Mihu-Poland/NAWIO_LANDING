"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type SubmitStatus = "idle" | "success" | "error";

const contactSchema = z.object({
  fullName: z.string().min(1, "Podaj imię i nazwisko."),
  email: z.email("Podaj poprawny adres email."),
  message: z.string().min(20, "Treść wiadomości musi mieć minimum 20 znaków."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

/**
 * Renderuje sekcję kontaktową z formularzem wysyłanym do API.
 *
 * @author Mihu
 */
export default function ContactSection() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });

  /**
   * Obsługuje wysyłkę formularza kontaktowego.
   *
   * @param values Poprawne dane formularza po walidacji.
   */
  const handleSubmit = async (values: ContactFormValues) => {
    setStatus("idle");

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="kontakt" className="section-flow space-y-6 pt-8">
      <h2 className="section-title text-center">Napisz do nas</h2>
      <p className="section-subtitle mx-auto max-w-2xl text-center">Odpowiemy w ciągu 24 godzin.</p>

      <div className="w-full rounded-xl border border-(--card-border) bg-[#252B3B] p-5 md:p-6">
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)} noValidate>
          <div className="space-y-1">
            <label htmlFor="fullName" className="text-sm font-medium text-[#dbe3f1]">
              Imię i nazwisko
            </label>
            <input
              id="fullName"
              type="text"
              required
              {...form.register("fullName")}
              className="w-full rounded-md border border-(--card-border) bg-[oklch(0.16_0.024_260/0.9)] px-3 py-2 text-sm text-white outline-none transition focus:border-(--gold)"
            />
            {form.formState.errors.fullName ? (
              <p className="text-xs text-[#f87171]">{form.formState.errors.fullName.message}</p>
            ) : null}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-[#dbe3f1]">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              {...form.register("email")}
              className="w-full rounded-md border border-(--card-border) bg-[oklch(0.16_0.024_260/0.9)] px-3 py-2 text-sm text-white outline-none transition focus:border-(--gold)"
            />
            {form.formState.errors.email ? (
              <p className="text-xs text-[#f87171]">{form.formState.errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="text-sm font-medium text-[#dbe3f1]">
              Treść wiadomości
            </label>
            <textarea
              id="message"
              rows={4}
              required
              {...form.register("message")}
              className="w-full rounded-md border border-(--card-border) bg-[oklch(0.16_0.024_260/0.9)] px-3 py-2 text-sm text-white outline-none transition focus:border-(--gold)"
            />
            {form.formState.errors.message ? (
              <p className="text-xs text-[#f87171]">{form.formState.errors.message.message}</p>
            ) : null}
          </div>

          {status === "success" ? <p className="text-sm text-[#34d399]">Wiadomość wysłana! Odpiszemy wkrótce.</p> : null}
          {status === "error" ? (
            <p className="text-sm text-[#f87171]">Coś poszło nie tak. Napisz bezpośrednio na hej@nawio.pl</p>
          ) : null}

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full rounded-md bg-[#D4A843] px-4 py-3 text-sm font-semibold text-[#1b2334] transition hover:opacity-95 disabled:opacity-60"
          >
            {form.formState.isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
          </button>
        </form>
      </div>
    </section>
  );
}
