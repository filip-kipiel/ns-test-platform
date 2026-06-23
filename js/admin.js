/* =========================================================================
 *  Panel administratora — podgląd wyników i szczegółów odpowiedzi
 *  Hasło weryfikowane jest PO STRONIE BAZY (funkcja admin_get_results).
 * ========================================================================= */
(function () {
  "use strict";

  const cfg = window.APP_CONFIG || {};
  const dbConfigured =
    cfg.SUPABASE_URL &&
    cfg.SUPABASE_ANON_KEY &&
    !cfg.SUPABASE_URL.startsWith("TUTAJ") &&
    !cfg.SUPABASE_ANON_KEY.startsWith("TUTAJ");

  let _supa = null;
  function getSupabase() {
    if (_supa) return _supa;
    if (!dbConfigured || !window.supabase) return null;
    try {
      _supa = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    } catch (e) {
      console.warn("Supabase init error:", e);
    }
    return _supa;
  }

  const el = (id) => document.getElementById(id);
  let currentPassword = null; // przechowywane tylko w pamięci, na czas sesji

  function show(which) {
    el("admin-login").classList.toggle("hidden", which !== "login");
    el("admin-results").classList.toggle("hidden", which !== "results");
  }

  // ---- Logowanie ---------------------------------------------------------
  el("adminForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const pass = el("adminPass").value;
    const err = el("adminError");
    err.classList.add("hidden");

    const supa = getSupabase();
    if (!supa) {
      err.textContent = "Brak połączenia z bazą (sprawdź konfigurację / internet).";
      err.classList.remove("hidden");
      return;
    }

    const btn = el("adminForm").querySelector("button");
    btn.disabled = true;
    btn.textContent = "Sprawdzanie…";
    try {
      const rows = await fetchResults(supa, pass);
      currentPassword = pass;
      el("adminPass").value = "";
      show("results");
      render(rows);
    } catch (ex) {
      err.textContent = "Nieprawidłowe hasło lub błąd dostępu.";
      err.classList.remove("hidden");
    } finally {
      btn.disabled = false;
      btn.textContent = "Pokaż wyniki →";
    }
  });

  el("refreshBtn").addEventListener("click", async function () {
    const supa = getSupabase();
    if (!supa || currentPassword === null) return;
    this.disabled = true;
    try {
      render(await fetchResults(supa, currentPassword));
    } catch (e) {
      alert("Nie udało się odświeżyć: " + (e.message || e));
    } finally {
      this.disabled = false;
    }
  });

  el("logoutBtn").addEventListener("click", function () {
    currentPassword = null;
    el("resultsWrap").innerHTML = "";
    show("login");
  });

  async function fetchResults(supa, password) {
    const { data, error } = await supa.rpc("admin_get_results", { p_password: password });
    if (error) throw error;
    return data || [];
  }

  // ---- Render ------------------------------------------------------------
  function render(rows) {
    const wrap = el("resultsWrap");
    const stats = el("statsLine");

    if (!rows.length) {
      stats.textContent = "Brak zapisanych wyników.";
      wrap.innerHTML = '<p class="hint">Nikt jeszcze nie rozwiązał testu.</p>';
      return;
    }

    const avg =
      Math.round((rows.reduce((s, r) => s + Number(r.percentage), 0) / rows.length) * 10) / 10;
    stats.textContent =
      "Podejść: " + rows.length + " · średni wynik: " + avg + "% ";

    const table = document.createElement("table");
    table.className = "rtable";
    table.innerHTML =
      "<thead><tr>" +
      "<th>Użytkownik</th><th>Wynik</th><th>%</th><th>Data</th><th></th>" +
      "</tr></thead>";
    const tbody = document.createElement("tbody");

    rows.forEach((r, idx) => {
      const tr = document.createElement("tr");
      tr.className = "rrow";
      const date = new Date(r.created_at);
      const dateStr = isNaN(date) ? r.created_at : date.toLocaleString("pl-PL");
      const hasDetails = Array.isArray(r.details) && r.details.length;
      tr.innerHTML =
        "<td>" + escapeHtml(r.username) + "</td>" +
        "<td>" + r.score + " / " + r.total + "</td>" +
        "<td>" + r.percentage + "%</td>" +
        "<td>" + escapeHtml(dateStr) + "</td>" +
        "<td>" +
        (hasDetails
          ? '<button class="btn btn-secondary btn-sm" data-i="' + idx + '">Szczegóły</button>'
          : '<span class="hint">brak</span>') +
        "</td>";
      tbody.appendChild(tr);

      if (hasDetails) {
        const detailTr = document.createElement("tr");
        detailTr.className = "detail-row hidden";
        const td = document.createElement("td");
        td.colSpan = 5;
        td.appendChild(renderDetails(r.details));
        detailTr.appendChild(td);
        tbody.appendChild(detailTr);

        tr.querySelector("button").addEventListener("click", function () {
          detailTr.classList.toggle("hidden");
          this.textContent = detailTr.classList.contains("hidden") ? "Szczegóły" : "Ukryj";
        });
      }
    });

    table.appendChild(tbody);
    wrap.innerHTML = "";
    wrap.appendChild(table);
  }

  function renderDetails(details) {
    const box = document.createElement("div");
    box.className = "detail-box";
    const wrong = details.filter((d) => !d.ok).length;
    const head = document.createElement("p");
    head.className = "hint";
    head.textContent = "Błędne odpowiedzi: " + wrong + " z " + details.length;
    box.appendChild(head);

    details.forEach((d) => {
      const item = document.createElement("div");
      item.className = "detail-item " + (d.ok ? "ok" : "bad");
      let html =
        '<div class="di-q"><span class="di-mark">' + (d.ok ? "✓" : "✗") + "</span> " +
        "<strong>" + d.nr + ". </strong>" + escapeHtml(d.pytanie) +
        ' <span class="di-topic">' + escapeHtml(d.temat || "") + "</span></div>";
      if (d.ok) {
        html += '<div class="di-ans">Odpowiedź: ' + escapeHtml(d.wybrana) + "</div>";
      } else {
        html +=
          '<div class="di-ans di-chosen">Wybrano: ' + escapeHtml(d.wybrana) + "</div>" +
          '<div class="di-ans di-correct">Poprawna: ' + escapeHtml(d.poprawna) + "</div>";
      }
      item.innerHTML = html;
      box.appendChild(item);
    });
    return box;
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ---- Init --------------------------------------------------------------
  el("adminDbStatus").textContent = dbConfigured
    ? ""
    : "ⓘ Baza nie jest skonfigurowana — panel nie pobierze wyników.";
  show("login");
})();
