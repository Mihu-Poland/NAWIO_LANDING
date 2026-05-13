#!/usr/bin/env node
/**
 * [LAN] scripts/generate-blog-post.mjs
 * --------------------------------------
 * Półautomatyczny generator artykułów bloga Nawio.
 *
 * ARCHITEKTURA:
 * Wszystkie artykuły żyją w tablicy POSTS w src/lib/blog.ts.
 * Skrypt dopisuje nowy obiekt BlogPost przed zamykającym `]` tej tablicy.
 *
 * DLACZEGO DWA WYWOŁANIA CLAUDE:
 * Jedno wywołanie zwracające JSON z HTML w środku powoduje błędy parsowania
 * (cudzysłowy w atrybutach HTML łamią JSON). Dwa wywołania = zero problemów.
 *   Wywołanie 1 (+ web_search): wybór tematu → TYLKO metadane JSON
 *   Wywołanie 2: treść artykułu → TYLKO czysty HTML
 *
 * @author Mihu
 * @updated 2026-05-13
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

const CONFIG = {
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  githubToken:     process.env.GITHUB_TOKEN,
  githubRepo:      process.env.GITHUB_REPO,
  resendApiKey:    process.env.RESEND_API_KEY,
  dryRun:          process.env.DRY_RUN === "true",
  emailTo:         "helpdesk@bearstone.pl",
  emailFrom:       "hej@nawio.pl",
  blogFile:        path.join(ROOT, "src/lib/blog.ts"),
  topicsFile:      path.join(ROOT, "scripts/blog-topics.json"),
  model:           "claude-sonnet-4-5",
}

// ---------------------------------------------------------------------------
// WALIDACJA
// ---------------------------------------------------------------------------

/** Rzuca błąd gdy brakuje wymaganych zmiennych środowiskowych. */
function validateEnv() {
  const required = ["ANTHROPIC_API_KEY", "GITHUB_TOKEN", "GITHUB_REPO", "RESEND_API_KEY"]
  const missing = required.filter((key) => !process.env[key])
  if (missing.length > 0) throw new Error(`Brakujące zmienne środowiskowe: ${missing.join(", ")}`)
}

// ---------------------------------------------------------------------------
// CLAUDE API
// ---------------------------------------------------------------------------

/**
 * Wywołuje Claude API i zwraca ostatni blok tekstowy odpowiedzi.
 * @param {object} opts
 * @param {string} opts.system
 * @param {string} opts.user
 * @param {number} [opts.maxTokens]
 * @param {boolean} [opts.useWebSearch]
 */
async function callClaude({ system, user, maxTokens = 4000, useWebSearch = false }) {
  const body = {
    model: CONFIG.model,
    max_tokens: maxTokens,
    system,
    messages: [{ role: "user", content: user }],
  }
  if (useWebSearch) {
    body.tools = [{ type: "web_search_20250305", name: "web_search" }]
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": CONFIG.anthropicApiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Claude API error ${response.status}: ${await response.text()}`)
  }

  const data = await response.json()
  const textBlocks = data.content.filter((b) => b.type === "text")
  if (textBlocks.length === 0) throw new Error("Claude nie zwrócił żadnego bloku tekstowego")

  return textBlocks[textBlocks.length - 1].text.trim()
}

// ---------------------------------------------------------------------------
// TEMATY I ISTNIEJĄCE SLUGI
// ---------------------------------------------------------------------------

/** Wczytuje listę tematów z blog-topics.json. */
function loadTopics() {
  const topics = JSON.parse(fs.readFileSync(CONFIG.topicsFile, "utf-8"))
  console.log(`✅ Wczytano ${topics.length} tematów z blog-topics.json`)
  return topics
}

/**
 * Parsuje src/lib/blog.ts i zwraca slugi już istniejących artykułów.
 * Szuka wzorca:   slug: "cokolwiek"
 */
function loadExistingSlugs() {
  const content = fs.readFileSync(CONFIG.blogFile, "utf-8")
  const matches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)]
  const slugs = matches.map((m) => m[1])
  console.log(`✅ Istniejące slugi (${slugs.length}): ${slugs.join(", ")}`)
  return slugs
}

// ---------------------------------------------------------------------------
// WYWOŁANIE 1: wybór tematu + metadane — TYLKO JSON, zero HTML
// ---------------------------------------------------------------------------

/**
 * Wybiera dostępny temat i zwraca metadane artykułu jako obiekt JS.
 * Używa web_search do weryfikacji popularności tematu.
 * @param {Array} topics
 * @param {string[]} existingSlugs
 */
