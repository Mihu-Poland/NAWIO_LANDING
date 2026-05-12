#!/usr/bin/env node
/**
 * [LAN] scripts/generate-blog-post.mjs
 * --------------------------------------
 * Półautomatyczny generator artykułów bloga Nawio.
 *
 * FLOW:
 * 1. Wczytuje listę tematów z scripts/blog-topics.json
 * 2. Wczytuje istniejące slugi (żeby nie duplikować tematów)
 * 3. Wywołuje Claude API z web_search → wybiera temat + generuje artykuł
 * 4. Zapisuje nowy plik src/content/blog/[slug].ts
 * 5. Aktualizuje src/content/blog/index.ts (dodaje import i wpis w POSTS)
 * 6. Tworzy branch + PR przez GitHub API
 * 7. Wysyła email na helpdesk@bearstone.pl przez Resend z podglądem artykułu i linkiem do PR
 *
 * URUCHAMIANIE:
 *   node scripts/generate-blog-post.mjs
 *   lub przez GitHub Actions (cron + workflow_dispatch)
 *
 * WYMAGANE ZMIENNE ŚRODOWISKOWE:
 *   ANTHROPIC_API_KEY     — klucz Claude API
 *   GITHUB_TOKEN          — token GitHub z uprawnieniami repo + pull_requests
 *   GITHUB_REPO           — np. "bearstone-pl/nawio-landing"
 *   RESEND_API_KEY        — klucz Resend API
 *
 * NAPYCHANIE MISIA:
 * - Skrypt jest idempotentny — jeśli slug już istnieje, wybiera inny temat
 * - Używa znaczników [IMPORTS:START/END] i [POSTS:START/END] w index.ts
 *   żeby precyzyjnie wstrzyknąć nowy kod bez parsowania całego pliku
 * - Każdy krok jest zalogowany — łatwe debugowanie w GitHub Actions
 * - Błędy są łapane i raportowane emailem (nie crashują cicho)
 *
 * @author Jadźka (Cursor AI persona) + Mihu
 * @updated 2026-05-12
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

// ---------------------------------------------------------------------------
// KONFIGURACJA
// ---------------------------------------------------------------------------

const CONFIG = {
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  githubToken:     process.env.GITHUB_TOKEN,
  githubRepo:      process.env.GITHUB_REPO,       // "owner/repo"
  resendApiKey:    process.env.RESEND_API_KEY,
  emailTo:         "helpdesk@bearstone.pl",
  emailFrom:       "nawio-blog@nawio.pl",          // zweryfikowana domena w Resend
  contentDir:      path.join(ROOT, "src/content/blog"),
  indexFile:       path.join(ROOT, "src/content/blog/index.ts"),
  model:           "claude-sonnet-4-5",
}

// ---------------------------------------------------------------------------
// WALIDACJA ENV
// ---------------------------------------------------------------------------

function validateEnv() {
  const required = ["ANTHROPIC_API_KEY", "GITHUB_TOKEN", "GITHUB_REPO", "RESEND_API_KEY"]
  const missing = required.filter((key) => !process.env[key])
  if (missing.length > 0) {
    throw new Error(`Brakujące zmienne środowiskowe: ${missing.join(", ")}`)
  }
}

// ---------------------------------------------------------------------------
// HELPER: SLEEP
// ---------------------------------------------------------------------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// ---------------------------------------------------------------------------
// KROK 1: WCZYTAJ TEMATY I ISTNIEJĄCE SLUGI
// ---------------------------------------------------------------------------

function loadTopics() {
  const topicsPath = path.join(ROOT, "scripts/blog-topics.json")
  const topics = JSON.parse(fs.readFileSync(topicsPath, "utf-8"))
  console.log(`✅ Wczytano ${topics.length} tematów z blog-topics.json`)
  return topics
}

function loadExistingSlugs() {
  const files = fs.readdirSync(CONFIG.contentDir)
  const slugs = files
    .filter((f) => f.endsWith(".ts") && !f.startsWith("_") && f !== "index.ts")
    .map((f) => f.replace(".ts", ""))
  console.log(`✅ Istniejące slugi (${slugs.length}): ${slugs.join(", ")}`)
  return slugs
}

// ---------------------------------------------------------------------------
// KROK 2: CLAUDE API — WYBÓR TEMATU + GENEROWANIE ARTYKUŁU
// ---------------------------------------------------------------------------

async function generateArticle(topics, existingSlugs) {
  console.log("🤖 Wywołuję Claude API z web_search...")

  const availableTopics = topics.filter((t) => !existingSlugs.includes(t.slug))
  if (availableTopics.length === 0) {
    throw new Error("Brak dostępnych tematów! Dodaj nowe do blog-topics.json.")
  }

  const topicsJson = JSON.stringify(availableTopics, null, 2)

  const systemPrompt = `Jesteś ekspertem od prawa korporacyjnego dla małych spółek z o.o. w Polsce
i doświadczonym copywriterem SEO. Piszesz po polsku, naturalnie i bez prawniczego bełkotu.

Twoje artykuły:
- Mają minimum 600 słów
- Używają nagłówków H2 i H3
- Zawierają praktyczne przykłady
- Są napisane z perspektywy właściciela jednoosobowej sp. z o.o.
- Promują Nawio jako narzędzie (nie nachalnie — na końcu artykułu)
- Zawierają disclaimer na samym końcu

Disclaimer (wstaw dosłownie jako ostatni element):
<div class="disclaimer"><p>Treści publikowane przez Nawio mają charakter informacyjny i nie stanowią porady prawnej ani podatkowej. BearStone sp. z o.o. nie ponosi odpowiedzialności za skutki działań podjętych na ich podstawie.</p></div>

Odpowiadaj WYŁĄCZNIE w formacie JSON, bez markdown, bez backticks. Struktura:
{
  "slug": "string (kebab-case, tylko lowercase i myślniki)",
  "title": "string (max 60 znaków, keyword-rich)",
  "description": "string (150-160 znaków, dla meta description)",
  "category": "dokumenty|terminy|krs|zus|us|poradnik",
  "readingTime": number,
  "content": "string (pełny HTML artykułu, min 600 słów)"
}`

  const userPrompt = `Dostępne tematy do wyboru (wybierz JEDEN, który jest najaktualniejszy lub najbardziej popularny):
${topicsJson}

1. Użyj web_search żeby sprawdzić aktualne trendy i pytania związane z tymi tematami w Polsce (2026).
2. Wybierz temat, który jest najbardziej poszukiwany lub aktualny.
3. Napisz kompletny artykuł na wybrany temat.
4. Zwróć JSON zgodny z podaną strukturą.`

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": CONFIG.anthropicApiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-beta": "interleaved-thinking-2025-05-14",
    },
    body: JSON.stringify({
      model: CONFIG.model,
      max_tokens: 8000,
      system: systemPrompt,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
        },
      ],
      messages: [
        { role: "user", content: userPrompt },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Claude API error ${response.status}: ${err}`)
  }

  const data = await response.json()

  // Wyciągnij ostatni blok tekstowy (po web_search może być kilka bloków)
  const textBlocks = data.content.filter((b) => b.type === "text")
  if (textBlocks.length === 0) {
    throw new Error("Claude nie zwrócił żadnego tekstu")
  }

  const rawText = textBlocks[textBlocks.length - 1].text.trim()
  console.log("✅ Claude odpowiedział, parsuję JSON...")

  // Czyścimy ewentualne backticki jeśli model nie posłuchał
  const jsonStart = rawText.indexOf("{"); const jsonEnd = rawText.lastIndexOf("}"); if (jsonStart === -1 || jsonEnd === -1) { throw new Error("Brak JSON w odpowiedzi Claude") }; const cleanJson = rawText.slice(jsonStart, jsonEnd + 1)

  let article
  try {
    article = JSON.parse(cleanJson)
  } catch (e) {
    console.error("RAW RESPONSE:", rawText.substring(0, 500))
    throw new Error(`Błąd parsowania JSON z Claude: ${e.message}`)
  }

  // Walidacja minimalnych pól
  const required = ["slug", "title", "description", "category", "readingTime", "content"]
  for (const field of required) {
    if (!article[field]) throw new Error(`Brakuje pola: ${field}`)
  }

  console.log(`✅ Artykuł wygenerowany: "${article.title}" (slug: ${article.slug})`)
  return article
}

// ---------------------------------------------------------------------------
// KROK 3: ZAPISZ PLIK ARTYKUŁU
// ---------------------------------------------------------------------------

function saveArticleFile(article) {
  const today = new Date().toISOString().split("T")[0]
  const varName = article.slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())

  const fileContent = `/**
 * [LAN] src/content/blog/${article.slug}.ts
 * ${"-".repeat(article.slug.length + 30)}
 * Artykuł: ${article.title}
 * Wygenerowany automatycznie przez scripts/generate-blog-post.mjs
 *
 * @generated ${today}
 */

