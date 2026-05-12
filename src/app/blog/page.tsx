import type { Metadata } from "next";
import Link from "next/link";
import {
  getBlogPosts,
  getCategoryLabel,
  type BlogCategory,
  type BlogPost,
} from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artykuły o dokumentacji korporacyjnej sp. z o.o.: uchwały, zgromadzenia wspólników, terminy KRS. Informacja ogólna, nie porada prawna.",
  alternates: { canonical: "https://nawio.pl/blog" },
  openGraph: {
    title: "Blog Nawio — dokumenty sp. z o.o. bez zbędnego żargonu",
    description:
      "Uchwały, ZZW, terminy KRS i inne zdarzenia korporacyjne — wyjaśnione przystępnie.",
    url: "https://nawio.pl/blog",
    siteName: "Nawio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Nawio — dokumenty i terminy sp. z o.o.",
    description:
      "Uchwały, zgromadzenia wspólników, terminy KRS — informacje ogólne dla właścicieli spółek.",
  },
};

/**
 * Formatuje datę ISO do postaci np. „12 maja 2026”.
 *
 * @author Mihu
 */
function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Etykieta kategorii wpisu — stonowane kolory pod ciemny motyw Nawio.
 *
 * @author Mihu
 */
function CategoryBadge({ category }: { category: BlogCategory }) {
  const colorMap: Record<BlogCategory, string> = {
    dokumenty:
      "border-[#3b82f6]/35 bg-[#3b82f6]/10 text-[#93c5fd]",
    terminy:
      "border-[#f59e0b]/35 bg-[#f59e0b]/10 text-[#fcd34d]",
    krs:
      "border-[#a855f7]/35 bg-[#a855f7]/10 text-[#e9d5ff]",
    zus:
      "border-[#22c55e]/35 bg-[#22c55e]/10 text-[#bbf7d0]",
    us:
      "border-[#ef4444]/35 bg-[#ef4444]/10 text-[#fecaca]",
    poradnik:
      "border-[#14b8a6]/35 bg-[#14b8a6]/10 text-[#99f6e4]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colorMap[category]}`}
    >
      {getCategoryLabel(category)}
    </span>
  );
}

/**
 * Karta pojedynczego wpisu na liście bloga.
 *
 * @author Mihu
 */
function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group card-luxe flex flex-col p-6 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-luxe)]"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <CategoryBadge category={post.category} />
        <span className="shrink-0 text-xs text-[#93a0ba]">
          {post.readingTime} min czytania
        </span>
      </div>

      <h2 className="mb-2 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-gold">
        {post.title}
      </h2>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-[#bcc6d8]">
        {post.description}
      </p>

      <div className="flex items-center justify-between gap-2 border-t border-(--card-border)/80 pt-4">
        <time dateTime={post.publishedAt} className="text-xs text-[#93a0ba]">
          {formatDate(post.publishedAt)}
          {post.updatedAt && post.updatedAt !== post.publishedAt ? (
            <span className="ml-1 block sm:inline">
              (aktualizacja: {formatDate(post.updatedAt)})
            </span>
          ) : null}
        </time>
        <span className="text-xs font-medium text-gold transition-colors group-hover:text-[oklch(0.82_0.13_85)]">
          Czytaj →
        </span>
      </div>
    </Link>
  );
}

/**
 * Indeks bloga Nawio — lista artykułów z `src/lib/blog.ts`.
 *
 * @author Mihu
 */
export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <main className="container-main py-12 md:py-16">
      <header className="mb-12 text-center md:text-left">
        <nav className="mb-6 flex justify-center md:justify-start" aria-label="Ścieżka nawigacji">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[#93a0ba]">
            <li>
              <Link href="/" className="transition hover:text-white">
                Nawio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#bcc6d8]">Blog</li>
          </ol>
        </nav>

        <h1 className="section-title">Blog Nawio</h1>
        <p className="section-subtitle mx-auto mt-4 max-w-2xl md:mx-0">
          Dokumentacja korporacyjna sp. z o.o. wyjaśniona po ludzku. Uchwały, zgromadzenia
          wspólników, terminy KRS — bez prawniczego bełkotu. To informacja ogólna, nie porada
          prawna.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-center text-[#93a0ba]">Brak artykułów. Wróć wkrótce.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}

      <div className="card-luxe mt-16 border border-(--gold)/40 bg-(--gold-soft) p-8 text-center">
        <p className="text-lg font-semibold text-white">Wolisz działać niż czytać?</p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#bcc6d8]">
          Nawio generuje gotowe dokumenty dla sp. z o.o. — uchwały, protokoły, zawiadomienia.
        </p>
        <a
          href="https://app.nawio.pl/register"
          className="btn-gold mt-6 inline-flex rounded-md px-6 py-3 text-sm font-semibold"
        >
          Rozpocznij za darmo
        </a>
      </div>
    </main>
  );
}
