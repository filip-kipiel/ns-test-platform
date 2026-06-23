# Platforma testowa — Network Security

Statyczna aplikacja (HTML/CSS/JS) z testem jednokrotnego wyboru (ABCD), 15 pytań
o rosnącej trudności z zakresu: **RFC1918, DHCP/DORA, DNS, Active Directory, NAT, IDS/IPS**.
Wyniki zapisywane są do bazy **Supabase (PostgreSQL)**. Hosting: **GitHub Pages**.

## Jak to działa

1. Użytkownik wpisuje login na stronie startowej.
2. Przechodzi przez 15 pytań (kolejność odpowiedzi jest losowana przy każdym podejściu).
3. Na koniec widzi wynik (liczba poprawnych + %), który zostaje zapisany w bazie.

```
index.html
├── css/style.css      → wygląd
├── js/config.js       → klucze Supabase (do uzupełnienia)
├── js/questions.js    → bank 15 pytań + zakodowany klucz odpowiedzi
└── js/quiz.js         → logika testu + zapis do bazy
```

---

## 1. Konfiguracja bazy danych (Supabase)

1. Załóż darmowe konto na <https://supabase.com> i utwórz nowy projekt.
2. Wejdź w **SQL Editor** i uruchom poniższy skrypt — utworzy tabelę wyników
   i ustawi bezpieczną politykę dostępu (anonimowy użytkownik może **tylko dodawać**
   wyniki, nie może ich odczytywać ani zmieniać):

```sql
create table if not exists public.results (
  id          uuid primary key default gen_random_uuid(),
  username    text not null,
  score       int  not null,
  total       int  not null,
  percentage  numeric not null,
  created_at  timestamptz not null default now()
);

alter table public.results enable row level security;

-- Anonimowy klient (przeglądarka) może TYLKO wstawiać poprawne kształtem wyniki.
-- Nie może ich odczytywać, zmieniać ani usuwać (brak innych polityk = domyślny zakaz).
create policy "anon insert results"
  on public.results for insert
  to anon
  with check (
    char_length(username) between 2 and 60
    and total = 15
    and score between 0 and total
    and percentage between 0 and 100
  );
```

3. Przejdź do **Settings → API** i skopiuj:
   - **Project URL** (np. `https://abcdxyz.supabase.co`)
   - klucz **anon public**
4. Wklej oba do pliku [`js/config.js`](js/config.js):

```js
window.APP_CONFIG = {
  SUPABASE_URL: "https://abcdxyz.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOi...",   // klucz anon public
  RESULTS_TABLE: "results",
};
```

> Wyniki podejrzysz w panelu Supabase: **Table Editor → results**.
> Jeśli zostawisz puste wartości, aplikacja działa w trybie offline (bez zapisu).

---

## 2. Publikacja na GitHub Pages

1. Utwórz repozytorium (może być **publiczne**) i wgraj zawartość folderu
   `ns-test-platform/` (pliki `index.html`, `css/`, `js/`).
2. W repo: **Settings → Pages → Build and deployment → Source: „Deploy from a branch"**,
   wybierz gałąź `main` i katalog `/ (root)`, zapisz.
3. Po chwili strona będzie pod adresem:
   `https://<twoja-nazwa>.github.io/<nazwa-repo>/`

---

## 3. Kwestia „ukrycia bazy / odpowiedzi" — ważne wyjaśnienie

W **publicznym repozytorium GitHub każdy plik jest publiczny** — nie da się tam
trzymać „prywatnego pliku". Dlatego zastosowano dwa realne mechanizmy:

- **Dane wyników nie leżą w repo** — są w bazie Supabase (poza GitHubem).
  Repozytorium może być publiczne, a wyniki i tak są poza nim.
- **Poprawne odpowiedzi są zakodowane** w [`js/questions.js`](js/questions.js)
  (XOR + base64), więc nie widać ich w „View Source". To celowo **lekkie ukrycie** —
  wystarczające na potrzeby kursu, ale osoba zdeterminowana może je odtworzyć
  w konsoli przeglądarki (bo ocena odbywa się po stronie klienta).

Jeśli kiedyś będziesz chciał **pełne ukrycie** (odpowiedzi nieosiągalne nawet w ruchu
sieciowym), trzeba przenieść pytania i sprawdzanie do bazy i oceniać przez funkcję
serwerową (Supabase RPC / Edge Function). Wtedy klient nigdy nie dostaje poprawnych
odpowiedzi. To większa konfiguracja — daj znać, jeśli chcesz tę wersję.

### Alternatywy, gdyby repo miało być naprawdę „z prywatną częścią":
- **Repozytorium prywatne** + GitHub Pages (Pages działa też z repo prywatnych na płatnych planach / GitHub Pro; dla studentów często darmowe przez GitHub Education).
- **Prywatny submoduł** z pytaniami dołączony do publicznego repo (część kodu publiczna, pytania w osobnym prywatnym repo).

---

## 4. Uruchomienie lokalne (do testów)

Otwórz `index.html` przez lokalny serwer (nie z `file://`, bo CDN/Supabase mogą być blokowane):

```bash
# w folderze ns-test-platform/
python -m http.server 8000
# następnie otwórz http://localhost:8000
```

## Edycja pytań

Pytania zmienisz w [`js/questions.js`](js/questions.js). Jeśli zmienisz liczbę pytań
lub poprawne odpowiedzi, trzeba zregenerować zakodowany klucz `ANSWER_KEY` —
skrypt do tego znajdziesz w pliku [`tools/encode-answers.js`](tools/encode-answers.js).
