/* =========================================================
   SZEFO.HU – HÍREK + BLOG MINI-SPA
   Fájl: js/news_blog.js

   Működés:
   - Hírek / Blog váltás
   - kategóriaszűrés
   - keresés
   - helyben olvasható részletes nézet
========================================================= */

const SZEFO_NEWS_BLOG_CONTENT = [
  {
    id: "gal-ferenc-egyuttmukodes",
    type: "news",
    title: "Stratégiai partnerség a jövő könnyűipari szakembereiért",
    date: "2026. január 12.",
    category: "ceges",
    categoryLabel: "Céges hírek",
    image: "../../img/hirek/hir/gal-ferenc-egyuttmukodes.webp",
    imageCredit: "Fotó: Gémes Sándor",
    excerpt:
      "A Gál Ferenc Egyetem és a Szegedi SZEFO zrt. 2026. január 9-én Stratégiai együttműködési megállapodást írt alá.",
    featured: true,
    content: [
      {
        paragraphs: [
          "A Gál Ferenc Egyetem és a Szegedi SZEFO zrt. 2026. január 9-én Stratégiai együttműködési megállapodást írt alá. A Gál Ferenc Egyetemet Prof. Dr. Dux László rektor és Tóth József kancellár képviselte, a Szegedi SZEFO zrt.-t Mérész Attila vezérigazgató.",
          "Az együttműködés, partnerség elsődleges célja a textil- és könnyűipari szakképzés erősítése, a piacképes tudással rendelkező szakemberhiány pótlása, az elméleti tudás és a gyakorlati szakmai tapasztalat szorosabb összekapcsolása, valamint a tanulók közvetlen bekapcsolása a piaci alapú termelési folyamatokba a duális képzési modell keretein belül.",
          "A megállapodás értelmében a 2026/2027-es tanévtől kezdődően a Szegedi SZEFO zrt. korszerűen felszerelt gyártóegységeiben tölthetik szakmai gyakorlatukat. Itt nemcsak a legmodernebb varrástechnológiai eljárásokat sajátíthatják el, hanem valós ipari környezetben ismerhetik meg a gyártástervezés, a minőségbiztosítás és a fenntartható divatipar kihívásait."
        ]
      }
    ]
  }
];

/* A szűrők címkéi. Csak azok jelennek meg, amelyekhez ténylegesen
   tartozik tartalom - így nem marad "üres" szűrőgomb az oldalon. */
const NEWS_BLOG_CATEGORY_LABELS = {
  news: {
    all: "Összes hír",
    ceges: "Céges hírek",
    kozosseg: "Közösség",
    esemeny: "Események"
  },
  blog: {
    all: "Összes blog",
    szakmai: "Szakmai blog",
    fenntarthatosag: "Fenntarthatóság",
    tortenetek: "Történetek"
  }
};

function getAvailableFilters(type) {
  const labels = NEWS_BLOG_CATEGORY_LABELS[type] || {};
  const used = new Set(
    SZEFO_NEWS_BLOG_CONTENT.filter((item) => item.type === type).map(
      (item) => item.category
    )
  );

  if (!used.size) return [];

  return [
    { id: "all", label: labels.all || "Összes" },
    ...[...used].map((id) => ({ id, label: labels[id] || id }))
  ];
}

function hasContentOfType(type) {
  return SZEFO_NEWS_BLOG_CONTENT.some((item) => item.type === type);
}

document.addEventListener("DOMContentLoaded", () => {
  initNewsBlogPage();
});

