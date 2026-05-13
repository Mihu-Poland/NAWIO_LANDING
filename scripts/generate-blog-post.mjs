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
 * FLOW (4 kroki):
 *   Wywołanie 1 (+ web_search): wybór tematu → TYLKO metadane JSON
 *   Wywołanie 2: treść artykułu → TYLKO czysty HTML (z constraints z nawio-capabilities.md)
 *   Wywołanie 3: review sekcji Nawio → JSON { ideas[], revised? }
 *     - ideas   → GitHub Issue jako backlog feature requests
 *     - revised → poprawiony HTML sekcji Nawio (jeśli coś wymyślono)
 *   PR + email
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
  anthropicApiKey:  process.env.ANTHROPIC_API_KEY,
  githubToken:      process.env.GITHUB_TOKEN,
  githubRepo:       process.env.GITHUB_REPO,
  resendApiKey:     process.env.RESEND_API_KEY,
  dryRun:           process.env.DRY_RUN === "true",
  emailTo:          "helpdesk@bearstone.pl",
  emailFrom:        "hej@nawio.pl",
  blogFile:         path.join(ROOT, "src/lib/blog.ts"),
  topicsFile:       path.join(ROOT, "scripts/blog-topics.json"),
  capabilitiesFile: path.join(ROOT, "scripts/nawio-capabilities.md"),
  model:            "claude-sonnet-4-5",
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
// TEMATY, ISTNIEJĄCE SLUGI, CAPABILITIES
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

