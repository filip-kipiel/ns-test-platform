/*
 * KONFIGURACJA SUPABASE
 * ---------------------
 * 1. Załóż darmowe konto na https://supabase.com i utwórz projekt.
 * 2. W panelu projektu: Settings → API → skopiuj "Project URL" oraz klucz "anon public".
 * 3. Wklej je poniżej.
 *
 * UWAGA: klucz "anon" jest przeznaczony do użytku po stronie przeglądarki
 * (jest publiczny). Bezpieczeństwo zapewnia polityka RLS opisana w README.md.
 *
 * Jeśli zostawisz puste wartości, aplikacja zadziała w trybie offline
 * (wyniki tylko lokalnie, bez zapisu do bazy).
 */
window.APP_CONFIG = {
  SUPABASE_URL: "https://lfqtuhudmdrqxhsfaobj.supabase.co",
  SUPABASE_ANON_KEY:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmcXR1aHVkbWRycXhoc2Zhb2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDY1NDUsImV4cCI6MjA5Nzc4MjU0NX0.UUor81r1YBj01y3VPXYLTVWZMLqxa6AsPyBuINiwWnI",
  RESULTS_TABLE: "results",
};
