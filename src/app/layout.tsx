import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import CookieBanner from "@/components/legal/CookieBanner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nawio.pl"),

  title: {
    default: "Nawio — dokumenty i terminy sp. z o.o. w jednym miejscu",
    template: "%s | Nawio",
  },
  description:
    "Nawio generuje uchwały, protokoły i umowy dla sp. z o.o. oraz pilnuje terminów KRS, ZUS i US. Asystent AI bez prawniczego bełkotu. Zacznij za darmo — bez karty.",

  keywords: [
    "dokumenty sp z o o",
    "uchwała sp z o o wzór",
    "protokół zgromadzenia wspólników",
    "terminy KRS spółka",
    "kreator dokumentów korporacyjnych",
    "asystent AI spółka",
    "nawio",
  ],

  authors: [{ name: "BearStone sp. z o.o.", url: "https://nawio.pl" }],
  creator: "BearStone sp. z o.o.",
  publisher: "BearStone sp. z o.o.",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Nawio — dokumenty i terminy sp. z o.o. w jednym miejscu",
    description:
      "Gotowe uchwały, protokoły i umowy dla sp. z o.o. Kalendarz terminów KRS, ZUS i US. Asystent AI bez prawniczego bełkotu.",
    url: "https://nawio.pl",
    siteName: "Nawio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nawio — Prowadzi. Nie radzi.",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nawio — dokumenty i terminy sp. z o.o.",
    description:
      "Gotowe uchwały, protokoły i umowy dla sp. z o.o. Kalendarz terminów KRS, ZUS i US.",
    images: [{ url: "/og-image.png", alt: "Nawio — Prowadzi. Nie radzi." }],
  },
};

// ─── Schematy JSON-LD ────────────────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nawio",
  legalName: "BearStone sp. z o.o.",
  url: "https://nawio.pl",
  logo: "https://nawio.pl/nawio-logo.svg",
  email: "hej@nawio.pl",
  description:
    "Nawio to narzędzie IT dla właścicieli sp. z o.o. w Polsce. Gotowe dokumenty korporacyjne, kontrola terminów i asystent AI w jednym miejscu.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Czarnuszki 6",
    addressLocality: "Grabina",
    postalCode: "05-071",
    addressCountry: "PL",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hej@nawio.pl",
    contactType: "customer support",
    availableLanguage: "Polish",
  },
  areaServed: "PL",
  inLanguage: "pl",
  sameAs: [
    // Jak założysz LinkedIn/X dodaj tu URL-e:
    // "https://www.linkedin.com/company/nawio",
  ],
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nawio",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  url: "https://nawio.pl",
  description:
    "Nawigator dokumentów korporacyjnych dla polskich sp. z o.o. Uchwały, protokoły, terminy KRS, ZUS i US w jednym miejscu.",
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "PLN",
      description: "1 dokument PDF miesięcznie, kalendarz terminów, 1 pytanie do AI dziennie",
    },
    {
      "@type": "Offer",
      name: "Solo",
      price: "49",
      priceCurrency: "PLN",
      description: "Nielimitowane dokumenty PDF i DOCX, asystent AI, przypomnienia email",
    },
    {
      "@type": "Offer",
      name: "Biuro",
      price: "149",
      priceCurrency: "PLN",
      description: "Nielimitowana liczba spółek, panel zarządzania klientami, priorytetowe wsparcie",
    },
  ],
  inLanguage: "pl",
  featureList: [
    "Kreator dokumentów korporacyjnych",
    "Kontrola terminów spółki",
    "Asystent AI dla sp. z o.o.",
    "Generowanie uchwał wspólników",
    "Protokoły zgromadzeń",
    "Kontrola terminów KRS, ZUS, US",
  ],
  publisher: {
    "@type": "Organization",
    name: "BearStone sp. z o.o.",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Jak uporządkować formalności sp. z o.o. w 3 krokach",
  description:
    "Jak w 3 krokach uporządkować dokumenty i terminy sp. z o.o. za pomocą Nawio",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Dodaj spółkę",
      text: "Wpisz NIP spółki i uzupełnij dane. Nawio automatycznie pobiera informacje z rejestrów publicznych.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Śledź terminy",
      text: "Kalendarz automatycznie wypełnia się kluczowymi datami: ZUS, US, KRS i terminy zgromadzeń wspólników.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Generuj dokumenty",
      text: "Wybierz dokument (uchwałę, protokół, umowę), sprawdź automatycznie uzupełnione dane i pobierz gotowy PDF lub DOCX w 3 minuty.",
    },
  ],
};

// ─── Layout ──────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" as="image" href="/hero.jpg" fetchPriority="high" />
        <meta
          name="google-site-verification"
          content="jsIgKEsPBt6sPBC7t1QaRTLFFxTasHibTmcGJIAslSE"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BEWKN8846Q"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BEWKN8846Q');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}