/** Wczytuje opis aktualnych możliwości Nawio z nawio-capabilities.md. */
function loadCapabilities() {
  return fs.readFileSync(CONFIG.capabilitiesFile, "utf-8")
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
 * Capabilities są wstrzykiwane do system promptu, żeby sekcja "Jak Nawio pomaga"
 * opisywała WYŁĄCZNIE istniejące funkcje.
 * @param {object} meta — wynik wywołania 1
 * @param {string} capabilities — zawartość nawio-capabilities.md
 */
async function generateContent(meta, capabilities) {
  console.log("🤖 Wywołanie 2: generowanie treści artykułu...")

  const content = await callClaude({
    maxTokens: 8000,
    system: `Jesteś doświadczonym copywriterem piszącym po polsku dla właścicieli sp. z o.o.
Styl: naturalny, konkretny, bez prawniczego bełkotu. Minimum 700 słów.
Struktura: H2 i H3, krótkie akapity, listy punktowane tam gdzie pasują.
Zwracasz TYLKO czysty HTML — żadnego tekstu przed ani po.
Zacznij bezpośrednio od pierwszego <h2>. Nie dodawaj <article>, <html>, <body>, <head>.
Używaj WYŁĄCZNIE pojedynczych cudzysłowów w atrybutach HTML (class='...', nie class="...").

WAŻNE — sekcja "Jak Nawio pomaga":
Nawio to aplikacja dla właścicieli sp. z o.o. Oto co Nawio FAKTYCZNIE potrafi — opisz TYLKO te funkcje, nic więcej:
${capabilities}

Zawsze kończ artykuł dosłownie tym disclaimerem — bez żadnych zmian:
<div class='disclaimer'><p>Treści publikowane przez Nawio mają charakter informacyjny i nie stanowią porady prawnej ani podatkowej. BearStone sp. z o.o. nie ponosi odpowiedzialności za skutki działań podjętych na ich podstawie.</p></div>`,
    user: `Napisz artykuł blogowy na podstawie poniższych danych:
Tytuł: ${meta.title}
Opis SEO: ${meta.description}
Kategoria: ${meta.category}

Przed disclaimerem dodaj sekcję <h2>Jak Nawio pomaga właścicielom sp. z o.o.?</h2>
z 2-3 akapitami opisującymi TYLKO istniejące funkcje Nawio (patrz lista wyżej).`,
  })

  console.log(`✅ Treść wygenerowana (${content.length} znaków)`)
  return content
}

// ---------------------------------------------------------------------------
// WYWOŁANIE 3: review sekcji Nawio — JSON { ideas, revised }
// ---------------------------------------------------------------------------

/**
 * Porównuje sekcję "Jak Nawio pomaga" z listą rzeczywistych możliwości.
 * Zwraca pomysły na nowe funkcje (do backlogu) i ewentualnie poprawiony HTML.
 *
 * @param {object} meta
 * @param {string} content — pełny HTML artykułu
 * @param {string} capabilities
 * @returns {{ ideas: string[], revised: string }}
 */
async function reviewNawioSection(meta, content, capabilities) {
  console.log("🤖 Wywołanie 3: review sekcji Nawio + ekstrakcja pomysłów na backlog...")

  // Wyciągamy sekcję Nawio prostym regex — od nagłówka do <div class='disclaimer'> lub kolejnego h2
  const nawioMatch = content.match(
    /<h[23][^>]*>[^<]*[Nn]awio[^<]*<\/h[23]>([\s\S]*?)(?=<h[23]|<div class=['"]disclaimer)/i
  )
  const nawioSection = nawioMatch ? nawioMatch[0] : content.slice(-800)

  const rawText = await callClaude({
    maxTokens: 1500,
    system: `Jesteś product managerem i content edytorem aplikacji Nawio.
Zwróć WYŁĄCZNIE poprawny JSON — zero tekstu przed i po, zero markdown, zero backticks.
Format:
{"ideas":["krótki opis pomysłu na nową funkcję"],"revised":""}

Zasady:
- "ideas": tablica stringów — każdy to opis funkcji opisanej w artykule, której Nawio jeszcze nie ma. Jeśli wszystko się zgadza — zwróć puste [].
- "revised": jeśli sekcja opisuje nieistniejące funkcje — przepisz ją jako HTML (tylko <p>, <ul>, <li>, <strong>, cudzysłowy jako \\"). Jeśli wszystko się zgadza — zwróć pusty string "".`,
    user: `Artykuł: "${meta.title}"

Co Nawio FAKTYCZNIE potrafi (źródło prawdy):
${capabilities}

Sekcja artykułu o Nawio do sprawdzenia:
${nawioSection}

Sprawdź: czy sekcja opisuje funkcje których NIE MA w Nawio?
Jeśli tak: wpisz je w "ideas" i przepisz "revised" używając TYLKO istniejących funkcji.
Jeśli nie: zwróć {"ideas":[],"revised":""}.`,
  })

  try {
    const jsonStart = rawText.indexOf("{")
    const jsonEnd   = rawText.lastIndexOf("}")
    if (jsonStart === -1 || jsonEnd === -1) throw new Error("brak JSON")
    const parsed = JSON.parse(rawText.slice(jsonStart, jsonEnd + 1))
    const ideas   = Array.isArray(parsed.ideas) ? parsed.ideas.filter(Boolean) : []
    const revised = typeof parsed.revised === "string" ? parsed.revised.trim() : ""
    console.log(`✅ Review: ${ideas.length} pomysł(ów) na backlog, rewizja sekcji: ${revised ? "TAK" : "nie potrzeba"}`)
    return { ideas, revised }
  } catch (err) {
    console.warn(`⚠️  Nie udało się sparsować JSON z review (${err.message}) — pomijam rewizję`)
    return { ideas: [], revised: "" }
  }
}

/**
 * Jeśli review zwrócił revised HTML — podmieniamy sekcję Nawio w pełnym content.
 * @param {string} content
 * @param {string} revised — poprawiony HTML sekcji Nawio (bez h2 nagłówka)
 * @returns {string}
 */
function applyRevisedNawioSection(content, revised) {
  // Podmień wszystko między nagłówkiem Nawio a disclaimerem / następnym h2
  const replaced = content.replace(
    /(<h[23][^>]*>[^<]*[Nn]awio[^<]*<\/h[23]>)([\s\S]*?)(?=<h[23]|<div class=['"]disclaimer)/i,
    `$1\n${revised}\n`
  )
  if (replaced === content) {
    console.warn("⚠️  Nie znaleziono sekcji Nawio do podmiany — content bez zmian")
  } else {
    console.log("✅ Sekcja Nawio podmieniona na poprawioną wersję")
  }
  return replaced
}

// ---------------------------------------------------------------------------
// WSTRZYKNIĘCIE DO SRC/LIB/BLOG.TS
// ---------------------------------------------------------------------------

/**
 * Buduje string TypeScript reprezentujący nowy obiekt BlogPost
 * i wstrzykuje go do tablicy POSTS w src/lib/blog.ts przed zamykającym `]`.
 * @param {object} meta
 * @param {string} content — czysty HTML
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

  const refRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/main`,
    { headers }
  )
  if (!refRes.ok) throw new Error(`GitHub ref error: ${await refRes.text()}`)
  const baseSha = (await refRes.json()).object.sha

  const branchRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/refs`,
    { method: "POST", headers, body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseSha }) }
  )
  if (!branchRes.ok) throw new Error(`GitHub create branch: ${await branchRes.text()}`)

  const commitRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/commits/${baseSha}`,
    { headers }
  )
  if (!commitRes.ok) throw new Error(`GitHub commit fetch: ${await commitRes.text()}`)
  const baseTreeSha = (await commitRes.json()).tree.sha

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

  const patchRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branchName}`,
    { method: "PATCH", headers, body: JSON.stringify({ sha: newCommitSha }) }
  )
  if (!patchRes.ok) throw new Error(`GitHub patch ref: ${await patchRes.text()}`)

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
          "**Opis SEO:**",
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
// GITHUB ISSUE — backlog pomysłów na nowe funkcje
// ---------------------------------------------------------------------------

/**
 * Tworzy Issue w GitHub z pomysłami na nowe funkcje wyciągniętymi przez review.
 * Issue trafia bezpośrednio na main — bez brancha, bo to tylko opis pomysłu.
 * @param {object} meta
 * @param {string[]} ideas
 * @returns {string} URL do Issue
 */
async function createGithubIssue(meta, ideas) {
  const [owner, repo] = CONFIG.githubRepo.split("/")
  const headers = {
    "Authorization":        `Bearer ${CONFIG.githubToken}`,
    "Accept":               "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type":         "application/json",
  }

  const body = [
    "## Pomysły na nowe funkcje Nawio",
    "",
    "Podczas generowania artykułu bloga AI opisało funkcje, których Nawio jeszcze nie ma.",
    "Poniższe pomysły mogą trafić do roadmapy.",
    "",
    `**Źródło:** artykuł _${meta.title}_ (\`/blog/${meta.slug}\`)`,
    "",
    "### Pomysły:",
    ...ideas.map((idea) => `- ${idea}`),
    "",
    "---",
    "_Wygenerowane automatycznie przez scripts/generate-blog-post.mjs_",
  ].join("\n")

  const issueRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: `[Blog Backlog] Pomysły z artykułu: ${meta.title}`,
        body,
        labels: ["backlog", "enhancement"],
      }),
    }
  )

  // Etykiety mogą nie istnieć w repo — jeśli błąd z labels, spróbuj bez nich
  if (!issueRes.ok) {
    const errText = await issueRes.text()
    console.warn(`⚠️  Issue z labels nie poszło (${errText.slice(0, 100)}), próbuję bez labels...`)
    const retryRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      { method: "POST", headers, body: JSON.stringify({ title: `[Blog Backlog] Pomysły z artykułu: ${meta.title}`, body }) }
    )
    if (!retryRes.ok) throw new Error(`GitHub create issue: ${await retryRes.text()}`)
    const retryData = await retryRes.json()
    console.log(`✅ Issue (backlog) utworzone: ${retryData.html_url}`)
    return retryData.html_url
  }

  const issueData = await issueRes.json()
  console.log(`✅ Issue (backlog) utworzone: ${issueData.html_url}`)
  return issueData.html_url
}

