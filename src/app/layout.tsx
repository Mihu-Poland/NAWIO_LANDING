import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
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
    "Gotowe dokumenty, pilnowane terminy, spokój właściciela sp. z o.o. — w jednym miejscu.",
  metadataBase: new URL("https://nawio.pl"),
  openGraph: {
    title: "Nawio · Prowadzi. Nie radzi.",
    description: "Gotowe dokumenty, pilnowane terminy, spokój właściciela sp. z o.o. — w jednym miejscu.",
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