import type { BlogPost } from "@/lib/blog"

const post: BlogPost = {
  slug: ${JSON.stringify(article.slug)},
  title: ${JSON.stringify(article.title)},
  description: ${JSON.stringify(article.description)},
  publishedAt: ${JSON.stringify(today)},
  category: ${JSON.stringify(article.category)},
  readingTime: ${article.readingTime},
  content: \`${article.content.replace(/`/g, "\\`")}\`,
}

export default post
`

  const filePath = path.join(CONFIG.contentDir, `${article.slug}.ts`)
  fs.writeFileSync(filePath, fileContent, "utf-8")
  console.log(`✅ Zapisano plik: src/content/blog/${article.slug}.ts`)

  return { filePath, varName, today }
}

// ---------------------------------------------------------------------------
// KROK 4: ZAKTUALIZUJ index.ts
// ---------------------------------------------------------------------------

function updateIndex(article, varName) {
  let indexContent = fs.readFileSync(CONFIG.indexFile, "utf-8")

  // Wstaw import przed [IMPORTS:END]
  const importLine = `import ${varName} from "./${article.slug}"`
  indexContent = indexContent.replace(
    "// [IMPORTS:END]",
    `${importLine}\n// [IMPORTS:END]`
  )

  // Wstaw wpis w POSTS przed ostatnim elementem w tablicy (przed ']')
  // Szukamy [POSTS:START] ... ] i wstawiamy nowy wpis
  indexContent = indexContent.replace(
    /(\s+)(\/\/ \[POSTS:END\])/,
    `  ${varName},\n$1$2`
  )

  fs.writeFileSync(CONFIG.indexFile, indexContent, "utf-8")
  console.log(`✅ Zaktualizowano index.ts (import + POSTS)`)
}