// ---------------------------------------------------------------------------
// EMAIL (Resend)
// ---------------------------------------------------------------------------

/**
 * Wysyła email z linkiem do PR i (opcjonalnie) Issue na helpdesk@bearstone.pl.
 * @param {object} meta
 * @param {string} prUrl
 * @param {string|null} issueUrl
 */
async function sendEmail(meta, prUrl, issueUrl) {
  console.log(`📧 Wysyłam email na ${CONFIG.emailTo}...`)

  const backlogSection = issueUrl
    ? `<div style="margin-top:16px;padding:12px;background:#fef3c7;border-radius:6px;border:1px solid #fcd34d">
        <p style="margin:0 0 8px;font-weight:600;color:#92400e">Nowe pomysły na backlog</p>
        <p style="margin:0;font-size:14px;color:#78350f">AI opisało w artykule funkcje, których Nawio jeszcze nie ma. Pomysły trafiły do Issues na GitHubie.</p>
        <a href="${issueUrl}" style="display:inline-block;margin-top:8px;color:#2563eb;font-size:14px">Zobacz Issue →</a>
      </div>`
    : ""

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
    ${backlogSection}
    <a href="${prUrl}"
       style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:16px">
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
    console.log("ℹ️  DRY RUN — PR, Issue i email zostaną pominięte\n")
  }

  try {
    validateEnv()

    const topics        = loadTopics()
    const existingSlugs = loadExistingSlugs()
    const capabilities  = loadCapabilities()

    // KROK 1: wybór tematu + metadane
    const meta = await chooseTopicAndGetMeta(topics, existingSlugs)

    // 60s przerwa między wywołaniami Claude (rate-limit safety)
    console.log("⏳ Czekam 60 s przed wywołaniem 2 (rate limit)...")
    await new Promise((r) => setTimeout(r, 60_000))

    // KROK 2: generowanie treści (z capabilities w prompcie)
    let content = await generateContent(meta, capabilities)

    // KROK 3: review sekcji Nawio — szuka "fantazji", wyciąga pomysły na backlog
    const { ideas, revised } = await reviewNawioSection(meta, content, capabilities)

    // Jeśli review poprawił sekcję — podmień w content
    if (revised) {
      content = applyRevisedNawioSection(content, revised)
    }

    // Wstrzyknięcie do blog.ts
    const { today } = injectPostIntoBlogTs(meta, content)

    if (CONFIG.dryRun) {
      if (ideas.length > 0) {
        console.log("\n💡 Pomysły na backlog (dry run — nie tworzę Issue):")
        ideas.forEach((idea, i) => console.log(`   ${i + 1}. ${idea}`))
      }
      console.log("\n✅ DRY RUN zakończony — blog.ts zaktualizowany lokalnie.\n")
      return
    }

    // KROK 4: PR
    const prUrl = await createGithubPR(meta, today)

    // KROK 5: Issue z backlogiem (tylko jeśli są pomysły)
    let issueUrl = null
    if (ideas.length > 0) {
      console.log(`💡 Znaleziono ${ideas.length} pomysł(ów) na nowe funkcje — tworzę Issue...`)
      issueUrl = await createGithubIssue(meta, ideas)
    }

    // KROK 6: email
    await sendEmail(meta, prUrl, issueUrl)

    console.log(`\n✅ Gotowe! Zmerguj PR żeby opublikować artykuł na nawio.pl 🚀\n`)
    if (issueUrl) {
      console.log(`💡 Backlog Issue: ${issueUrl}\n`)
    }
  } catch (err) {
    console.error("\n❌ BŁĄD:", err.message)

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
