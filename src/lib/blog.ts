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
  // ARTYKUŁ 3: e-Doręczenia dla sp. z o.o. — jak założyć
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

  <h2>Jak Nawio pomaga właścicielom sp. z o.o.?</h2>
  <p>
    Nawio to korporacyjny nawigator dla właścicieli sp. z o.o. — pilnuje terminów,
    generuje dokumenty i wysyła e-mail z przypomnieniem, zanim cokolwiek Cię ominie.
    Obowiązek założenia skrzynki e-Doręczeń to jeden z wielu terminów, który warto
    mieć pod kontrolą — obok ZZW, zgłoszeń do KRS i złożenia sprawozdania finansowego.
  </p>
  <p>
    Nawio to nawigator, nie kancelaria. Ale dobry nawigator nie pozwoli Ci przegapić
    skrętu, który kosztuje miesiąc spóźnienia i kilka tysięcy złotych grzywny.
  </p>

  ${DISCLAIMER}
</article>
    `,
  },

  // =========================================================================
  // ARTYKUŁ 4: Terminy KRS 2026
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
  // ARTYKUŁ (auto): Odpowiedzialność członka zarządu sp. z o.o. za długi spółki
  // =========================================================================
  {
    slug: "odpowiedzialnosc-czlonka-zarzadu-sp-z-o-o",
    title: "Odpowiedzialność członka zarządu sp. z o.o. za długi spółki",
    description: "Czy członek zarządu odpowiada za długi sp. z o.o.? Kiedy grozi odpowiedzialność majątkiem prywatnym? Art. 299 KSH, przesłanki, wyłączenia i sposób obrony.",
    publishedAt: "2026-06-01",
    category: "poradnik",
    readingTime: 6,
    content: `
<article>
<h2>Odpowiedzialność członka zarządu — fundament prawa spółek</h2>

<p>Kiedy zakładasz sp. z o.o., jednym z głównych powodów jest chęć oddzielenia swojego majątku prywatnego od ryzyka biznesowego. Spółka z ograniczoną odpowiedzialnością w teorii chroni Twój dom, samochód i konto przed wierzycielami firmy. Ale świat nie jest czarno-biały — istnieje art. 299 Kodeksu spółek handlowych, który mówi, że w określonych sytuacjach członek zarządu może odpowiadać za długi spółki własnym majątkiem.</p>

<p>To nie jest abstrakcyjna groźba. Rocznie tysiące członków zarządu w Polsce dostaje wezwania do zapłaty z art. 299 KSH. Wierzyciele — ZUS, US, dostawcy, banki — szukają osoby fizycznej, która zapłaci za nieściągalne zobowiązania spółki. Dla wielu przedsiębiorców to szok: myśleli, że ich prywatny majątek jest bezpieczny, a nagle komornik puka do drzwi.</p>

<p>W tym artykule wyjaśniamy, kiedy dokładnie członek zarządu odpowiada za długi sp. z o.o., jakie są przesłanki tej odpowiedzialności, kiedy możesz się bronić i jak zminimalizować ryzyko jeszcze zanim pojawią się problemy.</p>

<h2>Art. 299 KSH — podstawa odpowiedzialności członka zarządu</h2>

<p>Artykuł 299 § 1 Kodeksu spółek handlowych brzmi tak: „Jeżeli egzekucja przeciwko spółce okaże się bezskuteczna, członkowie zarządu odpowiadają solidarnie za jej zobowiązania".</p>

<p>Warto to rozbić na części:</p>

