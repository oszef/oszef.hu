/* =========================================================
   SZEFO.HU – KERESÉSI OLDAL LOGIKA
   Fájl helye: js/search.js
   Betöltés: csak a hu/kereses/index.html oldalon.

   Függőség:
   - search_data.js előbb töltődjön be
   - window.SZEFO_SEARCH_INDEX legyen elérhető
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initSearchPage();
});

/* =========================================================
   1. KERESÉSI OLDAL INICIALIZÁLÁSA
========================================================= */

/* Ennyi karaktertől indul a keresés. 1-2 betűre a találatok nagy része
   értelmetlen lenne, ezért addig csak egy rövid útmutatót mutatunk. */
const MIN_KARAKTER = 3;

/* Gépelés közben nem minden leütésre keresünk, csak ha rövid ideig
   szünet van – így hosszabb kifejezésnél sem fut fölöslegesen sokszor. */
const GEPELES_KESLELTETES = 180;

function initSearchPage() {
  const form = document.querySelector("[data-search-page-form]");
  const input = document.querySelector("[data-search-input]");
  const info = document.querySelector("[data-search-info]");
  const resultsContainer = document.querySelector("[data-search-results]");

  if (!form || !input || !info || !resultsContainer) return;

  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("q") || "";

  input.value = initialQuery;

  renderForQuery(initialQuery.trim());

  let gepelesIdozito = null;

  /* Élő keresés: a találatok már gépelés közben megjelennek. */
  input.addEventListener("input", () => {
    window.clearTimeout(gepelesIdozito);

    gepelesIdozito = window.setTimeout(() => {
      const query = input.value.trim();

      /* Gépelés közben replaceState, hogy a böngésző előzménye ne teljen
         meg minden egyes leütéssel – a vissza gomb így használható marad. */
      updateUrl(query, "replace");
      renderForQuery(query);
    }, GEPELES_KESLELTETES);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    window.clearTimeout(gepelesIdozito);

    const query = input.value.trim();

    updateUrl(query, "push");
    renderForQuery(query);
  });

  /* Egy helyen dől el, mit mutatunk: üres mező, túl rövid kifejezés,
     vagy valódi találatok. Így a gépelés és a gombnyomás nem térhet el. */
  function renderForQuery(query) {
    if (!query) {
      renderStartState();
      return;
    }

    if (query.length < MIN_KARAKTER) {
      renderTooShortState(query);
      return;
    }

    renderSearchResults(query);
  }

  function updateUrl(query, mod) {
    const nextUrl = query.length >= MIN_KARAKTER
      ? `${window.location.pathname}?q=${encodeURIComponent(query)}`
      : window.location.pathname;

    if (mod === "push") {
      window.history.pushState({}, "", nextUrl);
    } else {
      window.history.replaceState({}, "", nextUrl);
    }
  }

  window.addEventListener("popstate", () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q") || "";

    input.value = query;
    renderForQuery(query.trim());
  });

  function renderStartState() {
  info.textContent = "";

  resultsContainer.innerHTML = `
    <article class="search-state-card">
      <div class="search-state-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M10.5 4a6.5 6.5 0 0 1 5.17 10.45l3.94 3.94a1 1 0 0 1-1.42 1.42l-3.94-3.94A6.5 6.5 0 1 1 10.5 4Zm0 2a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9Z"/>
        </svg>
      </div>

      <h2>Kezdje el a keresést</h2>

      <p>
        Írjon be legalább ${MIN_KARAKTER} karaktert, és a találatok
        gépelés közben megjelennek.
      </p>
    </article>
  `;
}

  /* 1-2 karakternél még nem keresünk, de jelezzük, mennyi hiányzik. */
  function renderTooShortState(query) {
    const hiany = MIN_KARAKTER - query.length;

    info.textContent = `Írjon be még ${hiany} karaktert a kereséshez.`;

    resultsContainer.innerHTML = `
      <article class="search-state-card">
        <div class="search-state-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M10.5 4a6.5 6.5 0 0 1 5.17 10.45l3.94 3.94a1 1 0 0 1-1.42 1.42l-3.94-3.94A6.5 6.5 0 1 1 10.5 4Zm0 2a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9Z"/>
          </svg>
        </div>

        <h2>Még ${hiany} karakter</h2>

        <p>
          A kereséshez legalább ${MIN_KARAKTER} karakter szükséges.
        </p>
      </article>
    `;
  }

  function renderSearchResults(query) {
    const searchIndex = Array.isArray(window.SZEFO_SEARCH_INDEX)
      ? window.SZEFO_SEARCH_INDEX
      : [];

    if (!searchIndex.length) {
      renderMissingIndexState();
      return;
    }

    const results = getSearchResults(searchIndex, query);

    info.textContent = `${results.length} találat erre: „${query}”`;

    if (!results.length) {
      renderNoResultsState(query);
      return;
    }

    resultsContainer.innerHTML = results
      .map((item) => createResultCard(item, query))
      .join("");
  }

  function renderMissingIndexState() {
    info.textContent = "A keresési index jelenleg nem érhető el.";

    resultsContainer.innerHTML = `
      <article class="search-result-empty">
        <h2>Nincs betöltött keresési adat</h2>
        <p>
          Ellenőrizze, hogy a search_data.js fájl a search.js előtt töltődik-e be.
        </p>
      </article>
    `;
  }

  function renderNoResultsState(query) {
    resultsContainer.innerHTML = `
      <article class="search-result-empty">
        <h2>Nincs találat</h2>
        <p>
          Nem találtunk eredményt erre a keresésre: „${escapeHtml(query)}”.
          Próbáljon meg rövidebb vagy általánosabb keresőkifejezést használni.
        </p>
      </article>
    `;
  }
}

