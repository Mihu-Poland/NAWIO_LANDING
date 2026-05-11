"use client";

import dynamic from "next/dynamic";

const ContactSection = dynamic(() => import("./ContactSection"), {
  ssr: false,
});

/**
 * Ładuje formularz kontaktowy dynamicznie po stronie klienta.
 *
 * @author Mihu
 */
export default function LazyContactSection() {
  return <ContactSection />;
}
