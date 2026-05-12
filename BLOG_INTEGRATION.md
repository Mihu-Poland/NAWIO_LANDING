# Nawio — integracja bloga (landing)

Krótka dokumentacja stanu wdrożenia w **NAWIO_LANDING** i jak dodawać wpisy.

## Struktura plików

| Ścieżka | Rola |
|--------|------|
| `src/lib/blog.ts` | Dane wpisów (`POSTS`), typy, `getBlogPosts` / `getBlogPost` / `getBlogSlugs`, `getCategoryLabel` |
| `src/app/blog/page.tsx` | Indeks `/blog` |
| `src/app/blog/[slug]/page.tsx` | Artykuł, metadane, JSON-LD `BlogPosting` |
| `src/app/blog/[slug]/opengraph-image.tsx` | Obraz OG 1200×630 (`next/og`) |
| `src/components/blog/CategoryBadge.tsx` | Badge kategorii (lista + artykuł) |
| `src/lib/format-polish-date.ts` | Format daty PL |
| `src/app/sitemap.ts` | `/blog`, `/blog/[slug]`, kotwice strony głównej, strony prawne |

W `src/app/page.tsx` w nawigacji jest już link **`/blog`**.

## Styl treści artykułu (bez `@tailwindcss/typography`)

Obecnie **nie** używamy wtyczki `@tailwindcss/typography` ani klas `prose-*`.

Treść HTML z `blog.ts` jest owijana w kontener z klasą **`blog-prose`**; style są w **`src/app/globals.css`** (nagłówki, listy, `.disclaimer`, `.code-block`, `.calendar-table`).

Opcjonalnie możesz dodać `npm install -D @tailwindcss/typography` i rozszerzyć styl — nie jest to wymagane przy obecnym setupie.

## Sitemap

`src/app/sitemap.ts` importuje **`getBlogPosts()`** i dla każdego wpisu ustawia `lastModified` z `updatedAt ?? publishedAt`. Po dodaniu artykułu i deployu nowy URL pojawia się w `/sitemap.xml` automatycznie.

## Weryfikacja po wdrożeniu

```bash
curl -sS "https://nawio.pl/sitemap.xml" | head -80
```

```bash
curl -sS "https://nawio.pl/blog/uchwala-sp-z-o-o-wzor" | head -5
# W przeglądarce: title, meta description, JSON-LD
```

```text
https://nawio.pl/blog/uchwala-sp-z-o-o-wzor/opengraph-image
```

Oczekiwany wynik: obraz PNG 1200×630.

## Dodawanie nowych artykułów

1. Otwórz **`src/lib/blog.ts`**.
2. Dodaj obiekt do tablicy `POSTS` (slug, title, description, `content` jako HTML, `publishedAt`, opcjonalnie `updatedAt`, `category`, `readingTime`).
3. Na końcu treści artykułu w `content` zostaw `${DISCLAIMER}` (szablon jest w tym samym pliku).
4. Zdeployuj — strona statyczna, sitemap i OG dla nowego sluga generują się w buildzie.
