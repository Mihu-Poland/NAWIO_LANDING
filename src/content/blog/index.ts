/**
 * [LAN] src/content/blog/index.ts
 * --------------------------------
 * Centralny rejestr artykułów bloga.
 * Auto-generator (GitHub Actions) dodaje tu nowy import i wpis w tablicy POSTS.
 *
 * NAPYCHANIE MISIA:
 * - Każdy artykuł to osobny plik TS z default export BlogPost
 * - Skrypt generate-blog-post.mjs dodaje import na dole sekcji importów
 *   i wpis do tablicy — nie modyfikuje żadnego istniejącego kodu
 * - Kolejność w tablicy = kolejność na stronie bloga (sortujemy po dacie w blog.ts)
 *
 * JAK DODAĆ ARTYKUŁ RĘCZNIE:
 * 1. Stwórz plik src/content/blog/[slug].ts (wzoruj się na istniejących)
 * 2. Dodaj import poniżej
 * 3. Dodaj do tablicy POSTS
 * 4. Gotowe — sitemap i OG image generują się automatycznie
 *
 * @author Jadźka (Cursor AI persona) + Mihu
 * @updated 2026-05-12
 */

import type { BlogPost } from "@/lib/blog"

// ---------------------------------------------------------------------------
// IMPORTY ARTYKUŁÓW
// Auto-generator wstawia nowe importy w tej sekcji (przed znacznikiem END)
// ---------------------------------------------------------------------------

// [IMPORTS:START]
import uchwala from "./uchwala-sp-z-o-o-wzor"
import zgromadzenie from "./zgromadzenie-wspolnikow-sp-z-o-o-kiedy-jak"
import terminyKrs from "./terminy-krs-2026"
import eDoreczeniaSpZOOJakZalozyc from "./e-doreczenia-sp-z-o-o-jak-zalozyc"
// [IMPORTS:END]

// ---------------------------------------------------------------------------
// REJESTR ARTYKUŁÓW
// Auto-generator dodaje nowy wpis przed znacznikiem END
// ---------------------------------------------------------------------------

// [POSTS:START]
export const POSTS: BlogPost[] = [
  uchwala,
  zgromadzenie,
  terminyKrs,
]  eDoreczeniaSpZOOJakZalozyc,

// [POSTS:END]