// ---------------------------------------------------------------------------
// KROK 5: GITHUB — UTWÓRZ BRANCH + COMMIT + PR
// ---------------------------------------------------------------------------

async function createGithubPR(article, today) {
  const [owner, repo] = CONFIG.githubRepo.split("/")
  const branchName = `blog/auto-${article.slug}-${today}`
  const headers = {
    "Authorization": `Bearer ${CONFIG.githubToken}`,
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  }

  // 1. Pobierz SHA głównej gałęzi
  console.log("🔗 GitHub: pobieram SHA main...")
  const refRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/main`,
    { headers }
  )
  if (!refRes.ok) throw new Error(`GitHub ref error: ${await refRes.text()}`)
  const refData = await refRes.json()
  const baseSha = refData.object.sha

  // 2. Utwórz branch
  console.log(`🔗 GitHub: tworzę branch ${branchName}...`)
  const branchRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/refs`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseSha }),
    }
  )
  if (!branchRes.ok) throw new Error(`GitHub branch error: ${await branchRes.text()}`)

  // 3. Pobierz drzewko (tree) SHA i SHA commita
  const commitRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/commits/${baseSha}`,
    { headers }
  )
  const commitData = await commitRes.json()
  const baseTreeSha = commitData.tree.sha

  // 4. Przeczytaj pliki do commita
  const articlePath = `src/content/blog/${article.slug}.ts`
  const articleContent = fs.readFileSync(
    path.join(CONFIG.contentDir, `${article.slug}.ts`),
    "utf-8"
  )
  const indexContent = fs.readFileSync(CONFIG.indexFile, "utf-8")

  // 5. Utwórz nowe drzewko z plikami
  console.log("🔗 GitHub: tworzę tree...")
  const treeRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: [
          {
            path: articlePath,
            mode: "100644",
            type: "blob",
            content: articleContent,
          },
          {
            path: "src/content/blog/index.ts",
            mode: "100644",
            type: "blob",
            content: indexContent,
          },
        ],
      }),
    }
  )
  const treeData = await treeRes.json()

  // 6. Utwórz commit
  console.log("🔗 GitHub: tworzę commit...")
  const newCommitRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/commits`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        message: `blog: auto-generate "${article.title}"`,
        tree: treeData.sha,
        parents: [baseSha],
      }),
    }
  )
  const newCommit = await newCommitRes.json()

  // 7. Zaktualizuj branch na nowy commit
  await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branchName}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({ sha: newCommit.sha }),
    }
  )

  // 8. Utwórz PR
  console.log("🔗 GitHub: tworzę PR...")
  const prRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: `[Blog] ${article.title}`,
        body: `## Automatycznie wygenerowany artykuł\n\n**Tytuł:** ${article.title}\n**Slug:** \`${article.slug}\`\n**Kategoria:** ${article.category}\n**Czas czytania:** ${article.readingTime} min\n\n### Podgląd opisu\n${article.description}\n\n---\n*Wygenerowany przez scripts/generate-blog-post.mjs + Claude API*`,
        head: branchName,
        base: "main",
      }),
    }
  )
  const prData = await prRes.json()

  console.log(`✅ PR utworzony: ${prData.html_url}`)
  return prData.html_url
}

