import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { formatPolishDate } from "@/lib/format-polish-date";
import { getBlogPost, getBlogSlugs, type BlogPost } from "@/lib/blog";

/**
 * Zwraca publiczny URL obrazu Open Graph generowanego dla danego sluga.
 *
 * @author Mihu
 */
function blogOgImageUrl(slug: string): string {
  return `https://nawio.pl/blog/${slug}/opengraph-image`;
}

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
 * Metadane SEO i udostępnianie społecznościowe dla pojedynczego artykułu.
 *
 * @author Mihu
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Artykuł nie znaleziony" };
  }

  const canonicalUrl = `https://nawio.pl/blog/${post.slug}`;
  const ogImage = blogOgImageUrl(post.slug);

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: "Nawio",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: ["BearStone sp. z o.o."],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

/**
 * JSON-LD BlogPosting dla wyszukiwarek.
 *
 * @author Mihu
 */
function BlogPostingJsonLd({ post }: { post: BlogPost }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [blogOgImageUrl(post.slug)],
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
      url: "https://nawio.pl",
      logo: {
        "@type": "ImageObject",
        url: "https://nawio.pl/nawio-logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nawio.pl/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * JSON-LD BreadcrumbList — ścieżka Nawio → Blog → artykuł.
 *
 * @author Mihu
 */
function BreadcrumbJsonLd({ post }: { post: BlogPost }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Nawio", item: "https://nawio.pl" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://nawio.pl/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Strona pojedynczego artykułu (treść HTML z `src/lib/blog.ts`, styl `.blog-prose` z globals.css).
 *
 * @author Mihu
 */
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPostingJsonLd post={post} />
      <BreadcrumbJsonLd post={post} />

      <main className="container-main py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <nav className="mb-8 flex" aria-label="Ścieżka nawigacji">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-[#93a0ba]">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Nawio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="transition hover:text-white">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="max-w-[min(100%,220px)] truncate text-[#bcc6d8]">{post.title}</li>
            </ol>
          </nav>

          <img
            src={`/blog/${post.slug}/opengraph-image`}
            alt={post.title}
            width={1200}
            height={630}
            className="mb-10 aspect-[1200/630] w-full rounded-lg object-cover"
          />

          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <CategoryBadge category={post.category} />
              <span className="text-sm text-[#93a0ba]">{post.readingTime} min czytania</span>
            </div>

            <h1 className="section-title max-w-4xl text-[clamp(1.75rem,4vw,2.75rem)] leading-tight">
              {post.title}
            </h1>
            <p className="section-subtitle mt-4 max-w-3xl">{post.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#93a0ba]">
              <time dateTime={post.publishedAt}>
                Opublikowano: {formatPolishDate(post.publishedAt)}
              </time>
              {post.updatedAt && post.updatedAt !== post.publishedAt ? (
                <time dateTime={post.updatedAt}>
                  Aktualizacja: {formatPolishDate(post.updatedAt)}
                </time>
              ) : null}
            </div>
          </header>

          {post.tldr ? (
            <div className="mb-10 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold-soft)] p-5">
              <p className="text-sm font-semibold text-[var(--gold)]">W skrócie</p>
              <p className="mt-2 text-[#bcc6d8]">{post.tldr}</p>
            </div>
          ) : null}

          <hr className="mb-10 border-(--card-border)" />

          <div
            className="blog-prose card-luxe p-6 md:p-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.faq?.length ? (
            <>
              <section className="mt-12">
                <h2 className="mb-6 text-xl font-semibold text-white">Najczęstsze pytania</h2>
                <dl className="space-y-4">
                  {post.faq.map((item) => (
                    <div
                      key={item.question}
                      className="rounded-xl border border-(--card-border) bg-white/5 p-4"
                    >
                      <dt className="font-medium text-white">{item.question}</dt>
                      <dd className="mt-2 text-sm text-[#93a0ba]">{item.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: post.faq.map((item) => ({
                      "@type": "Question",
                      name: item.question,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: item.answer,
                      },
                    })),
                  }),
                }}
              />
            </>
          ) : null}

          <hr className="my-12 border-(--card-border)" />

          <footer className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#93a0ba] transition hover:text-white"
            >
              ← Wróć do bloga
            </Link>
            <a
              href="https://app.nawio.pl/register"
              className="btn-gold inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold"
            >
              Rozpocznij w Nawio — generuj dokumenty
            </a>
          </footer>
        </div>
      </main>
    </>
  );
}
