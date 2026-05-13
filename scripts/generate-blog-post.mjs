#!/usr/bin/env node
/**
 * [LAN] scripts/generate-blog-post.mjs
 * --------------------------------------
 * Półautomatyczny generator artykułów bloga Nawio.
 *
 * DLACZEGO DWA WYWOŁANIA:
 * Jedno wywołanie zwracające JSON z HTML w środku powoduje błędy parsowania
 * (cudzysłowy w atrybutach HTML łamią JSON). Dwa wywołania = zero problemów.
 *
 * Wywołanie 1: Claude wybiera temat i zwraca TYLKO metadane (prosty JSON bez HTML)
 * Wywołanie 2: Claude generuje treść artykułu jako czysty HTML (bez JSON)
 *
 * @author Jadźka (Cursor AI persona) + Mihu
 * @updated 2026-05-12
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
  emailTo:         "helpdesk@bearstone.pl",
  emailFrom:       "hej@nawio.pl",
  contentDir:      path.join(ROOT, "src/content/blog"),
  indexFile:       path.join(ROOT, "src/content/blog/index.ts"),
  model:           "claude-sonnet-4-5",
}

function validateEnv() {
  const required = ["ANTHROPIC_API_KEY", "GITHUB_TOKEN", "GITHUB_REPO", "RESEND_API_KEY"]
  const missing = required.filter((key) => !process.env[key])
  if (missing.length > 0) throw new Error(`Brakujące zmienne: ${missing.join(", ")}`)
}

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
  if (!response.ok) throw new Error(`Claude API error ${response.status}: ${await response.text()}`)
  const data = await response.json()
  const textBlocks = data.content.filter((b) => b.type === "text")
  if (textBlocks.length === 0) throw new Error("Claude nie zwrócił tekstu")
  return textBlocks[textBlocks.length - 1].text.trim()
}

function loadTopics() {
  const topics = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/blog-topics.json"), "utf-8"))
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
// WYWOŁANIE 1: wybór tematu + metadane — TYLKO JSON, zero HTML
// ---------------------------------------------------------------------------
async function chooseTopicAndGetMeta(topics, existingSlugs) {
  console.log("🤖 Wywołanie 1: wybór tematu i metadane...")

  const availableTopics = topics.filter((t) => !existingSlugs.includes(t.slug))
  if (availableTopics.length === 0) throw new Error("Brak dostępnych tematów! Dodaj nowe do blog-topics.json.")

  const rawText = await callClaude({
    useWebSearch: true,
    maxTokens: 1000,
    system: `Jesteś ekspertem SEO dla polskich spółek z o.o.
Zwróć TYLKO czysty JSON — bez tekstu przed, bez tekstu po, bez markdown, bez backticks.
Format:
{"slug":"kebab-case","title":"max 60 znaków","description":"150-160 znaków","category":"dokumenty|terminy|krs|zus|us|poradnik","readingTime":6}`,
    user: `Użyj web_search żeby sprawdzić które tematy są najpopularniejsze w Polsce w 2026 roku.
Wybierz JEDEN temat z listy i zwróć JSON.
Dostępne tematy:
${JSON.stringify(availableTopics.map(t => t.slug))}`,
  })

  const jsonStart = rawText.indexOf("{")
  const jsonEnd = rawText.lastIndexOf("}")
  if (jsonStart === -1 || jsonEnd === -1) throw new Error(`Brak JSON: ${rawText.substring(0, 300)}`)

  const meta = JSON.parse(rawText.slice(jsonStart, jsonEnd + 1))
  console.log(`✅ Wybrany temat: "${meta.title}" (${meta.slug})`)
  return meta
}

// ---------------------------------------------------------------------------
// WYWOŁANIE 2: treść artykułu — TYLKO HTML, zero JSON
// ---------------------------------------------------------------------------
async function generateContent(meta) {
  console.log("🤖 Wywołanie 2: generowanie treści artykułu...")

  const content = await callClaude({
    maxTokens: 8000,
    system: `Jesteś copywriterem piszącym po polsku dla właścicieli sp. z o.o.
Piszesz artykuły: naturalne, bez prawniczego bełkotu, minimum 600 słów.
Używasz H2 i H3, krótkich akapitów, list punktowanych.
Zwracasz TYLKO czysty HTML — żadnego tekstu przed ani po.
Zacznij od pierwszego <h2>. Nie używaj <article>, <html>, <body>.
Zawsze kończ dosłownie tym disclaimerem (z pojedynczymi cudzysłowami w atrybutach):
<div class='disclaimer'><p>Treści publikowane przez Nawio mają charakter informacyjny i nie stanowią porady prawnej ani podatkowej. BearStone sp. z o.o. nie ponosi odpowiedzialności za skutki działań podjętych na ich podstawie.</p></div>`,
    user: `Napisz artykuł blogowy:
Tytuł: ${meta.title}
Opis: ${meta.description}
Kategoria: ${meta.category}

Przed disclaimerem dodaj krótki akapit o tym jak Nawio (nawio.pl) pomaga właścicielom sp. z o.o. z dokumentacją korporacyjną.`,
  })

  console.log(`✅ Treść wygenerowana (${content.length} znaków)`)
  return content
}

// ---------------------------------------------------------------------------
// ZAPISZ PLIK ARTYKUŁU
// ---------------------------------------------------------------------------
function saveArticleFile(meta, content) {
  const today = new Date().toISOString().split("T")[0]
  const varName = meta.slug
    .split("-")
    .map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1))
    .join("")

  const fileContent = `/**
 * [LAN] src/content/blog/${meta.slug}.ts
 * Artykuł: ${meta.title}
 * Wygenerowany automatycznie przez scripts/generate-blog-post.mjs
 * @generated ${today}
 */