<ul>
<li><strong>Egzekucja musi być bezskuteczna</strong> — wierzyciel najpierw próbuje ściągnąć dług od spółki, komornik wydaje postanowienie o bezskuteczności egzekucji (np. „nie ujawniono majątku wystarczającego na zaspokojenie wierzyciela").</li>
<li><strong>Odpowiedzialność jest solidarna</strong> — jeśli w zarządzie było kilka osób, wierzyciel może żądać całości długu od dowolnego z nich. Potem członkowie mogą się między sobą rozliczyć, ale na zewnątrz każdy odpowiada za wszystko.</li>
<li><strong>Dotyczy zobowiązań spółki</strong> — chodzi o długi cywilnoprawne: umowy, faktury, kredyty, zobowiązania wobec ZUS i US, kary umowne, odszkodowania.</li>
</ul>

<p>Kluczowe jest to, że odpowiedzialność członka zarządu nie jest automatyczna. Musisz jako członek zarządu dopuścić się zaniedbania lub zaniechania, które uniemożliwiło wierzycielowi zaspokojenie. Najczęściej chodzi o niezgłoszenie wniosku o upadłość.</p>

<h2>Kiedy członek zarządu odpowiada za długi spółki?</h2>

<p>Odpowiedzialność z art. 299 KSH uruchamia się, gdy spełnione są trzy przesłanki:</p>

<h3>1. Bezskuteczność egzekucji przeciwko spółce</h3>

<p>Wierzyciel najpierw musi uzyskać tytuł wykonawczy przeciwko sp. z o.o. (wyrok sądu, nakaz zapłaty, decyzja administracyjna) i wszcząć egzekucję. Jeśli komornik nie znajdzie majątku wystarczającego na pokrycie długu, wydaje postanowienie o bezskuteczności egzekucji. Dopiero wtedy można celować w zarząd.</p>

<h3>2. Niezłożenie wniosku o ogłoszenie upadłości</h3>

<p>Art. 21 Prawa upadłościowego mówi wyraźnie: zarząd musi złożyć wniosek o ogłoszenie upadłości spółki w ciągu 30 dni od dnia, w którym wystąpiła podstawa do ogłoszenia upadłości. Podstawą jest najczęściej niewypłacalność — spółka nie płaci długów w terminie przekraczającym trzy miesiące albo zobowiązania przekroczyły wartość majątku (bilansowa niewypłacalność).</p>

<p>Jeśli zarząd tego nie zrobi, wierzyciel może twierdzić, że to zaniedbanie uniemożliwiło mu dochodzenie swoich praw. Kluczowa jest data powstania niewypłacalności i moment, kiedy zarząd powinien był zareagować.</p>

<h3>3. Wina lub zaniedbanie członka zarządu</h3>

<p>Kodeks spółek handlowych zakłada domniemanie winy. To znaczy, że to nie wierzyciel musi udowadniać, że działałeś nieprawidłowo — to Ty jako członek zarządu musisz wykazać, że postąpiłeś zgodnie z prawem i dołożyłeś należytej staranności. To poważne obciążenie procesowe.</p>

<h2>Zobowiązania, za które członek zarządu może odpowiadać</h2>

<p>Odpowiedzialność z art. 299 KSH obejmuje wszystkie zobowiązania spółki, nie tylko te powstałe w czasie Twojego pełnienia funkcji. Obejmuje to:</p>

<ul>
<li><strong>Zobowiązania wobec kontrahentów</strong> — nieopłacone faktury, należności handlowe, kary umowne.</li>
<li><strong>Zobowiązania podatkowe</strong> — zaległości w CIT, VAT, PIT od pracowników (jeśli spółka nie odprowadzała zaliczek).</li>
<li><strong>Zobowiązania wobec ZUS</strong> — składki zdrowotne i społeczne, odsetki, koszty egzekucyjne.</li>
<li><strong>Zobowiązania kredytowe</strong> — niespłacone kredyty i pożyczki (o ile nie masz osobnego poręczenia, które i tak cię wiąże niezależnie od art. 299).</li>
<li><strong>Odszkodowania</strong> — np. za szkody wyrządzone przez spółkę w wykonaniu umowy lub z czynu niedozwolonego.</li>
</ul>

<p>Nie chodzi tylko o długi powstałe „na Twojej zmianie". Jeśli objąłeś funkcję w zarządzie w momencie, gdy spółka już była niewypłacalna, i nie złożyłeś wniosku o upadłość, możesz odpowiadać za zobowiązania sprzed Twojego czasu.</p>

<h2>Kiedy członek zarządu NIE odpowiada? — przesłanki egzoneracyjne</h2>

<p>Kodeks spółek handlowych daje kilka możliwości obrony. Nie odpowiadasz za długi spółki, jeśli udowodnisz, że:</p>

<h3>1. Złożono wniosek o ogłoszenie upadłości na czas</h3>

<p>Jeśli wniosek o upadłość został zgłoszony w terminie 30 dni od powstania niewypłacalności, nie możesz ponosić odpowiedzialności z art. 299 KSH. Istotne jest dokumentowanie momentu, kiedy zorientowałeś się o problemach finansowych spółki.</p>

<h3>2. Niezłożenie wniosku nastąpiło bez Twojej winy</h3>

<p>Może się zdarzyć, że nie byłeś w stanie ocenić sytuacji finansowej spółki — np. główny księgowy ukrywał prawdziwy stan rzeczy, a Ty działałeś w dobrej wierze. Musisz jednak wykazać, że dochowałeś staranności w nadzorowaniu finansów.</p>

<h3>3. Wierzyciel i tak nie zostałby zaspokojony</h3>

<p>Jeśli potrafisz udowodnić, że nawet przy terminowym złożeniu wniosku o upadłość masa upadłości nie wystarczyłaby na zaspokojenie wierzyciela, możesz uniknąć odpowiedzialności. To trudne do wykazania, bo wymaga szczegółowej analizy stanu majątku w danym momencie.</p>

<h3>4. Nie byłeś członkiem zarządu w krytycznym okresie</h3>

<p>Jeśli ustąpiłeś z zarządu przed powstaniem zobowiązania lub przed momentem, gdy należało zgłosić upadłość, nie odpowiadasz za to, co stało się później. Istotne jest jednak, czy nie złożyłeś rezygnacji „na papierze", podczas gdy faktycznie nadal kierowałeś spółką.</p>

<h2>Jak wygląda proces dochodzenia odpowiedzialności?</h2>

<p>Procedura wygląda mniej więcej tak:</p>

<ol>
<li><strong>Wierzyciel uzyskuje tytuł wykonawczy przeciwko spółce</strong> — wyrok, nakaz zapłaty, decyzję administracyjną.</li>
<li><strong>Wierzyciel kieruje sprawę do komornika</strong> — wszczyna egzekucję wobec sp. z o.o.</li>
<li><strong>Komornik wydaje postanowienie o bezskuteczności egzekucji</strong> — nie ma majątku do zajęcia.</li>
<li><strong>Wierzyciel pozywa członka zarządu</strong> — składa pozew na podstawie art. 299 KSH do sądu właściwego według miejsca zamieszkania pozwanego.</li>
<li><strong>Sąd bada przesłanki odpowiedzialności</strong> — czy egzekucja była bezskuteczna, czy nie złożono wniosku o upadłość, czy członek zarządu wykazał brak winy.</li>
<li><strong>Wyrok zasądzający lub oddalający powództwo</strong> — jeśli sąd przyzna rację wierzycielowi, członek zarządu zostaje zobowiązany do zapłaty z własnego majątku.</li>
</ol>

<p>Postępowanie może trwać od kilku miesięcy do kilku lat. W tym czasie możesz negocjować z wierzycielem ugodę, próbować udowodnić, że dochowałeś staranności, albo wykazać przesłanki egzoneracyjne.</p>

<h2>Odpowiedzialność karna członka zarządu — osobna sprawa</h2>

<p>Oprócz odpowiedzialności cywilnej z art. 299 KSH istnieje także odpowiedzialność karna. Dotyczy ona sytuacji, gdy członek zarządu dopuścił się przestępstwa:</p>

<ul>
<li><strong>Art. 586 Kodeksu spółek handlowych</strong> — niezłożenie wniosku o upadłość w terminie (kara grzywny, ograniczenia wolności lub do 2 lat pozbawienia wolności).</li>
<li><strong>Art. 587 KSH</strong> — działanie na szkodę wierzycieli (np. wyprowadzanie majątku spółki, ukrywanie dokumentów).</li>
<li><strong>Kodeks karny skarbowy</strong> — jeśli dług dotyczy zobowiązań podatkowych lub składek ZUS, możliwe jest postępowanie karne skarbowe.</li>
</ul>

<p>Odpowiedzialność karna nie zwalnia z odpowiedzialności cywilnej — są to dwa oddzielne tory. Możesz zostać skazany za niezłożenie wniosku o upadłość i równolegle odpowiadać majątkiem za zobowiązania spółki.</p>

<h2>Jak się zabezpieczyć jako członek zarządu?</h2>

<p>Lepiej dmuchać na zimne niż potem gasić pożar. Oto kilka praktycznych rad, które pomogą zminimalizować ryzyko odpowiedzialności:</p>

<h3>Monitoruj na bieżąco sytuację finansową spółki</h3>

<p>Nie czekaj do końca roku z analizą bilansu. Przeglądaj regularne raporty finansowe, sprawdzaj płynność, kontroluj terminowość płatności wobec kontrahentów, ZUS i US. Jeśli widzisz, że spółka zaczyna opóźniać się z płatnościami o więcej niż kilka tygodni, to poważny sygnał ostrzegawczy.</p>

<h3>Dokumentuj decyzje zarządu</h3>

<p>Protokołuj posiedzenia zarządu, uchwały o podjęciu działań naprawczych, korespondencję z księgowym i doradcą prawnym. W sporze sądowym będziesz musiał wykazać, że działałeś z należytą starannością — a bez dokumentów to trudne.</p>

<h3>Konsultuj się z prawnikiem i doradcą podatkowym</h3>

<p>Jeśli spółka ma problemy finansowe, nie czekaj do momentu, gdy będzie już za późno. Wczesna rozmowa z doradcą pomoże ocenić, czy grozi niewypłacalność i kiedy złożyć wniosek o upadłość lub restrukturyzację.</p>

<h3>Rozważ ubezpieczenie odpowiedzialności zarządu (D&O)</h3>

<p>Polisa D&O (Directors and Officers Liability Insurance) pokrywa koszty obrony przed roszczeniami wierzycieli oraz ewentualne odszkodowania. To szczególnie przydatne, jeśli zarządzasz spółką o większych obrotach lub w branży wysokiego ryzyka.</p>

<h3>W razie niewypłacalności — działaj natychmiast</h3>

<p>Jeśli spółka nie ma środków na bieżące zobowiązania dłużej niż trzy miesiące, nie czekaj. Złóż wniosek o ogłoszenie upadłości lub o otwarcie postępowania restrukturyzacyjnego (sanacyjnego, przyspieszonego układowego). Termin to 30 dni — każdy dzień zwłoki zwiększa ryzyko osobistej odpowiedzialności.</p>

<h2>Co zrobić, gdy dostajesz wezwanie z art. 299 KSH?</h2>

<p>Jeśli już otrzymałeś wezwanie do zapłaty lub pozew, nie panikuj. Masz możliwości obrony:</p>

<ul>
<li><strong>Sprawdź, czy egzekucja była faktycznie bezskuteczna</strong> — czy komornik dokładnie przeszukał majątek spółki, czy postępowanie przebiegło prawidłowo.</li>
<li><strong>Przeanalizuj terminy</strong> — kiedy powstała niewypłacalność, kiedy byłeś członkiem zarządu, czy złożono wniosek o upadłość na czas.</li>
<li><strong>Zbierz dokumentację</strong> — protokoły z posiedzeń zarządu, raporty finansowe, korespondencję mailową, decyzje wspólników.</li>
<li><strong>Zatrudnij prawnika specjalizującego się w prawie upadłościowym i odpowiedzialności zarządu</strong> — to nie jest obszar do samodzielnych prób.</li>
<li><strong>Rozważ ugodę z wierzycielem</strong> — czasem lepiej negocjować spłatę na raty niż ryzykować wyrok zasądzający pełną kwotę plus odsetki i koszty procesu.</li>
</ul>

<p>Pamiętaj, że ciężar dowodu w dużej mierze spoczywa na Tobie — musisz wykazać, że działałeś zgodnie z prawem i dochowałeś staranności. Bez solidnej dokumentacji i wsparcia prawnika to bardzo trudne zadanie.</p>

<h2>Odpowiedzialność solidarna — co to znaczy w praktyce?</h2>

<p>Jeśli w zarządzie było kilka osób, wierzyciel może pozwać dowolnego członka zarządu o całość długu. Załóżmy, że spółka ma zobowiązanie 200 tys. zł, a w zarządzie było trzech członków. Wierzyciel może skierować pozew przeciwko jednemu z was o całe 200 tys. zł.</p>

<p>Następnie ten, kto zapłacił, może żądać zwrotu udziału od pozostałych członków zarządu (tzw. regres). Ale to już wewnętrzna sprawa między byłymi członkami zarządu. Dla wierzyciela liczy się, że może wybrać osobę najłatwiejszą do sięgnięcia — np. tę, która ma widoczny majątek.</p>

<h2>Jak Nawio pomaga właścicielom sp. z o.o.?</h2>

<p>Zarządzanie sp. z o.o. to nie tylko podejmowanie decyzji biznesowych, ale także pilnowanie terminów korporacyjnych, które mogą mieć wpływ na Twoją odpowiedzialność. Nawio to aplikacja stworzona z myślą o właścicielach i zarządach spółek z ograniczoną odpowiedzialnością, która pomaga utrzymać porządek w formalnych obowiązkach.</p>

<p>W Nawio możesz zarządzać kalendarzem terminów korporacyjnych — od zgromadzeń wspólników, przez terminy złożenia sprawozdania finansowego, aż po zmiany w KRS. Aplikacja automatycznie generuje terminy z szablonów i wysyła przypomnienia e-mail na kilka dni przed upływem deadlinu, więc nie przegapisz ważnej daty. To szczególnie istotne w kontekście odpowiedzialności zarządu — terminowe składanie dokumentów, protokołowanie uchwał i dbanie o prawidłową komunikację ze wspólnikami może być później kluczowym dowodem dochowania należytej staranności.</p>

<p>Nawio umożliwia także generowanie dokumentów korporacyjnych w formacie .docx — możesz tworzyć uchwały, protokoły ze zgromadzeń wspólników czy innych dokumentów na podstawie danych Twojej spółki. Wszystko odbywa się w jednym miejscu: profile spółek (KRS, NIP, adres, skład zarządu i wspólników), zadania z terminami i priorytetami, oraz asystent AI działający w kontekście aktywnej spółki. Nawio to narzędzie, które pozwala właścicielom sp. z o.o. zachować kontrolę nad formalnościami i zminimalizować ryzyko związane z opóźnieniami czy błędami w dokumentacji.</p>

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
