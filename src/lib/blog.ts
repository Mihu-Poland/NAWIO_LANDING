/**
 * blog.ts
 * -------
 * Źródło prawdy dla wszystkich artykułów bloga Nawio.
 * Obecnie: dane statyczne (zero zależności, zero CMS).
 * Przyszłość (v2): zastąpić getBlogPosts() fetchem do Contentful / Sanity / MDX plików.
 *
 * NAPYCHANIE MISIA:
 * - BlogPost interface jest kompletny — nie brakuje pól dla SEO ani JSON-LD
 * - Treść artykułów jako HTML string (nie MDX) — kompatybilna z dangerouslySetInnerHTML
 *   i serwerowym renderowaniem bez dodatkowych paczek
 * - Każdy artykuł ma disclaimer na dole (wymóg prawny Nawio)
 * - readingTime liczymy z grubsza: ~200 słów/minutę
 *
 * @author Jadźka (Cursor AI persona) + Mihu
 * @updated 2026-05-12
 */

// ---------------------------------------------------------------------------
// TYPY
// ---------------------------------------------------------------------------

export type BlogCategory =
  | "dokumenty"
  | "terminy"
  | "krs"
  | "zus"
  | "us"
  | "poradnik"

export interface BlogPost {
  slug: string
  title: string          // keyword-rich, max 60 znaków — dla <title> i H1
  description: string    // meta description, 150–160 znaków — dla <meta name="description">
  content: string        // HTML string — renderowany przez dangerouslySetInnerHTML
  publishedAt: string    // ISO 8601 date string, np. "2026-05-12"
  updatedAt?: string     // opcjonalne — gdy artykuł był aktualizowany
  category: BlogCategory
  readingTime: number    // szacowane minuty czytania
}

// ---------------------------------------------------------------------------
// STAŁY DISCLAIMER (wymóg prawny — pojawia się na dole każdego artykułu)
// ---------------------------------------------------------------------------

const DISCLAIMER = `
<div class="disclaimer">
  <p>
    Treści publikowane przez Nawio mają charakter informacyjny i nie stanowią
    porady prawnej ani podatkowej. BearStone sp. z o.o. nie ponosi
    odpowiedzialności za skutki działań podjętych na ich podstawie.
  </p>
</div>
`

// ---------------------------------------------------------------------------
// DANE ARTYKUŁÓW
// ---------------------------------------------------------------------------

const POSTS: BlogPost[] = [
  // =========================================================================
  // ARTYKUŁ 1: Uchwała sp. z o.o. — wzór i instrukcja
  // =========================================================================
  {
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
  <p>
    Krótko: jeśli masz wątpliwość, czy dana decyzja wymaga uchwały — prawdopodobnie wymaga.
    Lepiej ją podjąć, niż później tłumaczyć się przed sądem lub KRS-em.
  </p>

  <h2>Jakie elementy musi zawierać uchwała?</h2>
  <p>
    Żeby uchwała była ważna i skuteczna, powinna zawierać co najmniej:
  </p>
  <ol>
    <li><strong>Numer uchwały</strong> — dla porządku i archiwizacji, np. „Uchwała nr 1/2026"</li>
    <li><strong>Data i miejsce podjęcia</strong> — konkretna data zgromadzenia lub obiegu</li>
    <li><strong>Nazwa spółki i numer KRS</strong> — identyfikacja podmiotu</li>
    <li><strong>Podstawa prawna</strong> — np. art. 231 KSH (dla zwyczajnego zgromadzenia)</li>
    <li><strong>Przedmiot uchwały</strong> — treść decyzji, np. „Zgromadzenie Wspólników postanawia…"</li>
    <li><strong>Wynik głosowania</strong> — liczba głosów za, przeciw, wstrzymujących się</li>
    <li><strong>Podpisy</strong> — przewodniczącego zgromadzenia i protokolanta</li>
  </ol>
  <p>
    Dla wybranych uchwał KSH lub umowa spółki może wymagać formy notarialnej
    (np. zmiana umowy spółki). Zawsze sprawdź, zanim podpiszesz i wyślesz do KRS.
  </p>

  <h2>Wzór uchwały o podziale zysku</h2>
  <p>
    Poniżej przykład uchwały o podziale zysku — jednej z najczęściej potrzebnych
    w życiu każdej sp. z o.o.:
  </p>

  <div class="code-block">
    <pre>
UCHWAŁA NR 1/2026
Zwyczajnego Zgromadzenia Wspólników
[NAZWA SPÓŁKI] sp. z o.o. z siedzibą w [MIASTO]
z dnia [DATA] roku

§ 1
Zwyczajne Zgromadzenie Wspólników spółki [NAZWA] sp. z o.o. (KRS: [NUMER]),
działając na podstawie art. 231 § 2 pkt 2 Kodeksu spółek handlowych,
postanawia podzielić zysk netto za rok obrotowy 2025 w kwocie
[KWOTA] zł (słownie: [KWOTA SŁOWNIE] złotych) w następujący sposób:

a) kwota [X] zł zostaje wypłacona wspólnikom jako dywidenda,
   proporcjonalnie do posiadanych udziałów;
b) kwota [Y] zł zostaje przekazana na kapitał zapasowy spółki.