import type { BlogPost } from "@/lib/blog"

const post: BlogPost = {
  slug: ${JSON.stringify(meta.slug)},
  title: ${JSON.stringify(meta.title)},
  description: ${JSON.stringify(meta.description)},
  publishedAt: ${JSON.stringify(today)},
  category: ${JSON.stringify(meta.category)},
  readingTime: ${meta.readingTime},
  content: \`
<article>
${content}
</article>
  \`,
}

export default post
`

  const filePath = path.join(CONFIG.contentDir, `${meta.slug}.ts`)
  fs.writeFileSync(filePath, fileContent, "utf-8")
  console.log(`✅ Zapisano: src/content/blog/${meta.slug}.ts`)
  return { filePath, varName, today }
}

// ---------------------------------------------------------------------------
// ZAKTUALIZUJ index.ts
// ---------------------------------------------------------------------------
function updateIndex(meta, varName) {
  let indexContent = fs.readFileSync(CONFIG.indexFile, "utf-8")
  indexContent = indexContent.replace(
    "// [IMPORTS:END]",
    `import ${varName} from "./${meta.slug}"\n// [IMPORTS:END]`
  )
  indexContent = indexContent.replace(
    /(\s*)(\/\/ \[POSTS:END\])/,
    `  ${varName},\n$1$2`
  )
  fs.writeFileSync(CONFIG.indexFile, indexContent, "utf-8")
  console.log(`✅ Zaktualizowano index.ts`)
}