function initNewsBlogPage() {
  const app = document.querySelector(".news-blog-app");
  const tabs = Array.from(document.querySelectorAll("[data-news-blog-type]"));
  const filtersContainer = document.querySelector("[data-news-blog-filters]");
  const featuredContainer = document.querySelector("[data-news-blog-featured]");
  const resultsContainer = document.querySelector("[data-news-blog-results]");
  const detailContainer = document.querySelector("[data-news-blog-detail]");
  const emptyState = document.querySelector("[data-news-blog-empty]");
  const searchInput = document.querySelector("[data-news-blog-search]");
  const placeholder = document.querySelector("[data-news-blog-placeholder]");

  if (
    !app ||
    !tabs.length ||
    !filtersContainer ||
    !featuredContainer ||
    !resultsContainer ||
    !detailContainer ||
    !emptyState
  ) {
    return;
  }

const params = new URLSearchParams(window.location.search);
const initialType = params.get("type") === "blog" ? "blog" : "news";
const initialSearch = params.get("q") || "";

let activeType = initialType;
let activeCategory = "all";
let activeSearch = initialSearch;
let activeDetailId = null;

if (searchInput && initialSearch) {
  searchInput.value = initialSearch;
}

  function render() {
    renderTabs();
    renderFilters();

    if (activeDetailId) {
      renderDetail(activeDetailId);
      return;
    }

    /* Ha az adott típushoz (pl. blog) még egyáltalán nincs tartalom,
       a "nincs találat" helyett a feltöltés alatti üzenetet mutatjuk. */
    if (!hasContentOfType(activeType)) {
      detailContainer.hidden = true;
      featuredContainer.hidden = true;
      resultsContainer.hidden = true;
      filtersContainer.hidden = true;
      emptyState.hidden = true;

      if (placeholder) placeholder.hidden = false;
      return;
    }

    if (placeholder) placeholder.hidden = true;

    const items = getFilteredItems();

    detailContainer.hidden = true;
    featuredContainer.hidden = false;
    resultsContainer.hidden = false;
    filtersContainer.hidden = false;

    renderFeatured(items);
    renderCards(items);
    renderEmptyState(items);
  }

  function getFilteredItems() {
    return SZEFO_NEWS_BLOG_CONTENT.filter((item) => {
      const matchesType = item.type === activeType;
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      const searchableText = normalizeText(
        `${item.title} ${item.categoryLabel} ${item.excerpt} ${item.date}`
      );

      const matchesSearch =
        !activeSearch || searchableText.includes(normalizeText(activeSearch));

      return matchesType && matchesCategory && matchesSearch;
    });
  }

  function renderTabs() {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.newsBlogType === activeType;

      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
  }

  function renderFilters() {
    const filters = getAvailableFilters(activeType);

    filtersContainer.innerHTML = filters
      .map((filter) => {
        const isActive = filter.id === activeCategory;

        return `
          <button
            class="news-blog-filter ${isActive ? "is-active" : ""}"
            type="button"
            data-news-blog-category="${escapeAttribute(filter.id)}"
            aria-pressed="${String(isActive)}"
          >
            ${escapeHtml(filter.label)}
          </button>
        `;
      })
      .join("");
  }

  function renderFeatured(items) {
    const featuredItem = items.find((item) => item.featured) || items[0];

    if (!featuredItem) {
      featuredContainer.innerHTML = "";
      return;
    }

    featuredContainer.innerHTML = createFeaturedCard(featuredItem);
  }

  function renderCards(items) {
    const normalItems = items.filter((item) => !item.featured);

    resultsContainer.innerHTML = normalItems
      .map((item) => createContentCard(item))
      .join("");
  }

  function renderEmptyState(items) {
    emptyState.hidden = items.length > 0;
  }

  function openDetail(id) {
    activeDetailId = id;
    render();

    detailContainer.hidden = false;
    detailContainer.focus({ preventScroll: true });

    detailContainer.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function closeDetail() {
    activeDetailId = null;
    render();

    app.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function renderDetail(id) {
    const item = SZEFO_NEWS_BLOG_CONTENT.find((entry) => entry.id === id);

    if (!item) {
      activeDetailId = null;
      render();
      return;
    }

    featuredContainer.hidden = true;
    resultsContainer.hidden = true;
    filtersContainer.hidden = true;
    emptyState.hidden = true;

    if (placeholder) placeholder.hidden = true;

    detailContainer.hidden = false;
    detailContainer.innerHTML = createDetailView(item);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeType = tab.dataset.newsBlogType || "news";
      activeCategory = "all";
      activeDetailId = null;
      activeSearch = "";

      if (searchInput) {
        searchInput.value = "";
      }

      render();
    });
  });

  filtersContainer.addEventListener("click", (event) => {
    const button = event.target.closest("[data-news-blog-category]");
    if (!button) return;

    activeCategory = button.dataset.newsBlogCategory || "all";
    activeDetailId = null;

    render();
  });

  searchInput?.addEventListener("input", () => {
    activeSearch = searchInput.value.trim();
    activeDetailId = null;

    render();
  });

  document.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-news-blog-open]");
    const backButton = event.target.closest("[data-news-blog-back]");

    if (openButton) {
      event.preventDefault();
      openDetail(openButton.dataset.newsBlogOpen);
      return;
    }

    if (backButton) {
      event.preventDefault();
      closeDetail();
    }
  });

  render();
}

