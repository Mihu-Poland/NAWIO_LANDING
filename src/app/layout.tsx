import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import CookieBanner from "@/components/legal/CookieBanner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nawio · Prowadzi. Nie radzi.",
  description:
    "Gotowe dokumenty, kontrolowane terminy, spokój właściciela sp. z o.o. — w jednym miejscu.",
  metadataBase: new URL("https://nawio.pl"),
  openGraph: {
    title: "Nawio · Wszystko czego potrzebuje Twoja spółkę — w jednym miejscu",
    description: "Gotowe dokumenty, kontrolowane terminy, spokój właściciela sp. z o.o.",
    url: "https://nawio.pl",
    siteName: "Nawio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nawio · Prowadzi. Nie radzi.",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nawio · Wszystko czego potrzebuje Twoja spółkę — w jednym miejscu",
    description: "Gotowe dokumenty, kontrolowane terminy, spokój właściciela sp. z o.o.",
  },
  alternates: {
    canonical: "https://nawio.pl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nawio",
    url: "https://nawio.pl",
    logo: "https://nawio.pl/icon.svg",
    email: "hej@nawio.pl",
    description:
      "Nawio to narzędzie IT dla właścicieli sp. z o.o. w Polsce. Gotowe dokumenty korporacyjne, kontrola terminów i asystent AI w jednym miejscu.",
    areaServed: "PL",
    inLanguage: "pl",
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Nawio",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: "https://nawio.pl",
    description:
      "Navigator dokumentów korporacyjnych dla polskich sp. z o.o. Uchwały, protokoły, terminy KRS, ZUS i US w jednym miejscu.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PLN",
      description: "Bezpłatny dostęp w fazie beta",
    },
    inLanguage: "pl",
    featureList: [
      "Kreator dokumentów korporacyjnych",
      "Kontrola terminów spółki",
      "Asystent AI dla sp. z o.o.",
      "Generowanie uchwał wspólników",
      "Protokoły zgromadzeń",
      "Kontrola terminów KRS, ZUS, US",
    ],
  };

  return (
    <html
      lang="pl"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="jsIgKEsPBt6sPBC7t1QaRTLFFxTasHibTmcGJIAslSE"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BEWKN8846Q"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BEWKN8846Q');
          `}
        </Script>
        <Script id="schema-organization" type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </Script>
        <Script id="schema-software-application" type="application/ld+json">
          {JSON.stringify(softwareApplicationSchema)}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
