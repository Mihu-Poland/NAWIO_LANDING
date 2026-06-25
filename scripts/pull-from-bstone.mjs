/**
 * pull-from-bstone.mjs
 * --------------------
 * Pobiera gotowy wpis blogowy z centralnego silnika treści BStone AI
 * (GET /api/blog/next-post?brand=nawio) i wstawia go jako obiekt BlogPost
 * (treść HTML) do tablicy POSTS w src/lib/blog.ts.
 * PR tworzy workflow (peter-evans/create-pull-request).
 *
 * ENV:
 *   BSTONE_BLOG_TOKEN  — sekret do autoryzacji w BStone (Bearer)
 *   BSTONE_BLOG_API    — opcjonalny override URL (domyślnie produkcja)
 */
import fs from "node:fs";

const API =
  process.env.BSTONE_BLOG_API ||
  "https://bstonai.com/api/blog/next-post?brand=nawio";
const TOKEN = process.env.BSTONE_BLOG_TOKEN;

if (!TOKEN) {
  console.error("Brak BSTONE_BLOG_TOKEN");
  process.exit(1);
}

const res = await fetch(API, { headers: { Authorization: `Bearer ${TOKEN}` } });
if (!res.ok) {
  console.error("BStone API:", res.status, await res.text());
  process.exit(1);
}
const data = await res.json();
if (!data || !data.post) {
  console.log("Brak gotowych szkiców — nic do publikacji.");
  process.exit(0);
}

const p = data.post;
const file = "src/lib/blog.ts";
let src = fs.readFileSync(file, "utf-8");

if (src.includes(`slug: ${JSON.stringify(p.slug)}`)) {
  console.log("Wpis o tym slug już istnieje — pomijam.");
  process.exit(0);
}

const obj =
  `  {\n` +
  `    slug: ${JSON.stringify(p.slug)},\n` +
  `    title: ${JSON.stringify(p.title)},\n` +
  `    description: ${JSON.stringify(p.description)},\n` +
  `    publishedAt: ${JSON.stringify(p.publishedAt)},\n` +
  `    category: ${JSON.stringify(p.category)},\n` +
  `    readingTime: ${Number(p.readingTime) || 4},\n` +
  `    content: ${JSON.stringify(p.content)},\n` +
  `  },\n`;

const marker = "const POSTS: BlogPost[] = [";
const startIdx = src.indexOf(marker);
if (startIdx === -1) {
  console.error("Nie znaleziono tablicy POSTS w blog.ts");
  process.exit(1);
}
// Zamknięcie tablicy POSTS = ostatnie "\n]" przed pierwszą funkcją eksportowaną.
const exportIdx = src.indexOf("export function getBlogPosts", startIdx);
const closeIdx = src.lastIndexOf("\n]", exportIdx === -1 ? src.length : exportIdx);
if (closeIdx === -1 || closeIdx < startIdx) {
  console.error("Nie znaleziono zamknięcia tablicy POSTS");
  process.exit(1);
}

src = src.slice(0, closeIdx) + "\n" + obj + src.slice(closeIdx + 1);
fs.writeFileSync(file, src, "utf-8");
console.log("Dodano wpis:", p.slug);

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    `has_changes=true\nslug=${p.slug}\ntitle=${p.title}\n`,
  );
}
