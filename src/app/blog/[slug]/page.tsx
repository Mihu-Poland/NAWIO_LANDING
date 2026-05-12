import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getBlogPost, getBlogSlugs, getCategoryLabel } from "@/lib/blog";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * Generuje statyczne ścieżki dla wszystkich wpisów bloga.
 *
 * @author Mihu
 */
export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

/**
 * Metadane SEO dla pojedynczego artykułu.
 *
 * @author Mihu
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return { title: "Artykuł | Nawio" };
  }
  return {
    title: `${post.title} | Nawio`,
    description: post.description,
    alternates: { canonical: `https://nawio.pl/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://nawio.pl/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

/**
 * Strona pojedynczego artykułu bloga (HTML z modułu `blog.ts`).
 *
 * @author Mihu
 */
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Nawio",
      url: "https://nawio.pl",
    },
    publisher: {
      "@type": "Organization",
      name: "BearStone sp. z o.o.",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nawio.pl/blog/${post.slug}`,
    },
  };

  return (
    <>
      <Script
        id={`blog-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="container-main py-12 md:py-16">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-block text-sm text-[#93a0ba] transition hover:text-white"
          >
            ← Blog
          </Link>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gold">
            {getCategoryLabel(post.category)} · {post.readingTime} min · {post.publishedAt}
          </p>
          <h1 className="section-title mt-3 max-w-4xl">{post.title}</h1>
          <p className="section-subtitle mt-4 max-w-3xl">{post.description}</p>
        </div>

        <div
          className="blog-prose card-luxe p-6 md:p-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </>
  );
}
