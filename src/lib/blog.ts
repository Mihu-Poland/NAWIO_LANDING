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
 * @author Mihu
 * @updated 2026-05-13
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

  // =========================================================================
  // ARTYKUŁ 4: e-Doręczenia dla sp. z o.o. — jak założyć
  // =========================================================================
  {
    slug: "e-doreczenia-sp-z-o-o-jak-zalozyc",
    title: "e-Doręczenia dla sp. z o.o. — jak założyć krok po kroku",
    description:
      "Obowiązek e-Doręczeń dla spółek z o.o. w 2026 r. Dowiedz się, jak założyć skrzynkę na gov.pl, zaktualizować adres w KRS i co grozi za brak rejestracji.",
    publishedAt: "2026-05-13",
    category: "krs",
    readingTime: 6,
    content: `
<article>
  <h2>Czym są e-Doręczenia i dlaczego dotyczą Twojej spółki?</h2>
  <p>
    e-Doręczenia to elektroniczny odpowiednik listu poleconego z potwierdzeniem odbioru.
    Od 2026 roku każda spółka z ograniczoną odpowiedzialnością zarejestrowana w KRS
    jest zobowiązana posiadać <strong>adres do e-Doręczeń (AED)</strong> — wpisany do Bazy
    Adresów Elektronicznych (BAE).
  </p>
  <p>
    Korespondencja z sądami, urzędami skarbowymi, ZUS-em czy innymi podmiotami publicznymi
    trafia odtąd właśnie na ten adres. Nie na papier, nie na zwykłego maila — na dedykowaną,
    prawnie równoważną skrzynkę e-Doręczeń.
  </p>
  <p>
    Brak adresu nie zwalnia Cię z odbioru. Sąd może uznać pismo za skutecznie doręczone
    nawet jeśli fizycznie go nie odebrałeś — to klasyczna pułapka dla spółek, które
    zignorują obowiązek.
  </p>

  <h2>Kto musi założyć skrzynkę e-Doręczeń?</h2>
  <p>
    Obowiązek posiadania adresu do e-Doręczeń spoczywa na:
  </p>
  <ul>
    <li><strong>Wszystkich spółkach zarejestrowanych w KRS</strong> — w tym sp. z o.o., S.A., spółkach jawnych, partnerskich, komandytowych i komandytowo-akcyjnych</li>
    <li>Przedsiębiorcach wpisanych do CEIDG (od odrębnego terminu)</li>
    <li>Podmiotach publicznych, takich jak urzędy i sądy (te już mają obowiązek)</li>
  </ul>
  <p>
    Jeśli prowadzisz sp. z o.o. — niezależnie od wielkości, branży czy obrotów —
    ten obowiązek Cię dotyczy.
  </p>

  <h2>Jak założyć skrzynkę e-Doręczeń dla sp. z o.o.? (krok po kroku)</h2>

  <h3>Krok 1: Zaloguj się na gov.pl</h3>
  <p>
    Wejdź na <strong>moje.gov.pl</strong> i zaloguj się jako reprezentant spółki.
    Możesz użyć:
  </p>
  <ul>
    <li>Profilu Zaufanego (jeśli go masz)</li>
    <li>Kwalifikowanego podpisu elektronicznego</li>
    <li>e-Dowodu osobistego z warstwą elektroniczną</li>
  </ul>

  <h3>Krok 2: Znajdź wniosek o założenie AED dla podmiotu</h3>
  <p>
    Na gov.pl znajdź usługę <em>„Założenie adresu do e-Doręczeń dla podmiotu niepublicznego"</em>
    (lub skorzystaj z bezpośredniego linku: edoreczenia.gov.pl). Wybierz opcję dla
    <strong>podmiotu rejestrowego (KRS)</strong>.
  </p>

  <h3>Krok 3: Wypełnij wniosek</h3>
  <p>
    Potrzebujesz:
  </p>
  <ul>
    <li>Numeru KRS spółki</li>
    <li>NIP spółki</li>
    <li>Danych reprezentanta składającego wniosek (imię, nazwisko, PESEL)</li>
    <li>Adresu e-mail do powiadomień (nie będzie to AED — tylko adres pomocniczy)</li>
  </ul>
  <p>
    System automatycznie weryfikuje, czy wnioskodawca jest umocowany do reprezentowania
    spółki (na podstawie danych KRS). Dlatego osoba składająca wniosek musi być
    wpisana w KRS jako uprawniona do reprezentacji.
  </p>

  <h3>Krok 4: Podpisz i wyślij wniosek</h3>
  <p>
    Podpisz wniosek profilem zaufanym lub kwalifikowanym podpisem elektronicznym,
    a następnie wyślij. Wnioski są rozpatrywane co do zasady <strong>w ciągu 3 dni roboczych</strong>.
  </p>

  <h3>Krok 5: Odbierz adres do e-Doręczeń</h3>
  <p>
    Po weryfikacji wniosku otrzymasz potwierdzenie na podany adres e-mail.
    Twoja skrzynka e-Doręczeń będzie dostępna w systemie edoreczenia.gov.pl.
    Adres ma format: <code>AE:PL-[numer]</code>.
  </p>

  <h3>Krok 6: Zaktualizuj adres w KRS</h3>
  <p>
    Po uzyskaniu AED spółka ma obowiązek <strong>wpisać go do rejestru KRS</strong>.
    Składasz wniosek przez Portal Rejestrów Sądowych (PRS) — formularz KRS-Z3
    lub odpowiedni dla zmiany danych spółki. Od momentu wpisu do KRS adres staje się
    oficjalnym adresem do korespondencji z podmiotami publicznymi.
  </p>

  <h2>Ile kosztuje założenie skrzynki e-Doręczeń?</h2>
  <p>
    Założenie adresu do e-Doręczeń dla spółki jest <strong>bezpłatne</strong>.
    Nie ma opłat za sam adres ani za odbieranie korespondencji. Płatne mogą być natomiast
    usługi kwalifikowanych dostawców e-Doręczeń (KDWU) — komercyjnych podmiotów
    oferujących skrzynkę e-Doręczeń jako alternatywę do systemu rządowego.
    W większości przypadków adres na gov.pl w zupełności wystarczy.
  </p>

  <h2>Co grozi za brak e-Doręczeń?</h2>
  <p>
    Konsekwencje są poważniejsze niż mogłoby się wydawać:
  </p>
  <ul>
    <li><strong>Fikcja doręczenia</strong> — sąd lub urząd może uznać pismo za doręczone skutecznie, nawet jeśli spółka nie odebrała wiadomości, bo nie ma skrzynki</li>
    <li><strong>Przegapione terminy procesowe</strong> — np. termin na wniesienie sprzeciwu od nakazu zapłaty</li>
    <li><strong>Grzywna od KRS</strong> — za niedopełnienie obowiązku aktualizacji danych rejestrowych</li>
    <li><strong>Problemy z postępowaniami administracyjnymi</strong> — urzędy mogą odmówić uznania korespondencji papierowej tam, gdzie e-Doręczenia są obligatoryjne</li>
  </ul>

  <h2>e-Doręczenia a zwykły e-mail — jaka różnica?</h2>
  <p>
    Zwykły e-mail nie ma mocy prawnej doręczenia. e-Doręczenia to system oparty
    na regulacji unijnej (rozporządzenie eIDAS) i polskiej ustawie o doręczeniach
    elektronicznych, który zapewnia:
  </p>
  <ul>
    <li>Pewność daty i godziny wysłania oraz odbioru</li>
    <li>Integralność przesyłanej treści (nikt jej nie zmienił po drodze)</li>
    <li>Pełną moc prawną — równoważną z listem poleconym z potwierdzeniem odbioru</li>
    <li>Archiwizację dowodów doręczenia</li>
  </ul>

  <h2>Jak Nawio pomaga przy e-Doręczeniach?</h2>
  <p>
    Nawio pilnuje, żebyś nie zapomniał o obowiązkach, w tym o aktywacji i aktualizacji
    adresu e-Doręczeń. W panelu Nawio znajdziesz przypomnienie o tym obowiązku
    i bezpośrednie linki do odpowiednich formularzy gov.pl — bez szukania w zakamarkach
    urzędowych portali.
  </p>
  <p>
    Nawio to nawigator, nie kancelaria. Ale dobry nawigator nie pozwoli Ci przegapić
    skrętu, który kosztuje miesiąc spóźnienia i kilka tysięcy złotych grzywny.
  </p>

  ${DISCLAIMER}
</article>
    `,
  }
  // =========================================================================
  // ARTYKUŁ (auto): Odpowiedzialność członka zarządu sp. z o.o. za długi spółki
  // =========================================================================
  {
    slug: "odpowiedzialnosc-czlonka-zarzadu-sp-z-o-o-za-dlugi",
    title: "Odpowiedzialność członka zarządu sp. z o.o. za długi spółki",
    description: "Kiedy prezes lub członek zarządu odpowiada osobiście za długi spółki z o.o.? Omówienie art. 299 KSH, przesłanek odpowiedzialności i sposobów ochrony – poradnik 2026.",
    publishedAt: "2026-06-15",
    category: "poradnik",
    readingTime: 6,
    content: `
<article>
<h2>Kiedy członek zarządu odpowiada za długi spółki?</h2>

<p>Spółka z ograniczoną odpowiedzialnością to forma prawna, która co do zasady chroni majątek prywatny wspólników. Ale co z członkami zarządu? Czy prezes lub członek zarządu może zostać pociągnięty do odpowiedzialności za długi spółki? Odpowiedź brzmi: tak, w ściśle określonych sytuacjach. Kodeks spółek handlowych przewiduje mechanizm odpowiedzialności subsydiarnej, który może dotknąć zarząd nawet po latach od ustąpienia z funkcji.</p>

<p>Odpowiedzialność członka zarządu to temat, który budzi wiele emocji i często jest źródłem nieporozumień. Z jednej strony zarząd musi mieć swobodę w prowadzeniu spółki, z drugiej – prawo musi chronić wierzycieli przed sytuacjami, gdy spółka staje się pustą skorupą bez majątku. W praktyce oznacza to, że każdy prezes czy członek zarządu powinien dokładnie rozumieć granice swojej odpowiedzialności i wiedzieć, jak się chronić.</p>

<h3>Podstawa prawna: art. 299 KSH</h3>

<p>Fundamentem odpowiedzialności członków zarządu za długi spółki z o.o. jest artykuł 299 Kodeksu spółek handlowych. Przepis ten stanowi, że jeżeli egzekucja przeciwko spółce okaże się bezskuteczna, członkowie zarządu odpowiadają solidarnie za jej zobowiązania. Brzmi groźnie? Rzeczywiście może tak być, ale diabeł tkwi w szczegółach – odpowiedzialność ta nie jest automatyczna.</p>

<p>Kluczowe jest zrozumienie, że mówimy tu o odpowiedzialności subsydiarnej. Oznacza to, że wierzyciel nie może od razu pozwać członka zarządu. Najpierw musi próbować wyegzekwować dług od spółki. Dopiero gdy egzekucja przeciwko spółce okaże się bezskuteczna, może zwrócić się przeciwko osobom z zarządu. To istotne zabezpieczenie, które oddziela odpowiedzialność spółki od odpowiedzialności osobistej zarządcy.</p>

<h2>Co oznacza bezskuteczność egzekucji?</h2>

<p>Bezskuteczność egzekucji to pojęcie, które w praktyce wywołuje najwięcej sporów. Nie chodzi tu o sytuację, gdy spółka nie płaci dobrowolnie, ale o formalny tytuł wykonawczy i działania komornika. Wierzyciel musi najpierw uzyskać tytuł wykonawczy przeciwko spółce (wyrok sądu, nakaz zapłaty, akt notarialny z klauzulą wykonalności), następnie zlecić egzekucję komorniczą, a dopiero gdy komornik stwierdzi, że nie ma z czego zaspokoić długu – wtedy egzekucja uznawana jest za bezskuteczną.</p>

<p>Komornik wydaje wtedy postanowienie o umorzeniu lub zawieszeniu egzekucji ze względu na jej bezskuteczność. Często ma to miejsce, gdy:</p>

<ul>
<li>Spółka nie posiada środków na rachunkach bankowych</li>
<li>Nie posiada majątku, który można zająć (nieruchomości, samochody, wyposażenie biura)</li>
<li>Majątek spółki jest już zajęty przez innych wierzycieli z wcześniejszym pierwszeństwem</li>
<li>Spółka faktycznie zaprzestała działalności i nie ma żadnych aktywów</li>
</ul>

<p>Dopiero taki dokument od komornika otwiera wierzycielowi drogę do pozwania członków zarządu osobiście. To istotne zabezpieczenie proceduralne – bez próby egzekucji z majątku spółki, pozew przeciwko zarządowi zostanie oddalony jako przedwczesny.</p>

<h3>Kiedy członek zarządu może się bronić?</h3>

<p>Przepis art. 299 KSH przewiduje kluczową możliwość obrony dla członka zarządu: może on uwolnić się od odpowiedzialności, jeśli wykaże, że we właściwym czasie zgłoszono wniosek o ogłoszenie upadłości lub wszczęto postępowanie restrukturyzacyjne, albo że niezgłoszenie wniosku o ogłoszenie upadłości nastąpiło bez jego winy, albo że pomimo niezgłoszenia wniosku wierzyciel nie poniósł szkody.</p>

<p>To tzw. przesłanki egzoneracyjne – sposoby na wykazanie, że członek zarządu zachował się prawidłowo i nie ponosi winy. W praktyce najczęściej wykorzystywane są następujące strategie obronne:</p>

<ul>
<li><strong>Terminowe zgłoszenie wniosku o upadłość</strong> – jeśli spółka straciła zdolność do regulowania zobowiązań lub jej zobowiązania przekroczyły wartość majątku, zarząd ma 30 dni na złożenie wniosku o ogłoszenie upadłości. Dostarczenie dowodu takiego złożenia w terminie praktycznie zwalnia z odpowiedzialności.</li>
<li><strong>Wszczęcie postępowania restrukturyzacyjnego</strong> – alternatywą dla upadłości jest postępowanie sanacyjne lub układowe. Jeśli zarząd w porę złożył wniosek o restrukturyzację, również może się na to powołać.</li>
<li><strong>Brak winy w niezgłoszeniu upadłości</strong> – trudniejsza droga, wymaga wykazania, że member zarządu nie miał wiedzy o złej sytuacji spółki lub że za niezgłoszenie odpowiadają inne osoby (np. wspólnik, który blokował decyzje, lub poprzedni zarząd).</li>
<li><strong>Brak szkody po stronie wierzyciela</strong> – jeśli dług powstał już w sytuacji, gdy spółka była niewypłacalna, a wierzyciel i tak by nie uzyskał zapłaty, członek zarządu może wykazać, że jego bezczynność nie pogorszyła sytuacji wierzyciela.</li>
</ul>

<h2>Solidarność odpowiedzialności – kto płaci?</h2>

<p>Odpowiedzialność członków zarządu ma charakter solidarny. Oznacza to, że wierzyciel może domagać się całości długu od dowolnego członka zarządu, niezależnie od podziału obowiązków w spółce. Nawet jeśli zarząd był wieloosobowy i ktoś formalnie odpowiadał za finanse, a ktoś za produkcję – wszyscy odpowiadają całym swoim majątkiem za cały dług.</p>

<p>W praktyce wierzyciele często pozywają tego członka zarządu, który ma widoczny majątek – dom, samochód, oszczędności. Po zapłaceniu dłużnik ma wprawdzie prawo dochodzić zwrotu od pozostałych członków zarządu w drodze regresu, ale jeśli tamci są niewypłacalni, prawo pozostaje tylko na papierze.</p>

<h3>Jak długo trwa odpowiedzialność?</h3>

<p>Wielu byłych członków zarządu oddycha z ulgą po ustąpieniu z funkcji, sądząc że odpowiedzialność pozostała w przeszłości. Niestety, prawo przewiduje inaczej. Odpowiedzialność na podstawie art. 299 KSH przedawnia się dopiero po trzech latach od dnia, w którym zobowiązanie stało się wymagalne. Nie liczy się więc data ustąpienia z funkcji, tylko data wymagalności długu.</p>

<p>Przykład: jeśli byłeś członkiem zarządu do końca grudnia 2023 roku, a spółka miała zapłacić fakturę 15 marca 2024 roku (już po twoim odejściu), termin przedawnienia twojej odpowiedzialności biegnie od 15 marca 2024 i kończy się 15 marca 2027 roku. Mimo że nie byłeś już w zarządzie, gdy dług stał się wymagalny – możesz zostać pozwany.</p>

<p>Jednocześnie odpowiadasz tylko za te zobowiązania, które powstały lub stały się wymagalne w czasie pełnienia funkcji. Jeśli spółka zaciągnęła zobowiązanie dopiero po twoim odejściu, już cię to nie dotyczy.</p>

<h2>Odpowiedzialność za zobowiązania publicznoprawne</h2>

<p>Szczególnie dotkliwa jest odpowiedzialność członków zarządu za zobowiązania podatkowe i składki ZUS. Ordynacja podatkowa i przepisy o systemie ubezpieczeń społecznych przewidują, że członek zarządu odpowiada całym swoim majątkiem solidarnie ze spółką za jej zaległości podatkowe i składkowe, jeżeli egzekucja z majątku spółki okazała się bezskuteczna.</p>

<p>Tu nie ma możliwości obrony poprzez wykazanie, że zgłoszono wniosek o upadłość – odpowiedzialność jest surowsza. Jedyną skuteczną obroną jest wykazanie, że:</p>

<ul>
<li>Zaległość powstała nie z winy członka zarządu</li>
<li>Członek zarządu wykonywał swoje obowiązki ze starannością wymaganą w obrocie gospodarczym</li>
<li>Wskazanie majątku spółki, z którego można prowadzić egzekucję (jeśli członek zarządu zna taki majątek, który umknął organom skarbowym lub ZUS)</li>
</ul>

<p>W praktyce odpowiedzialność za zaległości wobec US i ZUS jest jednym z najczęstszych powodów, dla których byli członkowie zarządu są pociągani do osobistej odpowiedzialności. Urząd skarbowy i ZUS są wysoce aktywni w dochodzeniu takich roszczeń.</p>

<h3>Uchwała o podziale zysku a odpowiedzialność zarządu</h3>

<p>Interesującą kwestią jest sytuacja, gdy spółka wypłaca dywidendę w sytuacji, gdy miała już problemy finansowe. Jeśli zarząd wykonał uchwałę o podziale zysku, wiedząc lub mogąc wiedzieć, że spółka jest niewypłacalna lub stanie się niewypłacalna po wypłacie, może to być podstawą odpowiedzialności wobec wierzycieli.</p>

<p>Sąd Najwyższy wielokrotnie wskazywał, że zarząd ma obowiązek odmówić wykonania uchwały o podziale zysku, jeśli realizacja wypłaty doprowadziłaby do niewypłacalności spółki. W przeciwnym razie członkowie zarządu mogą odpowiadać za pogorszenie sytuacji wierzycieli, którzy zostali pozbawieni możliwości zaspokojenia swoich roszczeń.</p>

<h2>Odpowiedzialność karna – art. 586 KSH</h2>

<p>Oprócz odpowiedzialności cywilnej z art. 299 KSH członek zarządu może również ponieść odpowiedzialność karną za niezgłoszenie wniosku o upadłość. Artykuł 586 Kodeksu spółek handlowych przewiduje karę grzywny lub ograniczenia wolności (a w szczególnych przypadkach nawet pozbawienia wolności do 2 lat) dla członka zarządu, który wbrew obowiązkowi nie zgłosił we właściwym czasie wniosku o ogłoszenie upadłości spółki.</p>

<p>Postępowanie karne toczy się niezależnie od sprawy cywilnej o zapłatę. Oznacza to, że nawet jeśli wierzyciel nie zdecyduje się pozwać członka zarządu, prokuratura lub sąd z urzędu może wszcząć postępowanie karne. W praktyce takie sprawy zdarzają się częściej, niż mogłoby się wydawać, zwłaszcza gdy spółka zostawiła po sobie wielu poszkodowanych wierzycieli.</p>

<h2>Jak zabezpieczyć się przed odpowiedzialnością?</h2>

<p>Najlepszą ochroną dla członka zarządu jest prewencja i dokumentowanie działań. Oto praktyczne kroki, które warto podejmować na bieżąco:</p>

<ul>
<li><strong>Monitoruj sytuację finansową spółki</strong> – regularnie sprawdzaj stan rachunków, terminy płatności zobowiązań, opóźnienia w płatnościach wobec kontrahentów. Nie polegaj wyłącznie na księgowej – jako członek zarządu odpowiadasz osobiście.</li>
<li><strong>Dokumentuj decyzje</strong> – protokóły z posiedzeń zarządu, notatki z rozmów ze wspólnikami, pisemne stanowiska w trudnych sytuacjach. To może być kluczowy dowód w przyszłości, że działałeś ze starannością.</li>
<li><strong>Reaguj szybko na oznaki kryzysu</strong> – jeśli widzisz, że spółka opóźnia płatności, ma problemy z regulowaniem ZUS lub podatków, natychmiast eskaluj problem. Zwołaj zgromadzenie wspólników, przedyskutuj plan działania, rozważ restrukturyzację lub upadłość.</li>
<li><strong>Złóż wniosek o upadłość w terminie</strong> – jeśli spółka stała się niewypłacalna, masz 30 dni na złożenie wniosku. Nie czekaj na cud – działaj. Złożenie wniosku (nawet jeśli później zostanie oddalony) chroni cię przed odpowiedzialnością.</li>
<li><strong>Rozważ ubezpieczenie D&O</strong> – ubezpieczenie odpowiedzialności cywilnej członków zarządu (Directors & Officers Liability Insurance) pokrywa roszczenia kierowane przeciwko zarządowi. To kosztowna polisa, ale w razie problemów może uratować twój majątek prywatny.</li>
<li><strong>Nie ignoruj wezwań i postępowań</strong> – jeśli komornik przysyła wezwanie do spółki, a ty już nie jesteś w zarządzie, upewnij się że aktualni członkowie zostali poinformowani. Jeśli wciąż pełnisz funkcję – niezwłocznie skontaktuj się z prawnikiem.</li>
</ul>

<h3>Czy można ograniczyć odpowiedzialność w umowie?</h3>

<p>Umowa o zarządzanie lub uchwała o powołaniu członka zarządu nie może wyłączyć ani ograniczyć odpowiedzialności przewidzianej w art. 299 KSH. Takie postanowienia byłyby z mocy prawa nieważne. Odpowiedzialność ta wynika bezpośrednio z ustawy i służy ochronie wierzycieli – nie można jej obejść umową wewnętrzną.</p>

<p>Natomiast możliwe jest zawarcie umowy między członkami zarządu o regresie wewnętrznym (kto i w jakiej części zwróci innemu członkowi kwoty zapłacone wierzycielom) lub zlecenie spółce wykupienia ubezpieczenia D&O.</p>

<h2>Rezygnacja z funkcji członka zarządu – jak to zrobić bezpiecznie?</h2>

<p>Jeśli widzisz, że sytuacja spółki się pogarsza i nie masz wpływu na decyzje (np. wspólnicy ignorują twoje ostrzeżenia), najlepszym rozwiązaniem może być rezygnacja z funkcji członka zarządu. Pamiętaj jednak o kilku zasadach:</p>

<ul>
<li><strong>Złóż pisemną rezygnację</strong> – najlepiej listem poleconym lub za potwierdzeniem odbioru. Nie wystarczy ustne poinformowanie wspólników.</li>
<li><strong>Dopilnuj wykreślenia z KRS</strong> – twoja rezygnacja staje się skuteczna wobec osób trzecich dopiero po wpisaniu do KRS. Dopóki jesteś wpisany jako członek zarządu w KRS, traktowany jesteś jak członek zarządu i możesz odpowiadać za długi.</li>
<li><strong>Zachowaj dowody</strong> – kopia rezygnacji, dowód nadania, potwierdzenie zgłoszenia zmiany do KRS. To dokumenty, które mogą chronić cię w przyszłości.</li>
<li><strong>Pamiętaj o odpowiedzialności za przeszłość</strong> – ustąpienie z funkcji nie zwalnia cię od odpowiedzialności za zobowiązania powstałe w czasie pełnienia funkcji. Jeśli spółka miała już wtedy problemy, możesz wciąż zostać pozwany.</li>
</ul>

<h2>Przykłady z praktyki</h2>

<p>Wyobraź sobie, że jesteś członkiem zarządu sp. z o.o., która prowadzi działalność handlową. W 2024 roku spółka zaczyna mieć problemy z płynnością finansową – opóźnia płatności wobec dostawców, nie reguluje na czas ZUS. Ty jako członek zarządu wielokrotnie zwracasz uwagę wspólnikom, ale ci decydują o kontynuowaniu działalności i wypłacie dywidendy.</p>

<p>W lutym 2025 roku rezygnujesz z funkcji. Zmiana jest zgłoszona do KRS w marcu 2025. W czerwcu 2025 roku spółka zaprzestaje działalności, a we wrześniu 2025 jeden z większych wierzycieli uzyskuje nakaz zapłaty przeciwko spółce. Egzekucja komornicza kończy się w grudniu 2025 stwierdzeniem bezskuteczności – spółka nie ma majątku.</p>

<p>W lutym 2026 roku wierzyciel pozywa ciebie oraz obecnych członków zarządu o zapłatę długu solidarnie. Mimo że nie pełniłeś funkcji w momencie, gdy spółka przestała działać, odpowiadasz za zobowiązania które powstały lub stały się wymagalne w czasie twojego zarządu. Możesz bronić się wykazując, że:</p>

<ul>
<li>Domagałeś się złożenia wniosku o upadłość, ale wspólnicy zablokowali decyzję (jeśli masz dowody – e-maile, protokoły)</li>
<li>Rezygnacja nastąpiła właśnie ze względu na rozbieżności co do sposobu zarządzania kryzysowego</li>
<li>W momencie rezygnacji nie było jeszcze podstaw do złożenia wniosku o upadłość (jeśli tak faktycznie było)</li>
</ul>

<p>Taka sprawa może trwać latami i zakończyć się koniecznością zapłaty całego długu z twojego majątku prywatnego. Dlatego tak ważne jest dokumentowanie wszystkiego na bieżąco.</p>

<h2>Jak Nawio pomaga właścicielom sp. z o.o.?</h2>

<p>Zarządzanie spółką z o.o. to nie tylko bieżące decyzje biznesowe, ale przede wszystkim terminowe wypełnianie obowiązków formalnych. Opóźnienie w złożeniu sprawozdania finansowego, przeoczenie terminu zwołania zgromadzenia wspólników czy brak reakcji na zbliżającą się konieczność zgłoszenia upadłości może narazić członka zarządu na osobistą odpowiedzialność. Nawio to aplikacja stworzona właśnie po to, by właściciele i członkowie zarządu spółek z o.o. mieli pełną kontrolę nad terminami i obowiązkami.</p>

<p>W Nawio prowadzisz kalendarz terminów korporacyjnych dla swojej spółki – system automatycznie przypomina o zbliżających się deadlinach, takich jak zwyczajne zgromadzenie wspólników, złożenie sprawozdania finansowego, zgłoszenie zmian do KRS czy inne kluczowe wydarzenia. Każdy termin możesz oznaczyć priorytetem, dodać notatki i powiązać z konkretnymi zadaniami. Dzięki przypomnieniam e-mail wysyłanym kilka dni przed terminem, nigdy nie przeoczysz ważnego obowiązku. To szczególnie istotne w kontekście odpowiedzialności zarządu – terminowe działanie i udokumentowanie starań to twoja najlepsza obrona w razie przyszłych sporów.</p>

<p>Nawio pozwala również generować dokumenty korporacyjne na podstawie danych twojej spółki – uchwały, protokoły z zgromadzeń, inne pisma. Wszystko w jednym miejscu, z możliwością zarządzania wieloma spółkami jednocześnie. Jeśli jesteś członkiem zarządu kilku podmiotów, w aplikacji masz przejrzysty dashboard z listą zadań, terminów i statusem każdej spółki. To konkretne narzędzie dla ludzi, którzy chcą zarządzać swoją spółką profesjonalnie, bez zaglądania do przepisów co drugi dzień i bez obaw, że coś im umknie.</p>

<div class='disclaimer'><p>Treści publikowane przez Nawio mają charakter informacyjny i nie stanowią porady prawnej ani podatkowej. BearStone sp. z o.o. nie ponosi odpowiedzialności za skutki działań podjętych na ich podstawie.</p></div>
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
