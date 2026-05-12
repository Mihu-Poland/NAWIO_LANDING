import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts, getCategoryLabel } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artykuły o formalnościach sp. z o.o.: uchwały, zgromadzenia wspólników, terminy KRS i praktyczne wskazówki.",
  alternates: { canonical: "https://nawio.pl/blog" },
};

/**
 * Lista wpisów bloga Nawio (dane statyczne z `src/lib/blog.ts`).
 *
 * @author Mihu
 */
export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <main className="container-main py-12 md:py-16">
      <div className="mb-10 space-y-3 text-center md:text-left">
        <Link
          href="/"
          className="inline-block text-sm text-[#93a0ba] transition hover:text-white"
        >
          ← Nawio
        </Link>
        <h1 className="section-title">Blog</h1>
        <p className="section-subtitle mx-auto max-w-2xl md:mx-0">
          Informacje ogólne o formalnościach spółki — bez substytuowania porady prawnej.
        </p>
      </div>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="card-luxe flex h-full flex-col p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-gold">
                {getCategoryLabel(post.category)} · {post.readingTime} min czytania
              </p>
              <h2 className="mt-3 text-xl font-semibold text-white">
                <Link href={`/blog/${post.slug}`} className="transition hover:text-gold">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#bcc6d8]">
                {post.description}
              </p>
              <p className="mt-4 text-xs text-[#93a0ba]">
                {post.publishedAt}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