// ---------------------------------------------------------------------------
// KROK 6: WYŚLIJ EMAIL PRZEZ RESEND
// ---------------------------------------------------------------------------

async function sendEmail(article, prUrl) {
  console.log(`📧 Wysyłam email na ${CONFIG.emailTo}...`)

  // Wytnij pierwsze ~300 znaków treści jako preview (stripping HTML)
  const previewText = article.content
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 300)

  const htmlBody = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; }
    .header { background: #030712; color: white; padding: 24px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 20px; color: white; }
    .content { padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
    .meta { background: #f9fafb; border-radius: 6px; padding: 16px; margin: 16px 0; font-size: 14px; }
    .meta strong { display: inline-block; width: 100px; }
    .preview { background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 12px 16px; font-size: 14px; color: #374151; margin: 16px 0; }
    .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 8px 4px; }
    .btn-secondary { background: #374151; }
    .footer { font-size: 12px; color: #9ca3af; margin-top: 24px; }
    .disclaimer { font-size: 12px; color: #6b7280; background: #f9fafb; padding: 12px; border-radius: 6px; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>📝 Nowy artykuł do zatwierdzenia — Nawio Blog</h1>
  </div>
  <div class="content">
    <h2 style="margin-top:0">${article.title}</h2>

    <div class="meta">
      <div><strong>Slug:</strong> /blog/${article.slug}</div>
      <div><strong>Kategoria:</strong> ${article.category}</div>
      <div><strong>Czytanie:</strong> ${article.readingTime} min</div>
      <div><strong>Opis SEO:</strong> ${article.description}</div>
    </div>

    <p><strong>Podgląd treści:</strong></p>
    <div class="preview">${previewText}...</div>

    <p>Przejrzyj artykuł w PR i zatwierdź (merge) jeśli wszystko OK:</p>

    <a href="${prUrl}" class="btn">🔍 Otwórz PR na GitHub</a>
    <a href="https://nawio.pl/blog/${article.slug}" class="btn btn-secondary">🌐 Podgląd (po merge)</a>

    <div class="disclaimer">
      Ten email został wysłany automatycznie przez system generowania bloga Nawio.
      Jeśli artykuł wymaga poprawek — edytuj plik bezpośrednio w PR przed mergem.
    </div>
  </div>
  <div class="footer">Nawio Blog Generator · BearStone sp. z o.o.</div>
</body>
</html>
`

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${CONFIG.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONFIG.emailFrom,
      to: [CONFIG.emailTo],
      subject: `[Nawio Blog] Do zatwierdzenia: ${article.title}`,
      html: htmlBody,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    // Email failure nie powinien blokować — logujemy i idziemy dalej
    console.warn(`⚠️ Resend error (non-fatal): ${err}`)
    return
  }

  console.log(`✅ Email wysłany na ${CONFIG.emailTo}`)
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

async function main() {
  console.log("\n🚀 Nawio Blog Generator — start\n")

  try {
    validateEnv()

    const topics = loadTopics()
    const existingSlugs = loadExistingSlugs()

    const article = await generateArticle(topics, existingSlugs)
    const { varName, today } = saveArticleFile(article)

    updateIndex(article, varName)

    const prUrl = await createGithubPR(article, today)
    await sendEmail(article, prUrl)

    console.log("\n✅ Wszystko gotowe!")
    console.log(`   Artykuł: "${article.title}"`)
    console.log(`   PR: ${prUrl}`)
    console.log(`   Email: ${CONFIG.emailTo}`)
    console.log("\nMerguj PR żeby opublikować artykuł na nawio.pl 🚀\n")

  } catch (err) {
    console.error("\n❌ BŁĄD:", err.message)

    // Próba wysłania emaila z błędem
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${CONFIG.resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: CONFIG.emailFrom,
          to: [CONFIG.emailTo],
          subject: "[Nawio Blog] ❌ Błąd generowania artykułu",
          html: `<p>Generator artykułów napotkał błąd:</p><pre>${err.message}</pre><p>Sprawdź logi GitHub Actions.</p>`,
        }),
      })
    } catch (_) {
      // Ignore email errors w error handlerze
    }

    process.exit(1)
  }
}

main()
