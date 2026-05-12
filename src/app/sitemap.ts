import { MetadataRoute } from "next";
import { getBlogSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = [
    {
      url: "https://nawio.pl/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    ...getBlogSlugs().map((slug) => ({
      url: `https://nawio.pl/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];

  return [
    {
      url: "https://nawio.pl",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://nawio.pl/polityka-prywatnosci",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://nawio.pl/regulamin",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...blogEntries,
  ];
}