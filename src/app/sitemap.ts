import type { MetadataRoute } from "next";

/**
 * Generuje mapę strony dla publicznych adresów URL serwisu.
 *
 * @returns Lista wpisów sitemap z priorytetami i częstotliwością zmian.
 *
 * @author Mihu
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nawio.pl";
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cennik`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
