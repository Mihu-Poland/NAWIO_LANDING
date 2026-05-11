import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

const CookieBanner = dynamic(() => import("@/components/legal/CookieBanner"), { ssr: false });

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
  title: "Nawio — Nawigator dokumentów dla sp. z o.o.",
  description:
    "Pilnuj terminów KRS, ZUS i US. Generuj uchwały, protokoły i umowy. Asystent AI dla właścicieli sp. z o.o. Bezpłatnie w fazie beta.",
  metadataBase: new URL("https://nawio.pl"),
  openGraph: {
    title: "Nawio — Nawigator formalny dla sp. z o.o.",
    description: "Terminy, dokumenty i asystent AI w jednym miejscu. Dla właścicieli sp. z o.o.",
    url: "https://nawio.pl",
    siteName: "Nawio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nawio — Nawigator dokumentów",
      },
    ],
    locale: "pl_PL",
    type: "website",
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
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