async function chooseTopicAndGetMeta(topics, existingSlugs) {
  console.log("🤖 Wywołanie 1: wybór tematu i metadane (+ web_search)...")

  const available = topics.filter((t) => !existingSlugs.includes(t.slug))
  if (available.length === 0) {
    throw new Error("Brak dostępnych tematów! Dodaj nowe wpisy do scripts/blog-topics.json.")
  }

  const rawText = await callClaude({
    useWebSearch: true,
    maxTokens: 1000,
    system: `Jesteś ekspertem SEO dla polskich spółek z o.o. w 2026 roku.
Zwróć TYLKO czysty JSON — bez tekstu przed, bez tekstu po, bez markdown, bez backticks.
Dozwolone kategorie: dokumenty | terminy | krs | zus | us | poradnik
Format odpowiedzi (i nic więcej):
{"slug":"kebab-case-max-60-chars","title":"keyword-rich tytuł max 60 znaków","description":"meta description 150-160 znaków","category":"jedna z dozwolonych","readingTime":6}`,
    user: `Użyj web_search, żeby sprawdzić, które polskie frazy z poniższej listy mają największy ruch organiczny w 2026 roku.
Wybierz JEDEN temat — ten z najwyższym potencjałem SEO — i zwróć JSON z danymi artykułu.
Lista dostępnych tematów (slug → keyword):
${available.map((t) => `• ${t.slug} → "${t.keyword}"`).join("\n")}`,
  })

  const jsonStart = rawText.indexOf("{")
  const jsonEnd   = rawText.lastIndexOf("}")
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error(`Claude nie zwrócił JSON. Odpowiedź (pierwsze 300 znaków): ${rawText.substring(0, 300)}`)
  }

  const meta = JSON.parse(rawText.slice(jsonStart, jsonEnd + 1))
  console.log(`✅ Wybrany temat: "${meta.title}" (${meta.slug})`)
  return meta
}

// ---------------------------------------------------------------------------
// WYWOŁANIE 2: treść artykułu — TYLKO HTML, zero JSON
// ---------------------------------------------------------------------------

/**
 * Generuje treść artykułu jako HTML.
 * @param {object} meta — wynik wywołania 1
 */
async function generateContent(meta) {
  console.log("🤖 Wywołanie 2: generowanie treści artykułu...")

  const content = await callClaude({
    maxTokens: 8000,
    system: `Jesteś doświadczonym copywriterem piszącym po polsku dla właścicieli sp. z o.o.
Styl: naturalny, konkretny, bez prawniczego bełkotu. Minimum 700 słów.
Struktura: H2 i H3, krótkie akapity, listy punktowane tam gdzie pasują.
Zwracasz TYLKO czysty HTML — żadnego tekstu przed ani po.
Zacznij bezpośrednio od pierwszego <h2>. Nie dodawaj <article>, <html>, <body>, <head>.
Używaj WYŁĄCZNIE pojedynczych cudzysłowów w atrybutach HTML (class='...', nie class="...").
Zawsze kończ artykuł dosłownie tym disclaimerem — bez żadnych zmian:
<div class='disclaimer'><p>Treści publikowane przez Nawio mają charakter informacyjny i nie stanowią porady prawnej ani podatkowej. BearStone sp. z o.o. nie ponosi odpowiedzialności za skutki działań podjętych na ich podstawie.</p></div>`,
    user: `Napisz artykuł blogowy na podstawie poniższych danych:
Tytuł: ${meta.title}
Opis SEO: ${meta.description}
Kategoria: ${meta.category}

Przed disclaimerem dodaj krótki akapit (2-3 zdania) opisujący, jak Nawio (nawio.pl) —
korporacyjny nawigator dla właścicieli sp. z o.o. — pomaga z dokumentacją i terminami.`,
  })

  console.log(`✅ Treść wygenerowana (${content.length} znaków)`)
  return content
}

// ---------------------------------------------------------------------------
// WSTRZYKNIĘCIE DO SRC/LIB/BLOG.TS
// ---------------------------------------------------------------------------

/**
 * Buduje string TypeScript reprezentujący nowy obiekt BlogPost
 * i wstrzykuje go do tablicy POSTS w src/lib/blog.ts przed zamykającym `]`.
 * @param {object} meta
 * @param {string} content — czysty HTML z wywołania 2
 * @returns {{ today: string }}
 */
