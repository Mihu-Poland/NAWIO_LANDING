/**
 * [LAN] src/content/blog/uchwala-sp-z-o-o-wzor.ts
 * -------------------------------------------------
 * Artykuł: Uchwała sp. z o.o. — wzór i instrukcja krok po kroku
 * Wydzielony z blog.ts do osobnego pliku (refactor pod auto-generator).
 *
 * @author Jadźka (Cursor AI persona) + Mihu
 * @updated 2026-05-12
 */

import type { BlogPost } from "@/lib/blog"
import { DISCLAIMER } from "@/content/blog/_disclaimer"

const post: BlogPost = {
  slug: "uchwala-sp-z-o-o-wzor",
  title: "Uchwała sp. z o.o. — wzór i instrukcja krok po kroku",
  description:
    "Dowiedz się, czym jest uchwała sp. z o.o., kiedy jest wymagana, co musi zawierać i jak wygląda wzór uchwały o podziale zysku. Gotowy szablon do pobrania.",
  publishedAt: "2026-05-12",
  category: "dokumenty",
  readingTime: 5,
  content: `
<article>
  <h2>Czym jest uchwała sp. z o.o.?</h2>
  <p>
    Uchwała to formalna decyzja podjęta przez zgromadzenie wspólników lub — w określonych
    przypadkach — przez zarząd spółki z ograniczoną odpowiedzialnością. Brzmi poważnie?
    Bo jest poważna. Bez niej spora część życia spółki po prostu nie może się wydarzyć legalnie.
  </p>
  <p>
    W odróżnieniu od nieformalnych ustaleń przy kawie, uchwała musi mieć konkretną formę,
    numer, datę i podpisy. To właśnie ona stanowi dowód, że wspólnicy naprawdę coś postanowili
    — a nie tylko o tym porozmawiali.
  </p>

  <h2>Kiedy uchwała sp. z o.o. jest wymagana?</h2>
  <p>
    Kodeks spółek handlowych (KSH) wymaga podjęcia uchwały wspólników w szeregu kluczowych
    sytuacji. Oto te, które najczęściej dotyczą małych spółek:
  </p>
  <ul>
    <li><strong>Podział zysku lub pokrycie straty</strong> — coroczny obowiązek, termin do 30 czerwca</li>
    <li><strong>Zatwierdzenie sprawozdania finansowego</strong> — razem z podziałem zysku, ten sam termin</li>
    <li><strong>Udzielenie absolutorium członkom zarządu</strong> — czyli formalne „dziękujemy, dobra robota" (lub nie)</li>
    <li><strong>Zmiany w umowie spółki</strong> — np. zmiana siedziby, przedmiotu działalności, kapitału zakładowego</li>
    <li><strong>Powołanie i odwołanie członków zarządu</strong> — chyba że umowa spółki stanowi inaczej</li>
    <li><strong>Zbycie lub nabycie nieruchomości</strong> — o ile umowa spółki tego wymaga</li>
    <li><strong>Rozwiązanie spółki</strong> — no, tego nikomu nie życzę, ale uchwała i tu konieczna</li>
  </ul>

  <h2>Jakie elementy musi zawierać uchwała?</h2>
  <ol>
    <li><strong>Numer uchwały</strong> — dla porządku i archiwizacji, np. „Uchwała nr 1/2026"</li>
    <li><strong>Data i miejsce podjęcia</strong> — konkretna data zgromadzenia lub obiegu</li>
    <li><strong>Nazwa spółki i numer KRS</strong> — identyfikacja podmiotu</li>
    <li><strong>Podstawa prawna</strong> — np. art. 231 KSH</li>
    <li><strong>Przedmiot uchwały</strong> — treść decyzji</li>
    <li><strong>Wynik głosowania</strong> — liczba głosów za, przeciw, wstrzymujących się</li>
    <li><strong>Podpisy</strong> — przewodniczącego zgromadzenia i protokolanta</li>
  </ol>

  <h2>Wzór uchwały o podziale zysku</h2>
  <div class="code-block">
    <pre>
UCHWAŁA NR 1/2026
Zwyczajnego Zgromadzenia Wspólników
[NAZWA SPÓŁKI] sp. z o.o. z siedzibą w [MIASTO]
z dnia [DATA] roku

§ 1
Zwyczajne Zgromadzenie Wspólników spółki [NAZWA] sp. z o.o. (KRS: [NUMER]),
działając na podstawie art. 231 § 2 pkt 2 KSH, postanawia podzielić zysk
netto za rok obrotowy 2025 w kwocie [KWOTA] zł w następujący sposób:

a) kwota [X] zł zostaje wypłacona wspólnikom jako dywidenda;
b) kwota [Y] zł zostaje przekazana na kapitał zapasowy spółki.

§ 2
Termin wypłaty dywidendy ustala się na [DATA WYPŁATY].

§ 3
Uchwała wchodzi w życie z dniem podjęcia.

Wyniki głosowania: Za: [X] | Przeciw: 0 | Wstrzymało się: 0

Przewodniczący Zgromadzenia:    Protokolant:
..........................      ..........................
    </pre>
  </div>

  <h2>Jak Nawio automatyzuje tworzenie uchwał?</h2>
  <p>
    Nawio generuje gotowy dokument .docx z wypełnionym wzorem uchwały.
    Wchodzisz, wybierasz typ zdarzenia, wpisujesz dane spółki i kwoty — gotowe.
    Zero kopiowania z Googla, zero 300 zł za jedno pytanie do kancelarii.
  </p>

  ${DISCLAIMER}
</article>
  `,
}

export default post
