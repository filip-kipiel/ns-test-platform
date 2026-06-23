/* =========================================================================
 *  Platforma testowa Network Security — logika aplikacji
 * ========================================================================= */
(function () {
  "use strict";

  // ---- Dekodowanie klucza odpowiedzi -------------------------------------
  function decodeAnswers(b64, salt) {
    const raw = atob(b64);
    let out = "";
    for (let i = 0; i < raw.length; i++) {
      out += String.fromCharCode(raw.charCodeAt(i) ^ salt.charCodeAt(i % salt.length));
    }
    return JSON.parse(out); // [0,1,3,...]
  }
  const ANSWERS = decodeAnswers(window.ANSWER_KEY, window.ANSWER_SALT);

  // ---- Supabase (inicjalizacja leniwa — nie blokuje działania testu) -----
  const cfg = window.APP_CONFIG || {};
  const dbConfigured =
    cfg.SUPABASE_URL &&
    cfg.SUPABASE_ANON_KEY &&
    !cfg.SUPABASE_URL.startsWith("TUTAJ") &&
    !cfg.SUPABASE_ANON_KEY.startsWith("TUTAJ");

  let _supa = null;
  function getSupabase() {
    if (_supa) return _supa;
    if (!dbConfigured || !window.supabase) return null; // biblioteka jeszcze nie załadowana / brak konfiguracji
    try {
      _supa = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    } catch (e) {
      console.warn("Nie udało się zainicjować Supabase:", e);
    }
    return _supa;
  }

  // ---- Stan --------------------------------------------------------------
  const state = {
    username: "",
    current: 0,
    selected: null, // indeks wybranej opcji (po przetasowaniu)
    score: 0,
    deck: [], // pytania z przetasowanymi opcjami + mapowaniem na poprawną
    details: [], // szczegóły odpowiedzi (do panelu admina)
  };

  // ---- Elementy DOM ------------------------------------------------------
  const el = (id) => document.getElementById(id);
  const screens = {
    start: el("screen-start"),
    quiz: el("screen-quiz"),
    result: el("screen-result"),
  };

  function show(screen) {
    Object.values(screens).forEach((s) => s.classList.add("hidden"));
    screens[screen].classList.remove("hidden");
  }

  // ---- Tasowanie (Fisher–Yates) ------------------------------------------
  function buildDeck() {
    state.deck = window.QUESTIONS.map((q, qi) => {
      const idxs = q.options.map((_, i) => i);
      for (let i = idxs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
      }
      const options = idxs.map((i) => q.options[i]);
      const correctPos = idxs.indexOf(ANSWERS[qi]); // gdzie wylądowała poprawna
      return { text: q.text, topic: q.topic, difficulty: q.difficulty, options, correctPos };
    });
  }

  // ---- Ekran startowy ----------------------------------------------------
  function initStart() {
    const status = el("dbStatus");
    if (dbConfigured) {
      status.textContent = "✓ Baza danych skonfigurowana (Supabase). Wyniki zostaną zapisane.";
    } else {
      status.textContent =
        "ⓘ Tryb offline — baza nie jest skonfigurowana. Wynik wyświetli się lokalnie.";
    }

    el("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const val = el("username").value.trim();
      const err = el("loginError");
      if (val.length < 2) {
        err.textContent = "Podaj login (min. 2 znaki).";
        err.classList.remove("hidden");
        return;
      }
      err.classList.add("hidden");
      state.username = val;
      startQuiz();
    });
  }

  // ---- Test --------------------------------------------------------------
  function startQuiz() {
    buildDeck();
    state.current = 0;
    state.score = 0;
    state.selected = null;
    state.details = [];

    const badge = el("userBadge");
    badge.textContent = "👤 " + state.username;
    badge.classList.remove("hidden");

    el("qTotal").textContent = state.deck.length;
    show("quiz");
    renderQuestion();
  }

  const DIFF_LABELS = { easy: "Łatwe", medium: "Średnie", hard: "Trudne" };

  function renderQuestion() {
    const q = state.deck[state.current];
    state.selected = null;

    el("qIndex").textContent = state.current + 1;
    el("questionText").textContent = q.text;

    const badge = el("diffBadge");
    badge.textContent = DIFF_LABELS[q.difficulty] || q.difficulty;
    badge.className = "diff-badge diff-" + q.difficulty;

    const pct = (state.current / state.deck.length) * 100;
    el("progressFill").style.width = pct + "%";

    const letters = ["A", "B", "C", "D"];
    const box = el("options");
    box.innerHTML = "";
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.innerHTML =
        '<span class="letter">' + letters[i] + "</span><span>" + escapeHtml(opt) + "</span>";
      btn.addEventListener("click", () => selectOption(i, btn));
      box.appendChild(btn);
    });

    el("answeredHint").textContent = "Wybierz jedną odpowiedź.";
    const nextBtn = el("nextBtn");
    nextBtn.disabled = true;
    nextBtn.textContent =
      state.current === state.deck.length - 1 ? "Zakończ test ✓" : "Dalej →";
  }

  function selectOption(i, btn) {
    state.selected = i;
    document.querySelectorAll(".option").forEach((o) => o.classList.remove("selected"));
    btn.classList.add("selected");
    el("nextBtn").disabled = false;
    el("answeredHint").textContent = "Możesz zmienić wybór lub przejść dalej.";
  }

  el("nextBtn").addEventListener("click", function () {
    if (state.selected === null) return;
    const q = state.deck[state.current];
    const isCorrect = state.selected === q.correctPos;
    if (isCorrect) state.score++;

    state.details.push({
      nr: state.current + 1,
      temat: q.topic,
      pytanie: q.text,
      wybrana: q.options[state.selected],
      poprawna: q.options[q.correctPos],
      ok: isCorrect,
    });

    if (state.current < state.deck.length - 1) {
      state.current++;
      renderQuestion();
    } else {
      finishQuiz();
    }
  });

  // ---- Wynik -------------------------------------------------------------
  function finishQuiz() {
    const total = state.deck.length;
    const pct = Math.round((state.score / total) * 100);

    el("scoreUser").textContent = state.username;
    el("scoreText").textContent = state.score + " / " + total;
    el("scorePct").textContent = pct + "%";
    el("progressFill").style.width = "100%";

    const ring = el("scoreRing");
    ring.style.setProperty("--ring-deg", (pct * 3.6) + "deg");

    show("result");
    saveResult(state.username, state.score, total, pct, state.details);
  }

  async function saveResult(username, score, total, pct, details) {
    const status = el("saveStatus");
    const supa = getSupabase();
    if (!supa) {
      status.textContent = dbConfigured
        ? "Tryb offline — biblioteka bazy nie została załadowana (sprawdź połączenie)."
        : "Tryb offline — wynik nie został zapisany w bazie.";
      return;
    }
    status.textContent = "Zapisywanie wyniku…";
    try {
      const { error } = await supa.from(cfg.RESULTS_TABLE || "results").insert({
        username: username,
        score: score,
        total: total,
        percentage: pct,
        details: details,
      });
      if (error) throw error;
      status.textContent = "✓ Wynik zapisany w bazie danych.";
    } catch (e) {
      console.error(e);
      status.textContent = "⚠ Nie udało się zapisać wyniku: " + (e.message || e);
    }
  }

  // ---- Util --------------------------------------------------------------
  function escapeHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ---- Start -------------------------------------------------------------
  initStart();
  show("start");
})();
