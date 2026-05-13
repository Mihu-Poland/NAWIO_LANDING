/**
 * [LAN] src/content/blog/zgromadzenie-wspolnikow-sp-z-o-o-kiedy-jak.ts
 * -----------------------------------------------------------------------
 * Artykuł: Zgromadzenie wspólników sp. z o.o. — kiedy i jak zwołać
 *
 * @author Jadźka (Cursor AI persona) + Mihu
 * @updated 2026-05-12
 */

import type { BlogPost } from "@/lib/blog"
import { DISCLAIMER } from "@/content/blog/_disclaimer"

const blogPost: BlogPost = {
  slug: "zgromadzenie-wspolnikow-sp-z-o-o-kiedy-jak",
  title: "Zgromadzenie wspólników sp. z o.o. — kiedy i jak zwołać",
  description:
    "Obowiązek ZZW do 30 czerwca, kto je zwołuje, jak powiadomić wspólników i co musi znaleźć się w protokole. Praktyczny przewodnik.",
  publishedAt: "2026-05-12",
  category: "dokumenty",
  readingTime: 6,
  content: `
<article>
  <h2>Co to jest Zwyczajne Zgromadzenie Wspólników?</h2>
  <p>
    Zwyczajne Zgromadzenie Wspólników (ZZW) to coroczne „wielkie sprzątanie" w dokumentacji
    spółki z o.o. Niezależnie od tego, czy Twoja spółka zarobiła miliony czy ledwo wyszła
    na zero — ZZW jest obowiązkowe. Art. 231 § 1 KSH nie pyta o nastrój ani o to, czy masz czas.
  </p>
  <p>Podczas ZZW wspólnicy podejmują trzy kluczowe uchwały:</p>
  <ul>
    <li>Zatwierdzenie sprawozdania finansowego za poprzedni rok</li>
    <li>Podział zysku lub pokrycie straty</li>
    <li>Udzielenie absolutorium członkom zarządu</li>
  </ul>

  <h2>Termin: do kiedy odbyć ZZW?</h2>
  <p>
    Masz czas do <strong>30 czerwca</strong> każdego roku. ZZW powinno się odbyć
    w ciągu 6 miesięcy od zakończenia roku obrotowego. Dla spółek z rokiem obrotowym
    równym kalendarzowemu termin zawsze upływa 30 czerwca.
  </p>
  <p>
    <strong>Co grozi za przekroczenie terminu?</strong> Sąd rejestrowy może wszcząć
    postępowanie przymuszające, a zarząd naraża się na odpowiedzialność za szkodę.
    Nie ma co testować cierpliwości KRS-u.
  </p>

  <h2>Kto zwołuje Zgromadzenie Wspólników?</h2>
  <p>Co do zasady — <strong>zarząd spółki</strong>. Alternatywy gdy zarząd nie działa:</p>
  <ul>
    <li><strong>Rada nadzorcza lub komisja rewizyjna</strong> — jeśli spółka je posiada</li>
    <li>
      <strong>Wspólnicy reprezentujący co najmniej 1/10 kapitału</strong> — mogą żądać
      zwołania ZZW (art. 236 KSH); jeśli zarząd nie odpowie w 2 tygodnie, sąd może
      ich do tego upoważnić
    </li>
  </ul>

  <h2>Jak powiadomić wspólników?</h2>
  <p>
    Zawiadomienie musi dotrzeć do każdego wspólnika co najmniej
    <strong>2 tygodnie przed datą zgromadzenia</strong>. Forma: list polecony lub kurier.
    Umowa spółki może dopuścić email z potwierdzeniem odbioru.
  </p>
  <p>Zawiadomienie musi zawierać:</p>
  <ol>
    <li>Datę, godzinę i miejsce zgromadzenia</li>
    <li>Szczegółowy porządek obrad</li>
    <li>Ewentualne projekty uchwał</li>
  </ol>

  <h2>Porządek obrad ZZW</h2>
  <ol>
    <li>Otwarcie zgromadzenia</li>
    <li>Wybór przewodniczącego</li>
    <li>Stwierdzenie prawidłowości zwołania i zdolności do podejmowania uchwał</li>
    <li>Rozpatrzenie i zatwierdzenie sprawozdania zarządu</li>
    <li>Rozpatrzenie i zatwierdzenie sprawozdania finansowego</li>
    <li>Uchwała o podziale zysku lub pokryciu straty</li>
    <li>Uchwały o udzieleniu absolutorium członkom zarządu</li>
    <li>Wolne wnioski</li>
    <li>Zamknięcie zgromadzenia</li>
  </ol>

  <h2>Protokół ze zgromadzenia</h2>
  <p>
    Każde zgromadzenie musi być protokołowane. Protokół musi zawierać:
    datę i miejsce, listę obecnych wspólników z liczbą głosów, porządek obrad,
    treść i wyniki głosowania nad każdą uchwałą, sprzeciwy oraz podpisy
    przewodniczącego i protokolanta.
  </p>

  <h2>Jak Nawio pomaga przy ZZW?</h2>
  <p>
    Nawio generuje komplet dokumentów ZZW: zawiadomienie o zgromadzeniu,
    porządek obrad, projekty uchwał i protokół — wszystko w .docx,
    gotowe do wydruku i podpisu. Nie musisz pamiętać, który artykuł KSH
    mówi o czym.
  </p>

  ${DISCLAIMER}
</article>
  `,
}

export default blogPost
