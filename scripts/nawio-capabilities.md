# Nawio — aktualne możliwości aplikacji

Ten plik jest źródłem prawdy dla skryptu `generate-blog-post.mjs`.
Aktualizuj go gdy wdrożysz nową funkcję.

## Co Nawio POTRAFI (wdrożone):

- **Zarządzanie wieloma spółkami** — dodawanie spółek z o.o., profil spółki (KRS, NIP, adres, zarząd, wspólnicy)
- **Kalendarz terminów korporacyjnych** — lista terminów (ZZW, złożenie SF, zmiany KRS, inne), generowanie z szablonów deadlines
- **Przypomnienia e-mail** — automatyczny e-mail na X dni przed terminem (cron codziennie o 8:00), konfigurowalny per-zdarzenie
- **Generator dokumentów .docx** — tworzenie uchwał, protokołów i innych dokumentów na podstawie danych spółki
- **Zarządzanie zadaniami** — lista zadań z terminami, priorytetami i oznaczeniami przeterminowania
- **Asystent AI** — czat z AI w kontekście aktywnej spółki (moduł w budowie)
- **Dashboard** — widok główny z widgetem zadań, kartą powitalną, statystykami spółek

## Czego Nawio NIE POTRAFI (jeszcze — potencjalny backlog):

- Integracja z KRS / gov.pl (brak bezpośrednich linków do formularzy rządowych)
- e-Doręczenia (brak śledzenia adresu AED, brak przypomnień specyficznie o e-Doręczeniach)
- Automatyczne pobieranie danych z KRS po numerze KRS
- Składanie dokumentów online do KRS, ZUS lub US
- Integracja z systemami księgowymi
- Podpis elektroniczny dokumentów w aplikacji
- Przypomnienia SMS
- Eksport danych do PDF / Excel
