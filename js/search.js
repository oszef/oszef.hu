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
      .map((item) => createResultCard(item))
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
  /* A tokenek a TELJES lekérdezés normalizálása utáni felbontásból
     származnak (nem a nyers szavak egyenkénti normalizálásából) – így
     az írásjellel, szóköz nélkül összekötött szavak (pl. "szülő,gondviselő")
     is helyesen két külön AND-tokenre esnek szét, mert a normalizálás
     a vesszőt is szóközzé alakítja, mielőtt a felbontás megtörténne. */
  const normalizedQuery = normalizeText(query);
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  if (!queryTokens.length) return [];

  /* A találati listában az eredeti, ékezetes/nagybetűs alakot mutatjuk:
     minden tokenhez megkeressük azt a nyers (szóközzel tagolt) szót,
     amelynek normalizált alakja pontosan megegyezik vele. Ha egy token
     írásjellel összekötött szavak felbontásából jött létre (nincs ilyen
     1:1 megfelelő nyers szó), a normalizált alakot mutatjuk – ez a ritka
     esetben kevésbé szép, de a keresés helyessége nem sérül. */
  const rawWords = String(query).trim().split(/\s+/).filter(Boolean);
  const displayByToken = new Map();

  queryTokens.forEach((token) => {
    if (displayByToken.has(token)) return;

    const rawMatch = rawWords.find((raw) => normalizeText(raw) === token);

    displayByToken.set(token, rawMatch || token);
  });

  /* A találati szavak felsorolásához (matchDetails) egyedi tokenek
     kellenek, különben egy kétszer beírt szó (pl. "ház ház") duplikált
     sorként jelenne meg a kártyán. A pontozás (queryTokens) viszont
     szándékosan megtartja az esetleges ismétlődést. */
  const uniqueQueryTokens = [...displayByToken.keys()];

  return searchIndex
    .map((item) => {
      const searchableText = createSearchableText(item);

      const matchesAllTokens = queryTokens.every((token) =>
        searchableText.combined.includes(token)
      );

      if (!matchesAllTokens) return null;

      const score = calculateSearchScore(searchableText, normalizedQuery, queryTokens);
      const matchDetails = getMatchDetails(searchableText, uniqueQueryTokens, displayByToken);

      return {
        ...item,
        score,
        matchDetails
      };
    })
    .filter(Boolean)
    .sort(sortSearchResults);
}

/* Minden keresett szóhoz megállapítja, az oldal mely mezőiben
   (cím, kategória, kulcsszó, leírás) fordul elő – ez adja a
   találati kártyán megjelenő "hol található" felsorolást. */
