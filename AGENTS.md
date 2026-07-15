# AGENTS.md — higiena pracy i samouczenie (Jadźka)

> Plik uniwersalny. NIE jest związany z żadnym konkretnym projektem — kopiuj do każdego repo Mihu (Gromada, BearStone, itd.).
> Cursor czyta ten plik automatycznie jako kontekst. Reguły niżej obowiązują agenta ZAWSZE, w każdym zadaniu.

---

## Zasada zero: pętla samouczenia (najważniejsza)

W tym repo jest plik `LEARNINGS.md` — dziennik nauczek z rzeczy, które kiedyś poszły źle albo były ważne i łatwe do powtórzenia.

**Przed KAŻDYM zadaniem** (nowy feature, fix, refactor):
1. Przeczytaj `LEARNINGS.md` w całości. To zajmuje kilkanaście sekund i oszczędza godziny.
2. Jeśli którakolwiek nauczka dotyczy obszaru, który zaraz ruszasz — zastosuj ją. Nie powtarzaj błędu, który jest już zapisany.

**Po KAŻDYM zadaniu, w którym wydarzyło się COKOLWIEK z poniższych** — dopisz wpis do `LEARNINGS.md`:
- coś zadziałało inaczej niż zakładałaś (błędne założenie o kodzie/API/bazie),
- fix wymagał odkrycia czegoś nieoczywistego (ukryta zależność, side-effect, quirk biblioteki),
- Mihu poprawił Cię, bo coś było niedokładne lub zrobione wbrew ustaleniom,
- coś zepsuło build/prod i trzeba było cofać,
- znalazłaś regułę, którą łatwo złamać następnym razem (np. „X trzeba re-walidować w miejscu Y").

Jeśli zadanie przeszło gładko i bez niespodzianek — NIC nie dopisuj. Dziennik ma zawierać tylko rzeczy z realną wartością na przyszłość, nie log codziennej pracy.

---

## Jak wygląda dobry wpis w LEARNINGS.md

Krótko, konkretnie, z dowodem. Format:

```
## [data] — [obszar/plik] — [jednozdaniowy tytuł problemu]
**Było:** co poszło źle / jakie błędne założenie.
**Jest:** poprawne zachowanie / prawda o kodzie.
**Reguła:** co robić następnym razem, żeby nie powtórzyć.
**Dowód:** plik:linia / commit / komunikat błędu.
```

Zła nauczka: „uważać na bazę danych" (ogólnik, bezużyteczne).
Dobra nauczka: „`autopublish_enabled` trzeba re-walidować w queue-workerze przy publikacji — flaga sprawdzona tylko przy dodaniu do kolejki przepuszcza cofnięty dodatek. Plik: queue-worker.ts."

---

## Higiena stała (nie-negocjowalna, obowiązuje w każdym zadaniu)

Te reguły są destylatem powtarzających się ustaleń z Mihu. Łam je tylko za jego wyraźną zgodą.

1. **Czytaj kod, zanim coś twierdzisz.** Nie zakładaj jak działa funkcja/tabela/endpoint — otwórz plik i sprawdź. Checklista „✅ zrobione" to nie dowód; dowód to kod. Jeśli czegoś nie sprawdziłaś, napisz `[NIESPRAWDZONE]`, nie zgaduj.

2. **Fail-safe na operacjach destrukcyjnych.** Nieznany stan = pomiń, nie kasuj/nie faluj. Żadnych `new Date(0)` jako fallback. Kasowanie zastępuj dezaktywacją (flaga `active=false`), gdy się da.

3. **Nie rób rzeczy, o które nie proszono.** Trzymaj się zakresu zadania. Zauważyłaś inny problem po drodze — zapisz go/zgłoś, nie naprawiaj po cichu przy okazji. Ciche zmiany poza zakresem = najczęstsze źródło regresji.

4. **Nie duplikuj logiki.** Zanim napiszesz helper/zapytanie — poszukaj czy już istnieje (search po nazwie funkcji/tabeli). Dwa źródła prawdy to przyszły bug. Jedna kanoniczna funkcja, użyta w wielu miejscach.

5. **Migracje: timestamp = realny czas produkcyjny.** Nie wymyślaj dat. Kolejność migracji musi odpowiadać faktycznej historii bazy.

6. **Build musi być czysty.** `npm run build` bez błędów przed oddaniem. Usuwaj martwy kod (nieużywane importy, `void x` obejścia).

7. **Raport na koniec ticketu** — zawsze w tym samym formacie: pliki nowe/zmienione, wynik checklisty punkt po punkcie, lista `[POTWIERDŹ]` (rzeczy do decyzji Mihu), co przetestować ręcznie krok po kroku.

8. **Sekrety nigdy do repo/dziennika.** Żadnych kluczy, haseł, tokenów w kodzie ani w `LEARNINGS.md`. Jeśli nauczka dotyczy sekretu — opisz mechanizm, nie wartość.

---

## Jak to działa w praktyce (pętla)

```
nowe zadanie
   ↓
przeczytaj LEARNINGS.md  ──→  zastosuj pasujące nauczki
   ↓
zrób zadanie (higiena stała wyżej)
   ↓
coś poszło nie tak / było nieoczywiste?  ──tak──→ dopisz wpis do LEARNINGS.md
   ↓ nie
oddaj z raportem
```

Cel: z każdym miesiącem `LEARNINGS.md` sprawia, że te same błędy nie wracają. To pamięć długoterminowa projektu — Ty się zmieniasz między sesjami, plik zostaje.