function injectPostIntoBlogTs(meta, content) {
  const today = new Date().toISOString().split("T")[0]

  // Escaping dla template literal: backticks i ${ sekwencje
  const escapedContent = content
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${")

  const postBlock = `
  // =========================================================================
  // ARTYKUŁ (auto): ${meta.title}
  // =========================================================================
  {
    slug: ${JSON.stringify(meta.slug)},
    title: ${JSON.stringify(meta.title)},
    description: ${JSON.stringify(meta.description)},
    publishedAt: ${JSON.stringify(today)},
    category: ${JSON.stringify(meta.category)},
    readingTime: ${meta.readingTime},
    content: \`
<article>
${escapedContent}
</article>
    \`,
  },`

  let blogContent = fs.readFileSync(CONFIG.blogFile, "utf-8")

  // Szukamy ostatniego `]` zamykającego tablicę POSTS.
  // Tablica kończy się wzorcem:  ,\n]\n\n// ---
  const insertionMarker = "\n]\n"
  const insertionIndex = blogContent.lastIndexOf(insertionMarker)
  if (insertionIndex === -1) {
    throw new Error("Nie znaleziono markera końca tablicy POSTS (`\\n]\\n`) w src/lib/blog.ts")
  }

  blogContent =
    blogContent.slice(0, insertionIndex) +
    postBlock +
    blogContent.slice(insertionIndex)

  fs.writeFileSync(CONFIG.blogFile, blogContent, "utf-8")
  console.log(`✅ Wstrzyknięto artykuł "${meta.slug}" do src/lib/blog.ts`)
  return { today }
}

// ---------------------------------------------------------------------------
// GITHUB PR
// ---------------------------------------------------------------------------

/**
 * Tworzy nowy branch, commituje zaktualizowany src/lib/blog.ts i otwiera PR.
 * @param {object} meta
 * @param {string} today — ISO date string
 * @returns {string} URL do PR
 */
async function createGithubPR(meta, today) {
  const [owner, repo] = CONFIG.githubRepo.split("/")
  const branchName = `blog/auto-${meta.slug}-${today}`
  const headers = {
    "Authorization":        `Bearer ${CONFIG.githubToken}`,
    "Accept":               "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type":         "application/json",
  }

  // Pobierz SHA HEAD main
  const refRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/main`,
    { headers }
  )
  if (!refRes.ok) throw new Error(`GitHub ref error: ${await refRes.text()}`)
  const baseSha = (await refRes.json()).object.sha

  // Utwórz branch
  const branchRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/refs`,
    { method: "POST", headers, body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseSha }) }
  )
  if (!branchRes.ok) throw new Error(`GitHub create branch: ${await branchRes.text()}`)

  // Pobierz SHA drzewa bazowego commitu
  const commitRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/commits/${baseSha}`,
    { headers }
  )
  if (!commitRes.ok) throw new Error(`GitHub commit fetch: ${await commitRes.text()}`)
  const baseTreeSha = (await commitRes.json()).tree.sha

  // Utwórz nowe drzewo ze zaktualizowanym blog.ts
  const blogContent = fs.readFileSync(CONFIG.blogFile, "utf-8")
  const treeRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: [
          { path: "src/lib/blog.ts", mode: "100644", type: "blob", content: blogContent },
        ],
      }),
    }
  )
  if (!treeRes.ok) throw new Error(`GitHub create tree: ${await treeRes.text()}`)
  const treeSha = (await treeRes.json()).sha

  // Utwórz commit
  const newCommitRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/commits`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        message: `blog: auto-generate "${meta.title}"`,
        tree: treeSha,
        parents: [baseSha],
      }),
    }
  )
  if (!newCommitRes.ok) throw new Error(`GitHub create commit: ${await newCommitRes.text()}`)
  const newCommitSha = (await newCommitRes.json()).sha

  // Przesuń HEAD brancha
  const patchRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branchName}`,
    { method: "PATCH", headers, body: JSON.stringify({ sha: newCommitSha }) }
  )
  if (!patchRes.ok) throw new Error(`GitHub patch ref: ${await patchRes.text()}`)

  // Otwórz PR
  const prRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: `[Blog] ${meta.title}`,
        body: [
          "## Auto-wygenerowany artykuł bloga Nawio",
          "",
          `**Tytuł:** ${meta.title}`,
          `**Slug:** \`/blog/${meta.slug}\``,
          `**Kategoria:** ${meta.category}`,
          `**Czas czytania:** ${meta.readingTime} min`,
          "",
          `**Opis SEO:**`,
          meta.description,
          "",
          "---",
          "",
          "**Zmieniony plik:** `src/lib/blog.ts` — nowy wpis dopisany do tablicy `POSTS`.",
          "",
          "*Wygenerowany przez Claude API (claude-sonnet-4-5) + web_search*",
        ].join("\n"),
        head: branchName,
        base: "main",
      }),
    }
  )
  if (!prRes.ok) throw new Error(`GitHub create PR: ${await prRes.text()}`)
  const prData = await prRes.json()
  if (!prData.html_url) throw new Error(`Brak html_url w odpowiedzi PR: ${JSON.stringify(prData)}`)

  console.log(`✅ PR otwarty: ${prData.html_url}`)
  return prData.html_url
}