/* =========================================================
   2. KERESÉSI TALÁLATOK ELŐÁLLÍTÁSA
========================================================= */

function getSearchResults(searchIndex, query) {
  const normalizedQuery = normalizeText(query);
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  if (!queryTokens.length) return [];

  return searchIndex
    .map((item) => {
      const searchableText = createSearchableText(item);

      const matchesAllTokens = queryTokens.every((token) =>
        searchableText.combined.includes(token)
      );

      if (!matchesAllTokens) return null;

      const score = calculateSearchScore(searchableText, normalizedQuery, queryTokens);

      return {
        ...item,
        score
      };
    })
    .filter(Boolean)
    .sort(sortSearchResults);
}

function createSearchableText(item) {
  const title = normalizeText(item.title || "");
  const category = normalizeText(item.category || "");
  const keywords = normalizeText((item.keywords || []).join(" "));
  const text = normalizeText(item.text || "");

  const combined = normalizeText([
    item.title || "",
    item.category || "",
    (item.keywords || []).join(" "),
    item.text || ""
  ].join(" "));

  return {
    title,
    category,
    keywords,
    text,
    combined
  };
}

function calculateSearchScore(searchableText, normalizedQuery, queryTokens) {
  let score = 0;

  /*
    Pontozási logika:
    - teljes cím találat: legerősebb
    - kulcsszó találat: erős
    - kategória találat: közepes
    - szöveg találat: alap találat
  */

  if (searchableText.title.includes(normalizedQuery)) score += 80;
  if (searchableText.keywords.includes(normalizedQuery)) score += 45;
  if (searchableText.category.includes(normalizedQuery)) score += 35;
  if (searchableText.text.includes(normalizedQuery)) score += 20;

  queryTokens.forEach((token) => {
    if (searchableText.title.includes(token)) score += 18;
    if (searchableText.keywords.includes(token)) score += 12;
    if (searchableText.category.includes(token)) score += 8;
    if (searchableText.text.includes(token)) score += 4;
  });

  return score;
}

function sortSearchResults(a, b) {
  if (b.score !== a.score) {
    return b.score - a.score;
  }

  return String(a.title || "").localeCompare(String(b.title || ""), "hu");
}

/* =========================================================
   3. TALÁLATI KÁRTYA LÉTREHOZÁSA
========================================================= */

function createResultCard(item, query) {
  const title = escapeHtml(item.title || "Cím nélküli oldal");
  const category = escapeHtml(item.category || "Oldal");
  const url = escapeAttribute(item.url || "#");
  const excerpt = escapeHtml(createExcerpt(item.text || item.title || "", query));

  return `
    <article class="search-result-card">
      <span class="search-result-category">${category}</span>

      <h2>
        <a href="${url}">${title}</a>
      </h2>

      <p>${excerpt}</p>

      <a class="search-result-link" href="${url}">
        Megnyitás
      </a>
    </article>
  `;
}

/* =========================================================
   4. KIVONAT KÉSZÍTÉSE
========================================================= */

function createExcerpt(text, query) {
  const source = String(text).replace(/\s+/g, " ").trim();

  if (!source) return "";

  const normalizedSource = normalizeText(source);
  const normalizedQuery = normalizeText(query);

  const index = normalizedSource.indexOf(normalizedQuery);

  if (index === -1) {
    return source.length > 190
      ? `${source.slice(0, 190)}...`
      : source;
  }

  const start = Math.max(0, index - 75);
  const end = Math.min(source.length, index + normalizedQuery.length + 135);

  return `${start > 0 ? "..." : ""}${source.slice(start, end)}${
    end < source.length ? "..." : ""
  }`;
}

/* =========================================================
   5. SZÖVEG NORMALIZÁLÁSA
   Ékezetfüggetlen és kisbetűs kereséshez.
========================================================= */

function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9áéíóöőúüű\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   6. HTML BIZTONSÁGI SEGÉDEK
========================================================= */

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}