function getMatchDetails(searchableText, queryTokens, displayByToken) {
  return queryTokens.map((token) => {
    const locations = [];

    if (searchableText.title.includes(token)) locations.push("cím");
    if (searchableText.category.includes(token)) locations.push("kategória");
    if (searchableText.keywords.includes(token)) locations.push("kulcsszó");
    if (searchableText.text.includes(token)) locations.push("leírás");

    return { token, display: displayByToken.get(token) || token, locations };
  });
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

function createResultCard(item) {
  const matchDetails = item.matchDetails || [];
  const tokens = matchDetails.map((detail) => detail.token);

  /* Ha nincs cím, a helyőrző szöveget nem futtatjuk át a kiemelésen –
     különben egy olyan keresőszó, ami a helyőrző szövegrészletébe esne
     (pl. "cím"), tévesen kiemelt találatnak tűnne. */
  const title = item.title
    ? highlightMatches(item.title, tokens)
    : escapeHtml("Cím nélküli oldal");
  const category = escapeHtml(item.category || "Oldal");
  const url = escapeAttribute(item.url || "#");
  const excerpt = highlightMatches(createExcerpt(item.text || item.title || "", tokens), tokens);
  const matchList = createMatchList(matchDetails);

  return `
    <article class="search-result-card">
      <span class="search-result-category">${category}</span>

      <h2>
        <a href="${url}">${title}</a>
      </h2>

      <p>${excerpt}</p>

      ${matchList}

      <a class="search-result-link" href="${url}">
        Megnyitás
      </a>
    </article>
  `;
}

/* Felsorolja, hogy a keresett szavak közül melyik hol található
   (cím, kategória, kulcsszó, leírás) az adott találaton belül. */
function createMatchList(matchDetails) {
  const items = matchDetails.filter((detail) => detail.locations.length);

  if (!items.length) return "";

  const rows = items
    .map((detail) => {
      const word = escapeHtml(detail.display || detail.token);
      const locations = detail.locations.map(escapeHtml).join(", ");

      return `<li><span class="search-match-word">${word}</span> – ${locations}</li>`;
    })
    .join("");

  return `<ul class="search-result-matches">${rows}</ul>`;
}

/* =========================================================
   4. SZÖVEG NORMALIZÁLÁSA ÉS POZÍCIÓ-TÉRKÉP
   Ékezetfüggetlen és kisbetűs kereséshez. A buildNormalizedMap()
   az EGYETLEN hely, ahol eldől, mi számít normalizálható karakternek –
   a normalizeText() is ebből képzi az eredményét, hogy a keresési
   egyezés (normalizeText) és a kiemelés/kivonat pozíciószámítása
   (buildNormalizedMap) soha ne csúszhasson szét egymástól.
========================================================= */

/* Karakterenként végzi el a normalizálást (kisbetűsítés, ékezetek
   levágása, a nem megengedett karakterek szóközre cserélése, majd az
   egymást követő szóközök összevonása), és közben megjegyzi minden
   normalizált karakterhez az eredeti szövegbeli forrás-indexét. Így egy
   a normalizált szövegben talált egyezés pozíciója pontosan
   visszavezethető az eredeti szövegre, akkor is, ha írásjelek vagy
   egymás melletti speciális karakterek miatt a whitespace-összevonás
   egyébként eltolná a pozíciókat (ez a sima "normalizálás után
   indexOf" megközelítés hibája lenne). */
function buildNormalizedMap(source) {
  const normalizedChars = [];
  const sourceIndexes = [];
  let previousWasSpace = false;

  for (let i = 0; i < source.length; i++) {
    const decomposed = source[i]
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    for (const ch of decomposed) {
      const isWhitespace = /\s/.test(ch);
      const isAllowed = isWhitespace || /[a-z0-9-]/i.test(ch);
      const outChar = isAllowed ? (isWhitespace ? " " : ch) : " ";
      const isSpace = outChar === " ";

      if (isSpace && previousWasSpace) continue;

      normalizedChars.push(outChar);
      sourceIndexes.push(i);
      previousWasSpace = isSpace;
    }
  }

  let start = 0;
  let end = normalizedChars.length;

  while (start < end && normalizedChars[start] === " ") start++;
  while (end > start && normalizedChars[end - 1] === " ") end--;

  return {
    normalized: normalizedChars.slice(start, end).join(""),
    sourceIndexes: sourceIndexes.slice(start, end)
  };
}

function normalizeText(value) {
  return buildNormalizedMap(String(value)).normalized;
}

/* =========================================================
   4b. KIVONAT KÉSZÍTÉSE
========================================================= */

function createExcerpt(text, tokens) {
  const source = String(text).replace(/\s+/g, " ").trim();

  if (!source) return "";

  /* A buildNormalizedMap pontos forrás-pozíciókat ad vissza, ezért itt
     nem merülhet fel a sima normalizeText() + indexOf() eltolódási hibája
     (amikor szóköz melletti írásjelek miatt a normalizált szöveg rövidebb
     lesz, mint az eredeti, és az abban talált index már nem illik rá az
     eredeti szövegre). */
  const { normalized, sourceIndexes } = buildNormalizedMap(source);

  /* A kivonat ablakát a legkorábban előforduló keresett szó köré
     építjük, nem a teljes kifejezés köré – több szavas keresésnél
     a pontos kifejezés gyakran elő sem fordul egy az egyben. */
  let matchStart = -1;
  let matchEnd = -1;

  (tokens || []).forEach((token) => {
    if (!token) return;

    const foundAt = normalized.indexOf(token);

    if (foundAt === -1) return;

    const sourceStart = sourceIndexes[foundAt];

    if (matchStart === -1 || sourceStart < matchStart) {
      matchStart = sourceStart;
      matchEnd = sourceIndexes[foundAt + token.length - 1] + 1;
    }
  });

  if (matchStart === -1) {
    return source.length > 190
      ? `${source.slice(0, 190)}...`
      : source;
  }

  const start = Math.max(0, matchStart - 75);
  const end = Math.min(source.length, matchEnd + 135);

  return `${start > 0 ? "..." : ""}${source.slice(start, end)}${
    end < source.length ? "..." : ""
  }`;
}

/* =========================================================
   4c. TALÁLT SZAVAK KIEMELÉSE
========================================================= */

function highlightMatches(text, tokens) {
  const source = String(text).replace(/\s+/g, " ").trim();
  const cleanTokens = (tokens || []).filter(Boolean);

  if (!source) return "";
  if (!cleanTokens.length) return escapeHtml(source);

  const { normalized, sourceIndexes } = buildNormalizedMap(source);
  const ranges = [];

  cleanTokens.forEach((token) => {
    let fromIndex = 0;

    while (fromIndex <= normalized.length) {
      const foundAt = normalized.indexOf(token, fromIndex);

      if (foundAt === -1) break;

      const sourceStart = sourceIndexes[foundAt];
      const sourceEnd = sourceIndexes[foundAt + token.length - 1] + 1;

      ranges.push([sourceStart, sourceEnd]);
      fromIndex = foundAt + token.length;
    }
  });

  if (!ranges.length) return escapeHtml(source);

  ranges.sort((a, b) => a[0] - b[0]);

  const mergedRanges = [ranges[0]];

  ranges.slice(1).forEach(([start, end]) => {
    const last = mergedRanges[mergedRanges.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      mergedRanges.push([start, end]);
    }
  });

  let html = "";
  let cursor = 0;

  mergedRanges.forEach(([start, end]) => {
    html += escapeHtml(source.slice(cursor, start));
    html += `<mark>${escapeHtml(source.slice(start, end))}</mark>`;
    cursor = end;
  });

  html += escapeHtml(source.slice(cursor));

  return html;
}

/* =========================================================
   5. HTML BIZTONSÁGI SEGÉDEK
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