// ---------------------------------------------------------------------------
// EMAIL (Resend)
// ---------------------------------------------------------------------------

/**
 * Wysyła email z linkiem do PR na helpdesk@bearstone.pl.
 * @param {object} meta
 * @param {string} prUrl
 */
async function sendEmail(meta, prUrl) {
  console.log(`📧 Wysyłam email na ${CONFIG.emailTo}...`)

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${CONFIG.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONFIG.emailFrom,
      to: [CONFIG.emailTo],
      subject: `[Nawio Blog] Do zatwierdzenia: ${meta.title}`,
      html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <div style="background:#030712;color:white;padding:24px;border-radius:8px 8px 0 0">
    <h1 style="margin:0;font-size:20px">Nowy artykuł do zatwierdzenia</h1>
  </div>
  <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
    <h2 style="margin-top:0;color:#111827">${meta.title}</h2>
    <table style="border-collapse:collapse;width:100%;margin-bottom:20px">
      <tr><td style="padding:6px 0;color:#6b7280;width:130px">Slug</td><td style="padding:6px 0"><code>/blog/${meta.slug}</code></td></tr>
      <tr><td style="padding:6px 0;color:#6b7280">Kategoria</td><td style="padding:6px 0">${meta.category}</td></tr>
      <tr><td style="padding:6px 0;color:#6b7280">Czas czytania</td><td style="padding:6px 0">${meta.readingTime} min</td></tr>
    </table>
    <p style="color:#374151;margin-bottom:20px"><strong>Opis SEO:</strong><br>${meta.description}</p>
    <a href="${prUrl}"
       style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600">
      Otwórz PR na GitHub
    </a>
    <p style="color:#9ca3af;font-size:12px;margin-top:24px">
      Zmerguj PR → Vercel automatycznie opublikuje artykuł na nawio.pl
    </p>
  </div>
</div>`,
    }),
  })

  if (!res.ok) {
    console.warn(`⚠️  Email error (${res.status}): ${await res.text()}`)
    return
  }
  console.log(`✅ Email wysłany na ${CONFIG.emailTo}`)
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

async function main() {
  console.log("\n🚀 Nawio Blog Generator — start\n")

  if (CONFIG.dryRun) {
    console.log("ℹ️  DRY RUN — PR i email zostaną pominięte\n")
  }

  try {
    validateEnv()

    const topics        = loadTopics()
    const existingSlugs = loadExistingSlugs()

    const meta    = await chooseTopicAndGetMeta(topics, existingSlugs)

    // 60s przerwa między wywołaniami Claude (rate-limit safety)
    console.log("⏳ Czekam 60 s przed wywołaniem 2 (rate limit)...")
    await new Promise((r) => setTimeout(r, 60_000))

    const content  = await generateContent(meta)
    const { today } = injectPostIntoBlogTs(meta, content)

    if (CONFIG.dryRun) {
      console.log("\n✅ DRY RUN zakończony — blog.ts zaktualizowany lokalnie, bez PR i emaila.\n")
      return
    }

    const prUrl = await createGithubPR(meta, today)
    await sendEmail(meta, prUrl)

    console.log(`\n✅ Gotowe! Zmerguj PR żeby opublikować artykuł na nawio.pl 🚀\n`)
  } catch (err) {
    console.error("\n❌ BŁĄD:", err.message)

    // Błędowy email — best-effort, nie rzuca dalej
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "hej@nawio.pl",
          to: ["helpdesk@bearstone.pl"],
          subject: "[Nawio Blog] Błąd generowania artykułu",
          html: `<div style="font-family:sans-serif;padding:24px">
  <h2 style="color:#dc2626">Błąd generowania artykułu bloga</h2>
  <pre style="background:#f3f4f6;padding:16px;border-radius:6px;overflow:auto">${err.message}</pre>
  <p style="color:#6b7280;font-size:12px">Sprawdź logi GitHub Actions po szczegóły.</p>
</div>`,
        }),
      })
    } catch (_) {
      // ignoruj błąd emaila o błędzie
    }

    process.exit(1)
  }
}

main()
