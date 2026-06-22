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
  // ARTYKUŁ (auto): CIT estoński sp. z o.o. – czy warto w 2026? Przewodnik
  // =========================================================================
  {
    slug: "cit-estonski-sp-z-o-o-czy-warto-2026",
    title: "CIT estoński sp. z o.o. – czy warto w 2026? Przewodnik",
    description: "CIT estoński w 2026 roku – sprawdź, czy opłaca się przejść na ryczałt od dochodów spółek. Warunki, stawki 10% i 20%, korzyści i pułapki dla sp. z o.o.",
    publishedAt: "2026-06-22",
    category: "podatki",
    readingTime: 6,
    content: `
<article>
<h2>Czym jest CIT estoński i dlaczego przyciąga właścicieli spółek?</h2>

<p>CIT estoński, oficjalnie nazywany ryczałtem od dochodów spółek kapitałowych, to system opodatkowania, który odwraca tradycyjną logikę płacenia podatku dochodowego. Zamiast odprowadzać CIT co roku od zysku księgowego, spółka płaci podatek dopiero w momencie wypłaty dywidendy, ukrytego zysku lub innych świadczeń na rzecz wspólników. W praktyce oznacza to, że jeśli reinwestujesz zysk w firmę i nie wypłacasz pieniędzy wspólnikom – nie płacisz CIT-u.</p>

<p>Ten model trafił do polskiego systemu podatkowego w 2021 roku i szybko zdobył uznanie wśród właścicieli spółek z o.o., którzy planują rozwój biznesu i długoterminowe inwestycje. W 2026 roku CIT estoński pozostaje atrakcyjną opcją, choć wymaga spełnienia określonych warunków i nie dla każdej firmy będzie optymalny.</p>

<p>Główną zaletą estońskiego CIT-u jest płynność finansowa – środki, które zwykle trafiłyby do urzędu skarbowego jako zaliczki na podatek, pozostają w spółce i mogą być wykorzystane do zakupu sprzętu, zatrudnienia pracowników, ekspansji na nowe rynki czy zwiększenia obrotów. To szczególnie istotne dla młodych, rozwijających się firm, które potrzebują kapitału na wzrost.</p>

<h2>Kto może przejść na CIT estoński w 2026 roku?</h2>

<p>Nie każda spółka z o.o. spełni wymogi formalne. Ustawa o CIT przewiduje konkretne warunki, które należy dopełnić przed złożeniem zawiadomienia ZUS-RCA:</p>

<h3>Warunki dotyczące przychodów</h3>

<p>Przychody spółki w roku poprzedzającym rok podatkowy nie mogą przekroczyć równowartości 100 milionów złotych. To oznacza, że jeśli planujesz przejść na CIT estoński od 1 stycznia 2026 roku, przychody w 2025 muszą zmieścić się w tym limicie. Warto pamiętać, że chodzi o przychody w rozumieniu podatkowym, a nie zysk – dla większości małych i średnich firm ten próg nie stanowi przeszkody.</p>

<h3>Warunki dotyczące struktury właścicielskiej</h3>

<p>Estoński CIT jest zarezerwowany dla spółek posiadających osobowość prawną, czyli sp. z o.o., a także prostych spółek akcyjnych. Co ważne:</p>

<ul>
<li>Wspólnicy będący osobami fizycznymi muszą posiadać łącznie co najmniej 50% udziałów</li>
<li>Spółka nie może być częścią międzynarodowej grupy podatkowej</li>
<li>Nie mogą istnieć powiązania kapitałowe z innymi podmiotami powyżej 5%</li>
<li>Spółka nie może posiadać udziałów w innych podmiotach (z nielicznymi wyjątkami)</li>
</ul>

<h3>Warunki dotyczące działalności operacyjnej</h3>

<p>Przychody pasywne (np. z dywidend, odsetek, praw autorskich czy najmu) nie mogą stanowić więcej niż 50% wszystkich przychodów. Jeśli Twoja spółka prowadzi aktywną działalność gospodarczą – produkcję, handel, usługi – ten warunek powinieneś spełnić bez problemu.</p>

<h3>Warunki formalne</h3>

<p>Musisz złożyć zawiadomienie ZUS-RCA o wyborze ryczałtu od dochodów spółek do końca pierwszego miesiąca roku podatkowego (dla roku kalendarzowego: do 31 stycznia 2026 roku). Jeśli prowadzisz spółkę od lat, nie możesz być zalega z podatkami ani składkami ZUS.</p>

<h2>Stawki CIT estońskiego: 10% czy 20%?</h2>

<p>CIT estoński występuje w dwóch wariantach stawki – 10% i 20%. Wybór zależy od tego, czy spełnisz dodatkowe wymogi związane z zatrudnieniem i płacami.</p>

<h3>Preferencyjna stawka 10%</h3>

<p>Stawkę 10% otrzymasz, jeśli spełnisz co najmniej jeden z poniższych warunków:</p>

<ul>
<li>Przeciętne roczne zatrudnienie (w przeliczeniu na pełne etaty) wynosi minimum 3 osoby</li>
<li>Koszty działalności badawczo-rozwojowej stanowią co najmniej 2% kosztów uzyskania przychodów</li>
</ul>

<p>W praktyce najczęściej stosowany jest warunek zatrudnienia. Uwaga: właściciel zatrudniony na umowę o pracę w swojej spółce również wlicza się do tego limitu, o ile wypłacane mu wynagrodzenie nie jest niższe niż 2-krotność minimalnego wynagrodzenia. W 2026 roku to około 8 400 złotych brutto miesięcznie.</p>

<p>Jeśli nie masz trzech etatów, ale regularnie inwestujesz w rozwój produktu, oprogramowania czy nowe technologie – możesz skorzystać z warunku B+R. Musisz jednak prowadzić szczegółową ewidencję kosztów i udokumentować ich charakter badawczo-rozwojowy.</p>

<h3>Podstawowa stawka 20%</h3>

<p>Jeśli nie spełniasz żadnego z warunków na 10%, automatycznie stosujesz stawkę 20%. To wciąż może być opłacalne, jeśli planujesz reinwestować większość zysku przez kilka lat. W klasycznym CIT płaciłbyś 19% co roku od zysku księgowego – w estońskim CIT odraczasz podatek do momentu wypłaty, nawet jeśli finalnie zapłacisz 20%.</p>

<h2>Jak działa opodatkowanie w praktyce?</h2>

<p>CIT estoński zmienia moment, w którym płacisz podatek, nie kwotę, która ostatecznie trafi do budżetu. Oto najważniejsze zasady:</p>

<h3>Wypłata dywidendy</h3>

<p>Kiedy wypłacasz dywidendę wspólnikom, musisz odprowadzić CIT estoński. Podstawą opodatkowania jest kwota wypłaconej dywidendy powiększona o należny podatek (tzw. gross-up). W praktyce obliczenie wygląda tak:</p>

<ul>
<li>Stawka 10%: podatek = dywidenda netto × 10/90</li>
<li>Stawka 20%: podatek = dywidenda netto × 20/80</li>
</ul>

<p>Jeśli wypłacasz 90 000 złotych dywidendy przy stawce 10%, spółka odprowadzi dodatkowo 10 000 złotych CIT-u (90 000 × 10/90). Łączny koszt dla spółki: 100 000 złotych.</p>

<h3>Ukryty zysk</h3>

<p>Przepisy mają zabezpieczenie przed omijaniem opodatkowania poprzez wypłatę środków w inny sposób niż dywidenda. Do ukrytego zysku należą np.:</p>

<ul>
<li>Świadczenia nieodpłatne lub częściowo odpłatne na rzecz wspólników</li>
<li>Nadmierne wynagrodzenia członków zarządu będących wspólnikami</li>
<li>Nierynkowe ceny transferowe w transakcjach z podmiotami powiązanymi</li>
<li>Darowizny przekraczające 10% zysku netto z poprzedniego roku</li>
</ul>

<p>Ukryty zysk jest opodatkowany na takich samych zasadach jak dywidenda.</p>

<h3>Dochód zachowany</h3>

<p>Reinwestowany zysk pozostaje w spółce bez podatku. To kluczowa zaleta CIT estońskiego. Możesz:</p>

<ul>
<li>Kupować środki trwałe (maszyny, samochody, nieruchomości)</li>
<li>Zwiększać zapasy towarowe</li>
<li>Zatrudniać nowych pracowników</li>
<li>Inwestować w marketing i rozwój produktu</li>
<li>Budować rezerwy finansowe na czarne scenariusze</li>
</ul>

<p>Dopóki pieniądze pracują w firmie, urząd skarbowy nie żąda podatku.</p>

<h2>Korzyści z CIT estońskiego w 2026 roku</h2>

<h3>Lepsza płynność finansowa</h3>

<p>Brak konieczności płacenia zaliczek miesięcznych lub kwartalnych oznacza, że więcej środków pozostaje w spółce. Klasyczny CIT wymaga regularnych wpłat do urzędu skarbowego, nawet jeśli pieniądze są potrzebne na bieżącą działalność. W estońskim CIT wszystko zostaje w firmie.</p>

<h3>Prostota rozliczeń</h3>

<p>Nie musisz obliczać zaliczek ani martwić się różnicami między podatkiem bieżącym a odroczonym. Składasz jedno roczne zeznanie CIT-8E, w którym wykazujesz wypłacone dywidendy i inne zdarzenia podlegające opodatkowaniu. Mniej biurokracji, mniej stresu.</p>

<h3>Łatwiejsze planowanie inwestycji</h3>

<p>Kiedy wiesz, że zysk pozostanie w spółce, możesz lepiej planować większe zakupy czy ekspansję. Nie musisz rezerwować środków na zaliczki podatkowe – liczy się realny zysk operacyjny.</p>

<h3>Niższa efektywna stawka podatku przy długoterminowym rozwoju</h3>

<p>Jeśli przez kilka lat reinwestujesz całość zysku, zyskujesz efekt odroczenia podatku. Pieniądze, które w klasycznym CIT trafiłyby do fiskusa, pracują w firmie i generują kolejne przychody. To się kumuluje w czasie.</p>

<h2>Pułapki i ryzyka CIT estońskiego</h2>

<h3>Wymóg stabilnego zatrudnienia</h3>

<p>Jeśli chcesz stawkę 10%, musisz zatrudniać co najmniej 3 osoby (w przeliczeniu na etaty) przez cały rok podatkowy. Utrata kluczowego pracownika w grudniu może oznaczać przeskok na stawkę 20%, co wpłynie na wypłatę dywidendy za cały rok. To wymusza dyscyplinę kadrową.</p>

<h3>Ukryty zysk jako źródło sporów z fiskusem</h3>

<p>Definicja ukrytego zysku jest szeroka i czasem niejednoznaczna. Urząd skarbowy może zakwestionować nierynkowe wynagrodzenie wspólnika-prezesa, prywatne wykorzystanie samochodu służbowego czy zbyt niskie czynsz od wynajmu biura w nieruchomości należącej do wspólnika. Każde takie świadczenie może skutkować dogrywką CIT.</p>

<h3>Brak możliwości odliczenia strat z lat poprzednich</h3>

<p>Jeśli w latach poprzedzających przejście na CIT estoński spółka miała stratę, nie możesz jej odliczyć. W klasycznym CIT strata zmniejszałaby podstawę opodatkowania przez najbliższe lata – w estońskim ten mechanizm nie działa.</p>

<h3>Exit tax przy odejściu z ryczałtu</h3>

<p>Jeśli zrezygnujesz z CIT estońskiego, musisz rozliczyć cały dochód zgromadzony w okresie stosowania ryczałtu, który nie był dotychczas opodatkowany. To tzw. opodatkowanie dochodu osiągniętego. W praktyce może to być bolesny jednorazowy wydatek, jeśli przez lata budowałeś znaczne rezerwy.</p>

<h3>Wymóg ciągłości prowadzenia pełnej księgowości</h3>

<p>CIT estoński nie zwalnia z obowiązku prowadzenia ksiąg rachunkowych zgodnie z ustawą o rachunkowości. Wymaga to zaangażowania biura rachunkowego i wyższych kosztów w porównaniu do np. księgi przychodów i rozchodów.</p>

<h2>CIT estoński kontra klasyczny CIT – dla kogo co?</h2>

<h3>CIT estoński jest dobry, jeśli:</h3>

<ul>
<li>Planujesz reinwestować większość zysku przez co najmniej 2–3 lata</li>
<li>Zatrudniasz minimum 3 osoby lub prowadzisz działalność B+R</li>
<li>Spółka generuje stabilne przychody z aktywnej działalności (nie z najmu czy dywidend)</li>
<li>Nie potrzebujesz regularnych wypłat dywidendy na bieżące wydatki prywatne</li>
<li>Chcesz prostszych rozliczeń bez comiesięcznych zaliczek</li>
</ul>

<h3>Klasyczny CIT jest lepszy, jeśli:</h3>

<ul>
<li>Regularnie wypłacasz sobie dywidendę na życie prywatne</li>
<li>Nie zatrudniasz minimalnej liczby osób i nie inwestujesz w B+R</li>
<li>Znaczną część przychodów stanowią przychody pasywne</li>
<li>Masz straty z lat poprzednich, które chcesz odliczyć</li>
<li>Spółka generuje stabilny, umiarkowany zysk bez planów dużej ekspansji</li>
</ul>

<h2>Jak przejść na CIT estoński w 2026 roku – krok po kroku</h2>

<h3>Krok 1: Weryfikacja warunków formalnych</h3>

<p>Sprawdź, czy Twoja spółka spełnia wszystkie wymogi dotyczące przychodów, struktury właścicielskiej, działalności pasywnej i powiązań kapitałowych. Warto zrobić to z pomocą doradcy podatkowego, zwłaszcza jeśli struktura spółki jest złożona.</p>

<h3>Krok 2: Analiza opłacalności</h3>

<p>Zrób symulację porównującą CIT klasyczny i estoński na najbliższe 3–5 lat. Uwzględnij planowane inwestycje, wypłaty dywidendy, zmiany w zatrudnieniu i przychody. Dobry księgowy przygotuje taki rachunek w kilka godzin.</p>

<h3>Krok 3: Złożenie zawiadomienia ZUS-RCA</h3>

<p>Jeśli decyzja jest pozytywna, złóż zawiadomienie ZUS-RCA elektronicznie przez system PUE ZUS. Termin: do końca pierwszego miesiąca roku podatkowego (31 stycznia 2026 roku dla roku kalendarzowego). Bez tego dokumentu nie przejdziesz na ryczałt.</p>

<h3>Krok 4: Bieżące monitorowanie warunków</h3>

<p>Przez cały rok sprawdzaj, czy zatrudnienie nie spadło poniżej 3 osób (jeśli korzystasz ze stawki 10%), czy przychody pasywne nie przekroczyły 50% i czy nie pojawiły się niedozwolone powiązania kapitałowe. Te warunki muszą być spełnione nieprzerwanie.</p>

<h3>Krok 5: Rozliczenie roczne w CIT-8E</h3>

<p>Do końca trzeciego miesiąca po zakończeniu roku podatkowego (31 marca 2027 dla roku 2026) składasz zeznanie CIT-8E. Wykazujesz w nim wypłacone dywidendy, ukryty zysk i obliczony podatek. Jeśli nic nie wypłacałeś – zerowe zeznanie.</p>

<h2>Najczęstsze pytania dotyczące CIT estońskiego</h2>

<h3>Czy mogę przejść na CIT estoński w trakcie roku?</h3>

<p>Nie. Zmiana na ryczałt od dochodów spółek jest możliwa wyłącznie od początku roku podatkowego. Jeśli prowadzisz spółkę kalendarzowo, musisz złożyć zawiadomienie ZUS-RCA do 31 stycznia.</p>

<h3>Czy mogę łączyć CIT estoński z ulgami podatkowymi?</h3>

<p>Nie. Spółka stosująca ryczałt nie może korzystać z ulg na B+R, ulgi na prototyp, ulgi na robotyzację ani innych preferencji przewidzianych w klasycznym CIT. To jedna z cen za prostotę rozliczeń.</p>

<h3>Co się stanie, jeśli w trakcie roku przestanę spełniać warunki?</h3>

<p>Spółka automatycznie wraca do klasycznego CIT od początku roku podatkowego, w którym naruszono warunek. Oznacza to konieczność złożenia korekty zeznania i dopłaty zaległych zaliczek wraz z odsetkami. To bolesna sytuacja, której warto unikać przez bieżący monitoring.</p>

<h3>Czy CIT estoński eliminuje PIT od dywidendy?</h3>

<p>Nie. Wspólnik będący osobą fizyczną po otrzymaniu dywidendy musi dodatkowo zapłacić 19% PIT (z możliwością zastosowania zwolnienia do 8 000 złotych rocznie na ogólnych zasadach). CIT estoński dotyczy tylko opodatkowania na poziomie spółki.</p>

<h3>Czy mogę rezygnować i wracać do estońskiego CIT-u dowolnie?</h3>

<p>Nie. Po rezygnacji z ryczałtu musisz odczekać co najmniej 3 lata, zanim ponownie złożysz zawiadomienie ZUS-RCA. To zabezpieczenie przed nadużyciami polegającymi na skokowym przechodzeniu między systemami w zależności od bieżącej sytuacji finansowej.</p>

<h2>CIT estoński w 2026 roku – podsumowanie</h2>

<p>CIT estoński to potężne narzędzie optymalizacji podatkowej dla właścicieli spółek z o.o., którzy myślą o długoterminowym rozwoju firmy, a nie o bieżących wypłatach dla siebie. Jeśli zatrudniasz co najmniej 3 osoby, reinwestujesz zysk w sprzęt, technologię czy zwiększanie zatrudnienia i nie potrzebujesz regularnej dywidendy – przejście na ryczałt może dać Ci realną przewagę finansową i operacyjną.</p>

<p>Z drugiej strony estoński CIT to nie jest uniwersalny przepis na sukces. Wymaga stabilności zatrudnienia, dyscypliny w unikaniu ukrytego zysku, rezygnacji z ulg podatkowych i zaakceptowania exit taxu w momencie ewentualnego wyjścia z systemu. To nie jest decyzja, którą podejmujesz spontanicznie – wymaga dokładnej analizy Twojej sytuacji biznesowej i planów na najbliższe lata.</p>

<p>Warto pamiętać, że od 2021 roku, gdy CIT estoński wszedł do polskiego prawa, ustawa nie przeszła istotnych zmian. Przepisy są stabilne, interpretacje fiskusa coraz bardziej przewidywalne, a liczba spółek korzystających z ryczałtu stale rośnie. To dobry moment, by rozważyć tę opcję – zwłaszcza jeśli do tej pory odkładałeś decyzję z obawy przed nieznanym.</p>

<p>Jeśli rozważasz przejście na CIT estoński w 2026 roku, najlepiej zrób to z pomocą doświadczonego biura rachunkowego lub doradcy podatkowego. Poprawne przygotowanie zawiadomienia ZUS-RCA, weryfikacja wszystkich warunków i zaplanowanie strategii wypłat to klucz do bezpiecznego i opłacalnego korzystania z ryczałtu od dochodów spółek.</p>

<h2>Jak Nawio pomaga właścicielom sp. z o.o.?</h2>

<p>Prowadzenie spółki z o.o. to nie tylko kwestie podatkowe – to również terminowe wypełnianie obowiązków korporacyjnych, pamiętanie o zgromadzeniach wspólników, zmianach w KRS czy składaniu sprawozdań finansowych. Nawio to aplikacja stworzona właśnie po to, by ułatwić Ci tę codzienną pracę i uchronić przed karami czy opóźnieniami.</p>

<p>W Nawio zarządzasz kalendarzem korporacyjnym całej spółki w jednym miejscu – aplikacja przypomni Ci o zbliżającym się terminie złożenia sprawozdania finansowego, zwołania Zwyczajnego Zgromadzenia Wspólników, czy zmiany danych w KRS. Automatyczne przypomnienia e-mail docierają na kilka dni przed deadlinem, dzięki czemu nigdy nie przegapisz istotnego obowiązku. To szczególnie ważne, jeśli prowadzisz kilka spółek równolegle – każda z nich ma osobny profil z datami, numerami KRS, NIP i listą wspólników.</p>

<p>Kolejna funkcja, która oszczędza czas, to generator dokumentów korporacyjnych. Zamiast szukać wzorów w internecie i ręcznie uzupełniać dane spółki, w Nawio tworzysz uchwały, protokoły i inne dokumenty w formacie .docx na podstawie danych, które już wprowadziłeś do systemu. Kilka kliknięć i masz gotowy dokument zgodny z Kodeksem spółek handlowych, gotowy do podpisu i ewentualnego złożenia w KRS.</p>

<h2>Czego potrzebujesz do skutecznego zarządzania spółką?</h2>

<p>Nawio to narzędzie dla ludzi, którzy cenią sobie porządek i chcą mieć kontrolę nad terminami. Lista zadań z priorytetami i oznaczeniami przeterminowania pozwala Ci na bieżąco śledzić, co wymaga uwagi – czy to zapis w ewidencji wspólników, czy przygotowanie dokumentacji na Nadzwyczajne Zgromadzenie Wspólników. Dashboard wyświetla wszystko w jednym widoku, a statystyki pokazują, ile spółek obsługujesz i jakie zadania czekają w kolejce.</p>

<p>Jeśli potrzebujesz szybkiej odpowiedzi na pytanie związane z prowadzeniem spółki, możesz skorzystać z asystenta AI – funkcja w budowie, ale już teraz umożliwia zadawanie pytań w kontekście aktywnej spółki. To przydatne, gdy potrzebujesz błyskawicznej podpowiedzi bez konieczności dzwonienia do prawnika czy księgowego.</p>

<p>Nawio nie składa dokumentów online ani nie integruje się bezpośrednio z KRS czy ZUS – to wciąż wymaga Twojego zaangażowania. Natomiast dba o to, byś pamiętał o terminach, miał pod ręką aktualne dane spółki i mógł w kilka minut wygenerować potrzebny dokument. To aplikacja dla właścicieli, którzy chcą być o krok przed obowiązkami, a nie gonić je w ostatniej chwili.</p>

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
