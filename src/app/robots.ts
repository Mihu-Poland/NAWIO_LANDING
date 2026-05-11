import type { MetadataRoute } from "next";

/**
 * Generuje reguły robots.txt dla crawlerów.
 *
 * @returns Konfiguracja indeksacji oraz adres sitemapy.
 *
 * @author Mihu
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: "https://nawio.pl/sitemap.xml",
  };
}