function createFeaturedCard(item) {
  return `
    <article class="news-blog-featured-card">
      <figure class="news-blog-featured-image">
        <img
          src="${escapeAttribute(item.image)}"
          alt="${escapeAttribute(item.title)}"
          loading="lazy"
          decoding="async"
        >
      </figure>

      <div class="news-blog-featured-content">
        <div class="news-blog-meta">
          <span class="news-blog-category">${escapeHtml(item.categoryLabel)}</span>
          <time>${escapeHtml(item.date)}</time>
        </div>

        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.excerpt)}</p>

        <button
          class="news-blog-read-more"
          type="button"
          data-news-blog-open="${escapeAttribute(item.id)}"
        >
          Tovább olvasom
        </button>
      </div>
    </article>
  `;
}

function createContentCard(item) {
  return `
    <article class="news-blog-card">
      <figure class="news-blog-card-image">
        <img
          src="${escapeAttribute(item.image)}"
          alt="${escapeAttribute(item.title)}"
          loading="lazy"
          decoding="async"
        >
      </figure>

      <div class="news-blog-card-content">
        <div class="news-blog-meta">
          <span class="news-blog-category">${escapeHtml(item.categoryLabel)}</span>
          <time>${escapeHtml(item.date)}</time>
        </div>

        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.excerpt)}</p>

        <button
          class="news-blog-read-more"
          type="button"
          data-news-blog-open="${escapeAttribute(item.id)}"
        >
          Tovább olvasom
        </button>
      </div>
    </article>
  `;
}

function createDetailView(item) {
  const contentHtml = item.content
    .map((section) => {
      /* Az alcím opcionális: ha a forrásszöveg nem tartalmaz alcímet,
         nem teszünk bele üres <h3>-at. */
      const headingHtml = section.heading
        ? `<h3>${escapeHtml(section.heading)}</h3>`
        : "";

      return `
        <section class="news-blog-detail-section">
          ${headingHtml}
          ${section.paragraphs
            .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
            .join("")}
        </section>
      `;
    })
    .join("");

  const creditHtml = item.imageCredit
    ? `<figcaption class="news-blog-image-credit">${escapeHtml(item.imageCredit)}</figcaption>`
    : "";

  return `
    <button class="news-blog-back" type="button" data-news-blog-back>
      ← Vissza a listához
    </button>

    <header class="news-blog-detail-header">
      <div class="news-blog-meta">
        <span class="news-blog-category">${escapeHtml(item.categoryLabel)}</span>
        <time>${escapeHtml(item.date)}</time>
      </div>

      <h2>${escapeHtml(item.title)}</h2>
      <p>${escapeHtml(item.excerpt)}</p>
    </header>

    <figure class="news-blog-detail-image">
      <img
        src="${escapeAttribute(item.image)}"
        alt="${escapeAttribute(item.title)}"
        loading="lazy"
        decoding="async"
      >
      ${creditHtml}
    </figure>

    <div class="news-blog-detail-content">
      ${contentHtml}
    </div>
  `;
}

function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9áéíóöőúüű\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

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