§ 2
Termin wypłaty dywidendy ustala się na [DATA WYPŁATY].

§ 3
Uchwała wchodzi w życie z dniem podjęcia.

Wyniki głosowania:
Za: [X] głosów
Przeciw: 0 głosów
Wstrzymało się: 0 głosów

Uchwała została podjęta jednogłośnie / większością głosów.

Przewodniczący Zgromadzenia:         Protokolant:
..........................           ..........................
[IMIĘ I NAZWISKO]                    [IMIĘ I NAZWISKO]
    </pre>
  </div>

  <p>
    <strong>Uwaga:</strong> przed użyciem wzoru wypełnij wszystkie pola w nawiasach kwadratowych.
    Kwota dywidendy podlega opodatkowaniu PIT (19%), który spółka pobiera i odprowadza jako płatnik.
  </p>

  <h2>Uchwała pisemna — obieg bez zgromadzenia</h2>
  <p>
    Dobra wiadomość dla jednoosobowych sp. z o.o. i małych spółek: jeśli umowa spółki
    na to pozwala, uchwały można podejmować w trybie pisemnym (obiegowym). Oznacza to,
    że nie musisz zwoływać formalnego zgromadzenia — wystarczy zebrać podpisy wszystkich
    wspólników pod dokumentem uchwały.
  </p>
  <p>
    Wyjątek: zwyczajne zgromadzenie wspólników (zatwierdzenie sprawozdania, podział zysku,
    absolutorium) <strong>zawsze musi się odbyć jako formalne zgromadzenie</strong> — pisemny
    obieg tu nie wystarczy.
  </p>

  <h2>Jak Nawio automatyzuje tworzenie uchwał?</h2>
  <p>
    Nawio to narzędzie stworzone właśnie po to, żeby nie musieć za każdym razem
    pytać prawnika o to samo. Wchodzisz, wybierasz typ zdarzenia korporacyjnego
    (np. „podział zysku"), wpisujesz dane swojej spółki i kwoty — a Nawio generuje
    gotowy dokument .docx z wypełnionym wzorem uchwały.
  </p>
  <p>
    Zero kopiowania z Googla. Zero zapominania, które paragrafy KSH tu pasują.
    Zero 300 zł za jedno pytanie do kancelarii.
  </p>
  <p>
    Oczywiście — Nawio to nawigator, nie prawnik. Dla uchwał wymagających formy
    notarialnej lub skomplikowanych sytuacji nadal odwiedź specjalistę. Ale dla
    rutynowego podziału zysku czy uchwały o powołaniu prokurenta?
    Nawio wystarczy w zupełności.
  </p>

  ${DISCLAIMER}
</article>
    `,
  },

  // =========================================================================
  // ARTYKUŁ 2: Zgromadzenie wspólników — kiedy i jak zwołać
  // =========================================================================
  {
    slug: "zgromadzenie-wspolnikow-sp-z-o-o-kiedy-jak",
    title: "Zgromadzenie wspólników sp. z o.o. — kiedy i jak zwołać",
    description:
      "Obowiązek zgromadzenia wspólników do 30 czerwca, kto je zwołuje, jak powiadomić wspólników i co musi znaleźć się w protokole. Praktyczny przewodnik.",
    publishedAt: "2026-05-12",
    category: "dokumenty",
    readingTime: 6,
    content: `
<article>
  <h2>Co to jest Zwyczajne Zgromadzenie Wspólników?</h2>
  <p>
    Zwyczajne Zgromadzenie Wspólników (ZZW) to coroczne „wielkie sprzątanie" w dokumentacji
    spółki z o.o. Niezależnie od tego, czy Twoja spółka zarobiła miliony czy ledwo wyszła
    na zero — ZZW jest obowiązkowe. Kodeks spółek handlowych nie pyta o nastrój ani o to,
    czy masz czas.
  </p>
  <p>
    Podczas ZZW wspólnicy podejmują trzy kluczowe uchwały:
  </p>
  <ul>
    <li>Zatwierdzenie sprawozdania finansowego za poprzedni rok</li>
    <li>Podział zysku lub pokrycie straty</li>
    <li>Udzielenie absolutorium członkom zarządu (czyli: czy zarząd dobrze się spisał?)</li>
  </ul>

  <h2>Termin: do kiedy odbyć ZZW?</h2>
  <p>
    Masz czas do <strong>30 czerwca</strong> każdego roku — to termin wynikający bezpośrednio
    z art. 231 § 1 KSH. ZZW powinno się odbyć w ciągu 6 miesięcy od zakończenia roku
    obrotowego. Dla spółek z rokiem obrotowym = rokiem kalendarzowym (czyli dla zdecydowanej
    większości sp. z o.o.) termin zawsze upływa 30 czerwca.
  </p>
  <p>
    <strong>Co grozi za przekroczenie terminu?</strong> Sąd rejestrowy może z urzędu wszcząć
    postępowanie przymuszające, a zarząd naraża się na odpowiedzialność za szkodę wyrządzoną
    spółce lub wspólnikom. Nie ma co testować cierpliwości KRS-u.
  </p>

  <h2>Kto zwołuje Zgromadzenie Wspólników?</h2>
  <p>
    Co do zasady — <strong>zarząd spółki</strong>. Jeżeli zarząd tego nie robi (bo np. zapomniał
    albo świadomie ociąga), prawo przewiduje alternatywy:
  </p>
  <ul>
    <li>
      <strong>Rada nadzorcza lub komisja rewizyjna</strong> — jeżeli spółka je posiada i zarząd
      nie zwoła ZZW w terminie
    </li>
    <li>
      <strong>Wspólnicy reprezentujący co najmniej 1/10 kapitału zakładowego</strong> — mogą
      żądać zwołania ZZW (art. 236 KSH), a jeśli zarząd nie odpowie w ciągu 2 tygodni,
      sąd rejestrowy może upoważnić ich do samodzielnego zwołania
    </li>
  </ul>
  <p>
    W praktyce w jednoosobowych sp. z o.o. jedyny wspólnik jest jednocześnie jedynym
    członkiem zarządu — więc cały cyrk odbywa się z samym sobą. Brzmi absurdalnie,
    ale papier musi być.
  </p>

  <h2>Jak powiadomić wspólników o ZZW?</h2>
  <p>
    Zaproszenie (zwane formalnie <em>zawiadomieniem</em>) musi dotrzeć do każdego wspólnika
    co najmniej <strong>2 tygodnie przed datą zgromadzenia</strong>. Forma — co do zasady —
    list polecony lub kurier. Umowa spółki może dopuścić inne sposoby, np. email z potwierdzeniem
    odbioru.
  </p>
  <p>
    Zawiadomienie musi zawierać:
  </p>
  <ol>
    <li>Datę, godzinę i miejsce zgromadzenia</li>
    <li>Szczegółowy porządek obrad</li>
    <li>Ewentualne projekty uchwał (dobra praktyka, choć nie zawsze wymagana)</li>
  </ol>
  <p>
    <strong>Uwaga:</strong> jeśli wszyscy wspólnicy są obecni i nikt nie wnosi sprzeciwu
    co do odbycia zgromadzenia, można je przeprowadzić bez formalnego zawiadomienia.
    To częsty przypadek w małych, kilkuosobowych spółkach.
  </p>

  <h2>Porządek obrad — co musi się na nim znaleźć?</h2>
  <p>
    Dla Zwyczajnego Zgromadzenia Wspólników porządek obrad jest z góry określony przez KSH
    i powinien obejmować co najmniej:
  </p>
  <ol>
    <li>Otwarcie zgromadzenia</li>
    <li>Wybór przewodniczącego</li>
    <li>Stwierdzenie prawidłowości zwołania ZZW i zdolności do podejmowania uchwał</li>
    <li>Rozpatrzenie i zatwierdzenie sprawozdania zarządu z działalności spółki</li>
    <li>Rozpatrzenie i zatwierdzenie sprawozdania finansowego za ubiegły rok obrotowy</li>
    <li>Uchwała o podziale zysku lub pokryciu straty</li>
    <li>Uchwały o udzieleniu absolutorium członkom zarządu</li>
    <li>Wolne wnioski</li>
    <li>Zamknięcie zgromadzenia</li>
  </ol>

  <h2>Protokół ze zgromadzenia wspólników</h2>
  <p>
    Każde zgromadzenie musi być protokołowane. Protokół to dokument potwierdzający,
    że zgromadzenie w ogóle się odbyło i jakie decyzje zapadły. Bez protokołu
    uchwały są jak duch: wszyscy wiedzą, że coś się wydarzyło, ale nikt tego nie widzi.
  </p>
  <p>
    Protokół musi zawierać:
  </p>
  <ul>
    <li>Datę i miejsce zgromadzenia</li>
    <li>Listę obecnych wspólników (z liczbą posiadanych głosów)</li>
    <li>Porządek obrad</li>
    <li>Treść podjętych uchwał</li>
    <li>Wyniki głosowania nad każdą uchwałą</li>
    <li>Ewentualne sprzeciwy i zastrzeżenia zgłoszone przez wspólników</li>
    <li>Podpis przewodniczącego i protokolanta</li>
  </ul>
  <p>
    Protokół, do którego dołączone są podjęte uchwały, przechowuje się w księdze
    protokołów spółki. To nie jest dokument wysyłany do KRS (chyba że uchwała tego wymaga,
    np. zmiana umowy spółki).
  </p>

  <h2>Jak Nawio pomaga przy ZZW?</h2>
  <p>
    Nawio przeprowadzi Cię przez całe zdarzenie korporacyjne „ZZW" krok po kroku.
    Podajesz dane spółki, rok obrotowy, kwoty zysku — a system generuje komplet dokumentów:
    zawiadomienie o zgromadzeniu, porządek obrad, projekty uchwał i protokół.
    Wszystko w formacie .docx, gotowe do wydruku i podpisu.
  </p>
  <p>
    Nawio nie zastąpi prawnika przy skomplikowanych sprawach, ale przy rutynowym ZZW
    jednoosobowej spółki — po co przepłacać?
  </p>

  ${DISCLAIMER}
</article>
    `,
  },

  // =========================================================================
  // ARTYKUŁ 3: Terminy KRS 2026
  // =========================================================================
  {
    slug: "terminy-krs-2026",
    title: "Terminy KRS 2026 — co i kiedy zgłosić w spółce z o.o.",
    description:
      "Najważniejsze terminy KRS dla sp. z o.o. w 2026 roku: sprawozdanie finansowe, zmiany w KRS, e-Doręczenia i kary za nieterminowe zgłoszenie. Sprawdź, czego nie przegapić.",
    publishedAt: "2026-05-12",
    category: "krs",
    readingTime: 7,
    content: `
<article>
  <h2>KRS 2026 — terminy, których nie możesz przegapić</h2>
  <p>
    Krajowy Rejestr Sądowy nie śpi i — co ważniejsze — nie odpuszcza. Każda spółka z o.o.
    ma szereg obowiązków rejestrowych, a ich niedopełnienie grozi karami, wpisami
    z urzędu i ogólnym bólem głowy. Poniżej zebrałem najważniejsze terminy na 2026 rok,
    żebyś mógł spokojnie zaplanować rok korporacyjny swojej spółki.
  </p>

  <h2>30 czerwca 2026 — Zwyczajne Zgromadzenie Wspólników</h2>
  <p>
    Absolutny numer jeden. Do <strong>30 czerwca</strong> musisz odbyć Zwyczajne Zgromadzenie
    Wspólników i podjąć uchwały o:
  </p>
  <ul>
    <li>zatwierdzeniu sprawozdania finansowego za 2025 rok,</li>
    <li>podziale zysku lub pokryciu straty,</li>
    <li>udzieleniu absolutorium członkom zarządu.</li>
  </ul>
  <p>
    To nie jest opcjonalne. Art. 231 § 1 KSH jest w tej kwestii bezlitosny.
  </p>

  <h2>15 lipca 2026 — złożenie sprawozdania finansowego do KRS</h2>
  <p>
    Po zatwierdzeniu sprawozdania finansowego masz <strong>15 dni</strong> na złożenie go
    do Repozytorium Dokumentów Finansowych (RDF) — części systemu KRS. W praktyce: jeśli
    ZZW odbyło się 30 czerwca, termin na złożenie mija 15 lipca.
  </p>
  <p>
    Co składasz do RDF:
  </p>
  <ul>
    <li>Sprawozdanie finansowe (bilans, rachunek zysków i strat, informacja dodatkowa)</li>
    <li>Sprawozdanie zarządu z działalności spółki</li>
    <li>Uchwałę o zatwierdzeniu sprawozdania finansowego</li>
    <li>Uchwałę o podziale zysku lub pokryciu straty</li>
    <li>Ewentualnie: opinia biegłego rewidenta (jeśli spółka podlegała badaniu)</li>
  </ul>
  <p>
    Złożenie odbywa się elektronicznie przez Portal Rejestrów Sądowych (PRS)
    lub przez system S24. Dokumenty muszą być podpisane kwalifikowanym podpisem
    elektronicznym lub profilem zaufanym.
  </p>

  <h2>Zmiany w spółce — 7 dni od zdarzenia</h2>
  <p>
    Jeśli w spółce zachodzi jakakolwiek zmiana podlegająca wpisowi do KRS,
    masz <strong>7 dni</strong> od zdarzenia na złożenie wniosku o aktualizację.
    Dotyczy to m.in.:
  </p>
  <ul>
    <li>Zmiany składu zarządu (powołanie, odwołanie, rezygnacja)</li>
    <li>Zmiany adresu siedziby spółki</li>
    <li>Zmiany przedmiotu działalności (PKD)</li>
    <li>Zmiany wysokości kapitału zakładowego</li>
    <li>Zmiany umowy spółki</li>
    <li>Ustanowienia lub odwołania prokury</li>
    <li>Zmiany wspólników (nabycie lub zbycie udziałów)</li>
  </ul>
  <p>
    <strong>7 dni to bardzo mało.</strong> W praktyce wiele spółek nie zdaje sobie sprawy,
    że termin biegnie od daty zdarzenia (np. podjęcia uchwały), a nie od daty, kiedy
    ktoś wreszcie przypomniał sobie o KRS.
  </p>

  <h2>e-Doręczenia — obowiązek od 2026 roku</h2>
  <p>
    Od 2026 roku spółki z o.o. zarejestrowane w KRS są zobowiązane posiadać
    <strong>adres do e-Doręczeń</strong>. Jest to elektroniczny odpowiednik poleconego
    listu z potwierdzeniem odbioru — korespondencja z urzędami i sądami trafia na
    ten adres zamiast na papierowe listy.
  </p>
  <p>
    Jeśli Twoja spółka jeszcze nie założyła skrzynki do e-Doręczeń — zrób to jak najszybciej.
    Brak adresu nie zwalnia z odbioru korespondencji urzędowej; sąd może uznać pismo
    za doręczone skutecznie, nawet jeśli fizycznie go nie odebrałeś.
  </p>
  <p>
    Adres do e-Doręczeń zakładasz przez portal gov.pl — bezpłatnie, z profilem zaufanym
    lub kwalifikowanym podpisem elektronicznym.
  </p>

  <h2>Kary za nieterminowe zgłoszenia do KRS</h2>
  <p>
    KRS może stosować postępowanie przymuszające, czyli wyznaczyć termin do uzupełnienia
    zaległości, a po jego bezskutecznym upływie — nakładać grzywny. Jednorazowa grzywna
    może wynieść do 10 000 zł, a można ją powtarzać wielokrotnie.
  </p>
  <p>
    Ale to nie wszystko. Nieterminowe złożenie sprawozdania finansowego może skutkować:
  </p>
  <ul>
    <li>Wpisem z urzędu do KRS informacji o zaległości</li>
    <li>Wszczęciem postępowania o rozwiązanie spółki bez przeprowadzania likwidacji
        (art. 25a ustawy o KRS) — tak, to jest realne</li>
    <li>Odpowiedzialnością karną skarbową za niewykonanie obowiązku złożenia
        sprawozdania (art. 80 KKS)</li>
  </ul>
  <p>
    Mówiąc wprost: KRS ma zęby. I nie waha się ich używać.
  </p>

  <h2>Kalendarz terminów KRS 2026 — ściągawka</h2>
  <div class="calendar-table">
    <table>
      <thead>
        <tr>
          <th>Termin</th>
          <th>Obowiązek</th>
          <th>Podstawa prawna</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>do 30 czerwca 2026</td>
          <td>Odbycie ZZW (zatwierdzenie SF, podział zysku, absolutorium)</td>
          <td>art. 231 § 1 KSH</td>
        </tr>
        <tr>
          <td>do 15 lipca 2026</td>
          <td>Złożenie SF i dokumentów do Repozytorium KRS</td>
          <td>art. 69 ustawy o rachunkowości</td>
        </tr>
        <tr>
          <td>7 dni od zdarzenia</td>
          <td>Zgłoszenie zmian w spółce do KRS</td>
          <td>art. 22 ustawy o KRS</td>
        </tr>
        <tr>
          <td>Na bieżąco</td>
          <td>Utrzymanie aktywnej skrzynki e-Doręczeń</td>
          <td>ustawa o e-Doręczeniach</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Jak Nawio pomaga pilnować terminów?</h2>
  <p>
    Nawio to korporacyjny nawigator dla właścicieli sp. z o.o. — nie prawnik,
    ale inteligentne narzędzie, które pomaga nie zgubić się w gąszczu terminów
    i wymaganych dokumentów. Wchodzisz do panelu, wybierasz zdarzenie korporacyjne
    (np. „złożenie sprawozdania do KRS"), a Nawio:
  </p>
  <ul>
    <li>Wyjaśnia, co dokładnie musisz zrobić i do kiedy</li>
    <li>Generuje potrzebne dokumenty (uchwały, protokoły) w .docx</li>
    <li>Podpowiada, jakie załączniki złożyć do KRS</li>
  </ul>
  <p>
    Nie musisz pamiętać, który artykuł KSH mówi o czym. Nawio pamięta za Ciebie.
  </p>

  ${DISCLAIMER}
</article>
    `,
  },
]

// ---------------------------------------------------------------------------
// FUNKCJE DOSTĘPU — publiczne API modułu
// ---------------------------------------------------------------------------

/**
 * Zwraca wszystkie artykuły posortowane od najnowszych.
 * TODO (v2): zastąpić fetchem z CMS / MDX glob
 */
export function getBlogPosts(): BlogPost[] {
  return [...POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

/**
 * Zwraca pojedynczy artykuł po slug lub undefined jeśli nie istnieje.
 * Używany przez generateMetadata() i page.tsx artykułu.
 */
export function getBlogPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}

/**
 * Zwraca wszystkie slugi — potrzebne dla generateStaticParams() w [slug]/page.tsx.
 */
export function getBlogSlugs(): string[] {
  return POSTS.map((p) => p.slug)
}

/**
 * Mapuje kategorię na polską etykietę UI.
 */
export function getCategoryLabel(category: BlogCategory): string {
  const labels: Record<BlogCategory, string> = {
    dokumenty: "Dokumenty",
    terminy: "Terminy",
    krs: "KRS",
    zus: "ZUS",
    us: "Urząd Skarbowy",
    poradnik: "Poradnik",
  }
  return labels[category]
}
