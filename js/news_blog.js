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
    id: "kozossegi-esemeny",
    type: "news",
    title: "Közösségi esemény a SZEFO-nál",
    date: "2026. június 12.",
    category: "kozosseg",
    categoryLabel: "Közösség",
    image: "../../img/hirek/hir/hir-1.webp",
    excerpt:
      "Munkatársaink közös programon vettek részt, amely erősítette az összetartozást és a vállalati közösséget.",
    featured: true,
    content: [
      {
        heading: "Közösség és összetartozás",
        paragraphs: [
          "A SZEFO életében kiemelten fontosak azok az alkalmak, amelyek erősítik a munkatársak közötti kapcsolatot és a közös vállalati értékeket.",
          "A program célja az volt, hogy a mindennapi munka mellett lehetőséget teremtsen a találkozásra, beszélgetésre és közös élmények megélésére."
        ]
      },
      {
        heading: "Értékteremtő közösség",
        paragraphs: [
          "A közösségi események hozzájárulnak ahhoz, hogy a munkatársak ne csak munkahelyként, hanem támogató közösségként is tekintsenek a SZEFO-ra.",
          "A vállalat számára a szakmai teljesítmény mellett az emberi méltóság, az elfogadás és az együttműködés is meghatározó érték."
        ]
      }
    ]
  },
  {
    id: "gyartasi-fejlesztesek",
    type: "news",
    title: "Új fejlesztések a gyártási folyamatokban",
    date: "2026. május 28.",
    category: "ceges",
    categoryLabel: "Céges hírek",
    image: "../../img/hirek/hir/hir-2.webp",
    excerpt:
      "A modern technológiai megoldások támogatják a hatékonyabb és pontosabb működést.",
    content: [
      {
        heading: "Modernizáció a mindennapi működésben",
        paragraphs: [
          "A gyártási folyamatok fejlesztése hozzájárul a stabilabb, átláthatóbb és pontosabb munkavégzéshez.",
          "A korszerű megoldások célja, hogy a vállalat tovább erősítse szakmai hátterét és versenyképességét."
        ]
      },
      {
        heading: "Minőség és hatékonyság",
        paragraphs: [
          "A fejlesztések támogatják a minőségbiztosítást, a hatékonyabb munkaszervezést és a megrendelői igényekhez való rugalmas alkalmazkodást."
        ]
      }
    ]
  },
  {
    id: "szakmai-program",
    type: "news",
    title: "Szakmai program és üzemlátogatás",
    date: "2026. április 18.",
    category: "esemeny",
    categoryLabel: "Események",
    image: "../../img/hirek/hir/hir-3.webp",
    excerpt:
      "Látogatóink betekintést nyerhettek a SZEFO tevékenységeibe, üzemegységeibe és értékteremtő munkájába.",
    content: [
      {
        heading: "Betekintés a működésbe",
        paragraphs: [
          "A szakmai program lehetőséget adott arra, hogy az érdeklődők közelebbről is megismerjék a SZEFO tevékenységeit.",
          "A látogatás során bemutatásra kerültek azok a folyamatok, amelyek a vállalat mindennapi értékteremtő munkáját támogatják."
        ]
      },
      {
        heading: "Szakmai párbeszéd",
        paragraphs: [
          "Az esemény fontos alkalom volt a tapasztalatcserére, a szakmai kapcsolatok erősítésére és a rehabilitációs foglalkoztatás értékeinek bemutatására."
        ]
      }
    ]
  },
  {
    id: "rehabilitacios-foglalkoztatas-blog",
    type: "blog",
    title: "Miért fontos a rehabilitációs foglalkoztatás?",
    date: "2026. május 10.",
    category: "szakmai",
    categoryLabel: "Szakmai blog",
    image: "../../img/hirek/blog/blog-1.webp",
    excerpt:
      "A rehabilitációs foglalkoztatás társadalmi és emberi jelentőségéről közérthetően.",
    featured: true,
    content: [
      {
        heading: "Több mint munkahely",
        paragraphs: [
          "A rehabilitációs foglalkoztatás nem csupán munkalehetőséget jelent, hanem társadalmi részvételt, önállóságot és megbecsülést is.",
          "Egy befogadó munkahely lehetőséget ad arra, hogy a megváltozott munkaképességű emberek értékteremtő módon kapcsolódjanak a közösséghez."
        ]
      },
      {
        heading: "Stabilitás és emberi méltóság",
        paragraphs: [
          "A kiszámítható, támogató munkakörnyezet hozzájárul az életminőség javításához, az önbizalom erősödéséhez és a hosszú távú társadalmi integrációhoz."
        ]
      }
    ]
  },
  {
    id: "fenntarthatosag-blog",
    type: "blog",
    title: "Fenntarthatóság a mindennapi működésben",
    date: "2026. április 22.",
    category: "fenntarthatosag",
    categoryLabel: "Fenntarthatóság",
    image: "../../img/hirek/blog/blog-2.webp",
    excerpt:
      "Hogyan jelenhet meg a felelős működés egy modern rehabilitációs vállalat életében?",
    content: [
      {
        heading: "Felelős működés",
        paragraphs: [
          "A fenntartható működés a vállalati gondolkodás fontos része: egyszerre jelenti az erőforrások tudatos használatát, a minőségi munkavégzést és a társadalmi felelősségvállalást.",
          "Egy modern vállalat számára a fenntarthatóság nem különálló cél, hanem a mindennapi döntések része."
        ]
      },
      {
        heading: "Hosszú távú szemlélet",
        paragraphs: [
          "A stabil, értékteremtő működéshez olyan megoldásokra van szükség, amelyek egyszerre támogatják a gazdasági, környezeti és társadalmi szempontokat."
        ]
      }
    ]
  },
  {
    id: "mindennapi-tortenetek-blog",
    type: "blog",
    title: "Mindennapi történetek egy befogadó munkahelyről",
    date: "2026. március 15.",
    category: "tortenetek",
    categoryLabel: "Történetek",
    image: "../../img/hirek/blog/blog-3.webp",
    excerpt:
      "Emberi történetek, közösségi értékek és mindennapi tapasztalatok egy értékteremtő vállalat életéből.",
    content: [
      {
        heading: "A mindennapok értéke",
        paragraphs: [
          "Egy befogadó munkahely ereje a mindennapi együttműködésekben, apró sikerekben és közös célokban mutatkozik meg.",
          "A SZEFO közössége számára fontos, hogy minden munkatárs értékes részese legyen a vállalat működésének."
        ]
      },
      {
        heading: "Közös célok",
        paragraphs: [
          "A közös munka, a szakmai támogatás és az egymás iránti figyelem olyan alapot teremt, amely hosszú távon is erősíti a vállalati közösséget."
        ]
      }
    ]
  }
];

const NEWS_BLOG_FILTERS = {
  news: [
    { id: "all", label: "Összes hír" },
    { id: "ceges", label: "Céges hírek" },
    { id: "kozosseg", label: "Közösség" },
    { id: "esemeny", label: "Események" }
  ],
  blog: [
    { id: "all", label: "Összes blog" },
    { id: "szakmai", label: "Szakmai blog" },
    { id: "fenntarthatosag", label: "Fenntarthatóság" },
    { id: "tortenetek", label: "Történetek" }
  ]
};

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
    const filters = NEWS_BLOG_FILTERS[activeType] || [];

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
      return `
        <section class="news-blog-detail-section">
          <h3>${escapeHtml(section.heading)}</h3>
          ${section.paragraphs
            .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
            .join("")}
        </section>
      `;
    })
    .join("");

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