// ---------------------------------------------------------------------------
// GITHUB PR
// ---------------------------------------------------------------------------
async function createGithubPR(meta, today) {
  const [owner, repo] = CONFIG.githubRepo.split("/")
  const branchName = `blog/auto-${meta.slug}-${today}`
  const headers = {
    "Authorization": `Bearer ${CONFIG.githubToken}`,
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  }

  const refRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/heads/main`, { headers })
  if (!refRes.ok) throw new Error(`GitHub ref: ${await refRes.text()}`)
  const baseSha = (await refRes.json()).object.sha

  await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs`, {
    method: "POST", headers,
    body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseSha }),
  })

  const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits/${baseSha}`, { headers })
  const baseTreeSha = (await commitRes.json()).tree.sha

  const articleContent = fs.readFileSync(path.join(CONFIG.contentDir, `${meta.slug}.ts`), "utf-8")
  const indexContent = fs.readFileSync(CONFIG.indexFile, "utf-8")

  const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
    method: "POST", headers,
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: [
        { path: `src/content/blog/${meta.slug}.ts`, mode: "100644", type: "blob", content: articleContent },
        { path: "src/content/blog/index.ts", mode: "100644", type: "blob", content: indexContent },
      ],
    }),
  })
  const treeSha = (await treeRes.json()).sha

  const newCommitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
    method: "POST", headers,
    body: JSON.stringify({ message: `blog: auto-generate "${meta.title}"`, tree: treeSha, parents: [baseSha] }),
  })
  const newCommitSha = (await newCommitRes.json()).sha

  await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branchName}`, {
    method: "PATCH", headers,
    body: JSON.stringify({ sha: newCommitSha }),
  })

  const prRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
    method: "POST", headers,
    body: JSON.stringify({
      title: `[Blog] ${meta.title}`,
      body: `## Auto-wygenerowany artykuł\n\n**Tytuł:** ${meta.title}\n**Slug:** \`/blog/${meta.slug}\`\n**Kategoria:** ${meta.category}\n**Czytanie:** ${meta.readingTime} min\n\n**Opis SEO:**\n${meta.description}\n\n---\n*Wygenerowany przez Claude API + web_search*`,
      head: branchName,
      base: "main",
    }),
  })
  const prData = await prRes.json()
  if (!prData.html_url) throw new Error(`Błąd PR: ${JSON.stringify(prData)}`)
  console.log(`✅ PR: ${prData.html_url}`)
  return prData.html_url
}

// ---------------------------------------------------------------------------
// EMAIL
// ---------------------------------------------------------------------------
async function sendEmail(meta, prUrl) {
  console.log(`📧 Wysyłam email na ${CONFIG.emailTo}...`)
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${CONFIG.resendApiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONFIG.emailFrom,
      to: [CONFIG.emailTo],
      subject: `[Nawio Blog] Do zatwierdzenia: ${meta.title}`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <div style="background:#030712;color:white;padding:24px;border-radius:8px 8px 0 0">
    <h1 style="margin:0;font-size:20px">📝 Nowy artykuł do zatwierdzenia</h1>
  </div>
  <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
    <h2 style="margin-top:0">${meta.title}</h2>
    <p><strong>Slug:</strong> /blog/${meta.slug}</p>
    <p><strong>Kategoria:</strong> ${meta.category}</p>
    <p><strong>Czas czytania:</strong> ${meta.readingTime} min</p>
    <p><strong>Opis SEO:</strong> ${meta.description}</p>
    <a href="${prUrl}" style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:16px">🔍 Otwórz PR na GitHub</a>
    <p style="color:#6b7280;font-size:12px;margin-top:24px">Zmerguj PR → Vercel automatycznie opublikuje artykuł na nawio.pl</p>
  </div>
</div>`,
    }),
  })
  if (!res.ok) { console.warn(`⚠️ Email error: ${await res.text()}`); return }
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
    const meta = await chooseTopicAndGetMeta(topics, existingSlugs)
    console.log("⏳ Czekam 60s przed wywołaniem 2 (rate limit)..."); await new Promise(r => setTimeout(r, 60000)); const content = await generateContent(meta)
    const { varName, today } = saveArticleFile(meta, content)
    updateIndex(meta, varName)
    const prUrl = await createGithubPR(meta, today)
    await sendEmail(meta, prUrl)
    console.log(`\n✅ Gotowe! Zmerguj PR żeby opublikować na nawio.pl 🚀\n`)
  } catch (err) {
    console.error("\n❌ BŁĄD:", err.message)
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "hej@nawio.pl", to: ["helpdesk@bearstone.pl"],
          subject: "[Nawio Blog] ❌ Błąd generowania",
          html: `<p>Błąd:</p><pre>${err.message}</pre>`,
        }),
      })
    } catch (_) {}
    process.exit(1)
  }
}

main()
