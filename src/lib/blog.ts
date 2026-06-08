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
  // ARTYKUŁ (auto): CIT estoński sp. z o.o. – czy warto w 2026? Analiza
  // =========================================================================
  {
    slug: "cit-estonski-sp-z-o-o-czy-warto-2026",
    title: "CIT estoński sp. z o.o. – czy warto w 2026? Analiza",
    description: "CIT estoński w 2026: korzyści, pułapki i zmiany. Sprawdź, czy ryczałt od dochodów spółek opłaca się dla Twojej firmy. Warunki, stawki 20-25%, kiedy rezygnować.",
    publishedAt: "2026-06-08",
    category: "poradnik",
    readingTime: 6,
    content: `
<article>
<h2>Czym jest CIT estoński i dlaczego budzi tyle emocji</h2>

<p>Ryczałt od dochodów spółek – potocznie zwany CIT-em estońskim – to forma opodatkowania, która od stycznia 2021 roku wywołuje gorącą dyskusję wśród właścicieli sp. z o.o. Jedni widzą w nim rewolucyjne uproszczenie i szansę na optymalizację podatkową, inni ostrzegają przed pułapkami i nieoczywistymi konsekwencjami.</p>

<p>Podstawowa obietnica brzmi kusząco: płacisz podatek dopiero wtedy, gdy faktycznie wypłacasz zysk ze spółki – w formie dywidendy, darowizny czy ukrytej dystrybucji. Do tego momentu możesz reinwestować zyski bez obciążeń podatkowych. Brzmi jak sen każdego przedsiębiorcy, prawda?</p>

<p>Rzeczywistość – jak to w prawie podatkowym – bywa bardziej skomplikowana. W 2026 roku, po pięciu latach funkcjonowania tego rozwiązania w polskim systemie podatkowym, mamy już wystarczająco dużo danych i praktycznych przykładów, żeby odpowiedzieć na pytanie: czy naprawdę warto?</p>

<h2>Jak działa estoński CIT – mechanizm w praktyce</h2>

<p>Zanim przejdziemy do analizy opłacalności, zrozummy dokładnie mechanizm działania. W klasycznym CIT (stawka 9% lub 19%) spółka płaci podatek od osiągniętego dochodu – niezależnie od tego, czy go wypłacasz, czy zostawiasz w firmie. Płacisz na bieżąco, co miesiąc (zaliczki) lub rocznie.</p>

<p>W estońskim CIT wszystko działa inaczej. Spółka nie płaci podatku od samego dochodu. Obciążenie pojawia się dopiero w momencie dystrybucji zysku – czyli gdy:</p>

<ul>
<li>Wypłacasz dywidendę dla wspólników</li>
<li>Przekazujesz majątek spółki w formie darowizny</li>
<li>Ponosisz wydatki niewykraczające z działalnością gospodarczą (tzw. ukryte zyski)</li>
<li>Dokonujesz określonych transakcji z podmiotami powiązanymi</li>
<li>Wydatkujesz środki na cele reprezentacyjne powyżej limitów</li>
</ul>

<p>Podstawowa stawka wynosi 10% podstawy opodatkowania (przy dochodach do 2 mln euro) lub 20% (powyżej tego progu). Brzmi lepiej niż standardowy CIT? Nie do końca – bo podstawą opodatkowania nie jest czysty zysk, tylko kwota brutto podzielona przez współczynnik 0,7. W efekcie realna stawka to około 14,3% lub 28,6%.</p>

<h3>Praktyczny przykład wyliczenia</h3>

<p>Załóżmy, że wypłacasz sobie dywidendę 100 000 zł:</p>

<ul>
<li>Podstawa opodatkowania: 100 000 / 0,7 = 142 857 zł</li>
<li>Podatek CIT estoński (10%): 14 286 zł</li>
<li>Efektywne obciążenie: 14,3%</li>
<li>Do wypłaty (po potrąceniu PIT od dywidendy 19%): około 69 000 zł</li>
</ul>

<p>Dla porównania przy klasycznym CIT 9% od tego samego zysku zapłaciłbyś 9000 zł CIT, a następnie 19% PIT od dywidendy – łącznie około 26 300 zł podatków. W estońskim CIT to ponad 31 000 zł. Różnica? Ponad 4700 zł na niekorzyść estońskiego.</p>

<h2>Kto może skorzystać z CIT estońskiego w 2026</h2>

<p>Nie każda spółka z o.o. może wybrać ryczałt od dochodów spółek. Ustawodawca określił precyzyjne warunki, które musisz spełnić – zarówno w momencie wejścia do systemu, jak i przez cały czas jego stosowania.</p>

<h3>Warunki formalne</h3>

<p>Twoja spółka musi być małym podatnikiem (przychody poniżej 2 mln euro w poprzednim roku) lub rozpoczynać działalność. Nie możesz być spółką powstałą z przekształcenia lub podziału innego podmiotu – chyba że te podmioty też stosowały estoński CIT.</p>

<p>Dodatkowo przez cały okres stosowania ryczałtu musisz utrzymać określone proporcje w strukturze przychodów:</p>

<ul>
<li>Minimum 50% przychodów z działalności operacyjnej (nie z najmu majątku czy odsetek)</li>
<li>Udział przychodów pasywnych (odsetki, dywidendy, należności licencyjne) nie może przekroczyć 50%</li>
<li>Zatrudnienie na poziomie co najmniej trzech pracowników w przeliczeniu na pełne etaty przez minimum 300 dni w roku</li>
</ul>

<h3>Pułapka zatrudnienia</h3>

<p>Ten ostatni wymóg zasługuje na szczególną uwagę. Trzy etaty to nie trzy umowy – to faktyczne godziny pracy. Jeśli zatrudniasz osoby na pół etatu, musisz ich mieć sześć. Prezes zarządzający na podstawie powołania nie liczy się do tej puli, chyba że ma odrębną umowę o pracę.</p>

<p>W praktyce wielu właścicieli jednoosobowych spółek odpada już na tym etapie. Koszt trzech pracowników (wynagrodzenia brutto + ZUS pracodawcy) to minimum 15-18 tys. zł miesięcznie. Czy oszczędności podatkowe to zrekompensują? Często nie.</p>

<h2>Kiedy estoński CIT naprawdę ma sens</h2>

<p>Po pięciu latach funkcjonowania systemu wyraźnie widać, dla kogo to rozwiązanie faktycznie przynosi korzyści. Nie są to wcale najliczniejsze grupy przedsiębiorców.</p>

<h3>Spółki w fazie intensywnego wzrostu</h3>

<p>Jeśli planujesz agresywną reinwestycję zysków – zakup maszyn, rozbudowę firmy, zatrudnienie nowych pracowników – estoński CIT może być strzałem w dziesiątkę. Nie płacisz podatku od dochodu, który i tak zostałby w firmie. Możesz szybciej skalować biznes.</p>

<p>Przykład: prowadzisz software house generujący 500 tys. zł zysku rocznie. Przez trzy lata reinwestujesz wszystko w rozwój produktu i zespół. W klasycznym CIT zapłaciłbyś około 135 tys. zł podatku (przy stawce 9%). W estońskim – zero, bo nie wypłacasz dywidendy. Te 135 tysięcy możesz przeznaczyć na kolejnego dewelopera.</p>

<h3>Właściciele planujący długoterminowe zaangażowanie</h3>

<p>Estoński CIT wymaga myślenia wieloletniego. Pierwsza wypłata dywidendy może uderzyć sporym podatkiem (szczególnie przy kumulacji kilku lat zysków), ale im dłużej stosujesz ten system, tym bardziej się opłaca – pod warunkiem że kontynuujesz reinwestycje.</p>

<h3>Spółki z dużymi kosztami pracowniczymi</h3>

<p>Jeśli i tak zatrudniasz wielu pracowników, wymóg trzech etatów nie stanowi dodatkowego kosztu. Dla firmy konsultingowej z zespołem dziesięciu osób to naturalne środowisko – estoński CIT może być dobrym wyborem.</p>

<h2>Kiedy lepiej odpuścić – sytuacje dyskwalifikujące</h2>

<p>Równie ważne jak wiedza o zaletach jest rozpoznanie scenariuszy, w których estoński CIT to zły pomysł.</p>

<h3>Mała jednoosobowa działalność</h3>

<p>Prowadzisz niewielką spółkę, Ty jesteś jedynym pracującym, może masz zleceniobiorców lub B2B? Koszt zatrudnienia trzech osób prawdopodobnie przekroczy jakiekolwiek korzyści podatkowe. To najczęstsza pułapka – przedsiębiorcy kuszone "estońskimi" obietnicami odkrywają, że oszczędności są iluzoryczne wobec kosztów kadrowych.</p>

<h3>Regularne wypłaty na cele prywatne</h3>

<p>Jeśli co miesiąc potrzebujesz pieniędzy z firmy na życie (kredyt hipoteczny, wydatki rodzinne, bieżące potrzeby), estoński CIT prawdopodobnie będzie droższy od klasycznego. Każda dywidenda oznacza podatek 14,3% lub 28,6% plus PIT 19%. W sumie zabierzesz mniej niż przy CIT 9% + PIT od dywidendy.</p>

<h3>Spółki z przychodami pasywnymi</h3>

<p>Jeśli znaczna część Twoich przychodów pochodzi z wynajmu nieruchomości, odsetek od pożyczek czy dywidend od innych podmiotów – przekroczysz limit 50% przychodów pasywnych i stracisz prawo do estońskiego CIT. Spółki holdingowe czy inwestycyjne praktycznie nie mają szans na spełnienie tego warunku.</p>

<h2>Zmiany w 2025-2026 – na co uważać</h2>

<p>System estońskiego CIT nie jest застывły. Ministerstwo Finansów na bieżąco monitoruje jego funkcjonowanie, a Krajowa Administracja Skarbowa wydaje interpretacje doprecyzowujące wątpliwe kwestie.</p>

<h3>Podwyższona stawka dla większych spółek</h3>

<p>Od 2025 roku dla spółek przekraczających próg 2 mln euro przychodów stawka wzrosła z 20% do 25% podstawy opodatkowania. W praktyce oznacza to efektywne obciążenie na poziomie około 35,7% wypłacanej dywidendy. To ogromna różnica wobec początkowych 14,3%.</p>

<p>Jeśli Twoja firma rośnie i zbliża się do tego progu, koniecznie przelicz opłacalność na nowo. Dla wielu przedsiębiorców przekroczenie 2 mln euro to sygnał do rezygnacji z estońskiego CIT.</p>

<h3>Zaostrzenie wymogów dotyczących zatrudnienia</h3>

<p>Coraz częściej pojawiają się kontrole weryfikujące faktyczność zatrudnienia. Nie wystarczy mieć trzech osób "na papierze" – muszą one rzeczywiście świadczyć pracę na rzecz spółki. Fikcyjne etaty (np. członków rodziny formalnie zatrudnionych, ale niewykonujących obowiązków) mogą skutkować utratą prawa do ryczałtu i koniecznością zapłaty zaległego CIT wraz z odsetkami.</p>

<h3>Interpretacje dotyczące ukrytych zysków</h3>

<p>Organy podatkowe coraz ściślej przyglądają się wydatkom spółek stosujących estoński CIT. Luksusowy samochód służbowy wykorzystywany głównie prywatnie? Zagraniczne wyjazdy o charakterze reprezentacyjnym? Korzystanie z nieruchomości spółki przez wspólnika? Wszystko to może zostać zakwalifikowane jako ukryta dystrybucja zysku i podlegać opodatkowaniu.</p>

<h2>Procedura przejścia na estoński CIT – jak to zrobić</h2>

<p>Decyzja już podjęta? Przejście na ryczałt od dochodów spółek wymaga zachowania określonej procedury i terminów.</p>

<h3>Złożenie zawiadomienia</h3>

<p>Musisz złożyć do urzędu skarbowego zawiadomienie o wyborze opodatkowania estońskim CIT (formularz CIT-28E) do końca pierwszego miesiąca roku podatkowego, w którym chcesz rozpocząć stosowanie ryczałtu. Dla spółek działających według roku kalendarzowego to 31 stycznia.</p>

<p>Spółki rozpoczynające działalność mają na to miesiąc od daty rejestracji. Pamiętaj, że wybór estońskiego CIT jest wiążący na minimum 4 lata podatkowe – nie możesz wycofać się wcześniej bez poważnych konsekwencji.</p>

<h3>Ewidencja i dokumentacja</h3>

<p>Mimo uproszczonego systemu opodatkowania, musisz prowadzić pełną księgowość zgodnie z ustawą o rachunkowości. Dodatkowo konieczna jest szczegółowa ewidencja wypłat, które stanowią podstawę opodatkowania. To szczególnie istotne przy transakcjach z podmiotami powiązanymi – każdy transfer wymaga dokumentacji cen transferowych.</p>

<h3>Monitoring spełniania warunków</h3>

<p>Co miesiąc powinieneś weryfikować, czy Twoja spółka nadal spełnia wszystkie wymogi estońskiego CIT: poziom zatrudnienia, strukturę przychodów, limity wydatków. Utrata któregokolwiek warunku w trakcie roku oznacza konieczność powrotu do klasycznego CIT od początku tego roku – z obowiązkiem zapłaty zaległych zaliczek wraz z odsetkami.</p>

<h2>Rezygnacja z estońskiego CIT – kiedy i jak</h2>

<p>Po upływie obowiązkowego 4-letniego okresu możesz zrezygnować z ryczałtu. Warto to zrobić, jeśli:</p>

<ul>
<li>Struktura Twojego biznesu się zmieniła (np. znacznie spadło zatrudnienie)</li>
<li>Zakończyłeś fazę intensywnych inwestycji i planujesz regularnie wypłacać zyski</li>
<li>Przekroczyłeś lub zbliżasz się do progu 2 mln euro przychodów</li>
<li>Obliczenia pokazują, że klasyczny CIT 9% będzie korzystniejszy</li>
</ul>

<p>Rezygnacja wymaga złożenia zawiadomienia (CIT-28D) do końca pierwszego miesiąca roku podatkowego, w którym chcesz wrócić do standardowego opodatkowania. Możesz też zostać automatycznie wykluczony z systemu, jeśli przestaniesz spełniać warunki – wtedy urząd skarbowy wyda decyzję o utracie prawa do ryczałtu.</p>

<h3>Rozliczenie przy wyjściu</h3>

<p>Wyjście z estońskiego CIT po latach akumulowania nieopodatkowanych zysków może być bolesne. Wszystkie zyski wypracowane w okresie stosowania ryczałtu, a niewypłacone do końca tego okresu, podlegają opodatkowaniu w momencie wystąpienia ze specjalnego systemu. To tzw. exit tax, który może sięgnąć setek tysięcy złotych.</p>

<p>Dlatego mądrzy właściciele planują wyjście z wyprzedzeniem – stopniowo wypłacając zgromadzone zyski w ostatnim roku stosowania ryczałtu, żeby rozłożyć obciążenie podatkowe.</p>

<h2>CIT estoński vs. inne formy optymalizacji</h2>

<p>Estoński CIT to nie jedyny sposób na obniżenie obciążeń podatkowych w sp. z o.o. Przed ostateczną decyzją warto porównać dostępne alternatywy.</p>

<h3>Klasyczny CIT 9%</h3>

<p>Dla małych spółek (do 2 mln euro przychodów) podstawowa stawka CIT wynosi zaledwie 9%. Jeśli nie planujesz długoterminowej reinwestycji całości zysków, ten wariant będzie często korzystniejszy niż estoński. Nie musisz spełniać dodatkowych warunków dotyczących zatrudnienia czy struktury przychodów.</p>

<h3>Wynagrodzenie zamiast dywidendy</h3>

<p>Zamiast wypłacać sobie dywidendę, możesz zwiększyć wynagrodzenie jako prezesa zarządu (umowa o pracę lub kontrakt menedżerski). Wynagrodzenie stanowi koszt uzyskania przychodu dla spółki, więc obniża CIT. Ty płacisz PIT według skali (17% lub 32%) plus składki ZUS.</p>

<p>Przy dochodach do około 150 tys. zł rocznie może to być korzystniejsze niż estoński CIT z późniejszą dywidendą. Wymaga jednak dokładnych obliczeń uwzględniających ZUS i progi podatkowe.</p>

<h3>Holding z fundacją rodzinną</h3>

<p>Dla bardziej zamożnych przedsiębiorców struktura holdingowa z fundacją rodzinną pozwala na efektywne zarządzanie majątkiem i sukcesję. Fundacja rodzinna płaci CIT 15% od dochodów, ale może akumulować majątek przez pokolenia bez podatku od spadków czy darowizn.</p>

<p>To rozwiązanie dla długoterminowych strategii majątkowych, nie dla bieżącej optymalizacji podatkowej – wymaga znacznych aktywów i profesjonalnego doradztwa.</p>

<h2>Praktyczne wskazówki dla rozważających estoński CIT</h2>

<p>Jeśli po lekturze tego artykułu nadal myślisz o estońskim CIT, oto kilka praktycznych rad, które mogą uchronić Cię przed błędami:</p>

<h3>Zrób szczegółowe obliczenia</h3>

<p>Nie decyduj na podstawie ogólnych artykułów czy porad znajomych. Każda firma jest inna. Przygotuj realistyczną projekcję na minimum 5 lat uwzględniającą:</p>

<ul>
<li>Przewidywane zyski i ich podział na reinwestycje vs. wypłaty</li>
<li>Koszty zatrudnienia koniecznego do spełnienia warunku trzech etatów</li>
<li>Strukturę przychodów i jej ewolucję</li>
<li>Porównanie z wariantem klasycznego CIT 9%</li>
</ul>

<p>Jeśli różnica na korzyść estońskiego to mniej niż 20-30 tys. zł rocznie, prawdopodobnie nie warto komplikacji i ryzyka.</p>

<h3>Skonsultuj się z doradcą podatkowym</h3>

<p>Nie oszczędzaj na profesjonalnej pomocy. Dobry doradca podatkowy przeprowadzi Cię przez wszystkie zawiłości, pomoże zaplanować strategię i uniknie kosztownych błędów. Koszt konsultacji (3-5 tys. zł) zwróci się wielokrotnie, jeśli uchroni Cię przed jedną poważną wpadką.</p>

<h3>Przygotuj plan awaryjny</h3>

<p>Co jeśli Twoja sytuacja się zmieni? Klient zrezygnuje, trzeba będzie zwolnić pracowników, przyjedzie kontrola? Przemyśl scenariusze awaryjne i sposób wyjścia z estońskiego CIT bez dramatycznych konsekwencji finansowych. Czasem lepiej nie wchodzić, niż później desperacko szukać rozwiązania.</p>

<h3>Dokumentuj wszystko</h3>

<p>Prowadź szczegółową dokumentację zatrudnienia, przychodów, wydatków i wszelkich decyzji biznesowych. W razie kontroli będziesz musiał udowodnić, że spełniałeś wszystkie warunki. Im lepsza dokumentacja, tym mniejsze ryzyko problemów z fiskusem.</p>

<h2>Podsumowanie – czy warto w 2026 roku?</h2>

<p>Po pięciu latach funkcjonowania estońskiego CIT w Polsce możemy odpowiedzieć jasno: to narzędzie dla świadomych, strategicznie myślących przedsiębiorców prowadzących spółki w fazie wzrostu. Nie jest to łatwa droga do oszczędności dla każdego właściciela sp. z o.o.</p>

<p>Estoński CIT ma sens przede wszystkim dla firm, które:</p>

<ul>
<li>Generują stabilny, rosnący zysk (powyżej 300-400 tys. zł rocznie)</li>
<li>Planują długoterminową reinwestycję większości zysków (minimum 3-5 lat)</li>
<li>Już zatrudniają lub bez problemu zatrudnią trzy osoby na pełen etat</li>
<li>Mają stabilną strukturę przychodów operacyjnych (powyżej 50%)</li>
<li>Nie potrzebują regularnych wypłat na cele prywatne</li>
</ul>

<p>Jeśli Twoja sytuacja nie pasuje do tego profilu – klasyczny CIT 9% prawdopodobnie będzie lepszym, prostszym i bezpieczniejszym rozwiązaniem. Nie daj się zwieść hasłom o "rewolucji podatkowej". Estoński CIT to specjalistyczne narzędzie, nie uniwersalny patent na sukces.</p>

<p>Ostateczną decyzję podejmuj na podstawie twardych liczb, szczegółowych projekcji i profesjonalnego doradztwa. W podatku nie ma miejsca na improwizację – tylko rzetelna analiza i przemyślana strategia przynoszą efekty.</p>

<h2>Jak Nawio pomaga właścicielom sp. z o.o.?</h2>

<p>Prowadzenie spółki z ograniczoną odpowiedzialnością to nie tylko decyzje podatkowe – to dziesiątki terminów korporacyjnych, dokumentów i formalności, o których nie można zapomnieć. Nawio zostało stworzone właśnie po to, żeby odciążyć Cię od administracyjnego bałaganu i pozwolić skupić się na biznesie.</p>

<p>W aplikacji Nawio znajdziesz kalendarz terminów korporacyjnych, który automatycznie przypomni Ci o zbliżającym się Zgromadzeniu Wspólników, konieczności złożenia sprawozdania finansowego czy aktualizacji danych w KRS. System generuje terminy z gotowych szablonów dostosowanych do specyfiki Twojej spółki – nie musisz pamiętać o każdym deadlinie samodzielnie. Na kilka dni przed ważnym terminem dostaniesz e-mail z przypomnieniem, więc żadna formalność Cię nie zaskoczy.</p>

<p>Nawio to także generator dokumentów korporacyjnych – uchwał, protokołów i innych pism tworzonych na podstawie aktualnych danych Twojej spółki. Zamiast szukać wzorów w internecie i ręcznie podstawiać numery KRS czy składy zarządu, generujesz gotowy dokument .docx w kilka sekund. Dodatkowo masz do dyspozycji system zadań z terminami i priorytetami, dzięki któremu nigdy nie zgubisz ważnej sprawy w codziennym natłoku obowiązków. Nawio pokazuje przeterminowane zadania, sortuje je według pilności i pomaga utrzymać porządek w zarządzaniu spółką.</p>

<p>Jeśli prowadzisz kilka spółek jednocześnie, Nawio pozwala zarządzać nimi wszystkimi z jednego miejsca – każda ma osobny profil z własnymi terminami, dokumentami i zadaniami. To szczególnie przydatne dla przedsiębiorców budujących struktury holdingowe lub inwestujących w różne projekty biznesowe.</p>

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
