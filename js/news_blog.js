/* =========================================================
   SZEFO.HU – HÍREK + BLOG MINI-SPA
   Fájl: js/news_blog.js

   Működés:
   - Hírek / Blog váltás
   - kategóriaszűrés
   - keresés
   - helyben olvasható részletes nézet
========================================================= */

// Itt található az összes hír és blogbejegyzés tényleges szövege (cím, dátum,
// kategória, rövid kivonat, teljes szöveg). Új hír vagy blogbejegyzés
// közzétételéhez ide kell felvenni egy újabb elemet a listába.
// Az opcionális imagePosition mezővel (CSS object-position érték, pl.
// "center bottom") megadható, merre igazodjon a kép vágása, ha a kép fontos
// része (pl. egy felirat) nem középen van.
const SZEFO_NEWS_BLOG_CONTENT = [
  {
    id: "rehabilitacios-foglalkoztatas-a-gyakorlatban",
    type: "blog",
    title: "Rehabilitációs foglalkoztatás a gyakorlatban – HR-hallgatók a SZEFO-nál",
    date: "2026. március 18.",
    category: "szakmai",
    categoryLabel: "Szakmai blog",
    image: "../../img/hirek/hir/szte-hallgatok-latogatas.webp",
    imageCredit: "Fotó: SZEFO Közhasznú Nonprofit Zrt.",
    excerpt:
      "Mit jelent valójában a befogadó munkahely? Hogyan működik a rehabilitációs foglalkoztatás a mindennapokban? És milyen kihívásokkal találkozik egy megváltozott munkaképességű munkavállaló?",
    featured: true,
    content: [
      {
        paragraphs: [
          "A Szegedi Tudományegyetem Juhász Gyula Pedagógusképző Karának Emberi erőforrás tanácsadó szakos hallgatói tanulmányaik gyakorlati részeként látogattak el a SZEFO-hoz. A program célja az volt, hogy személyesen is megismerjék egy rehabilitációs foglalkoztató működését, és első kézből szerezzenek tapasztalatokat a befogadó foglalkoztatásról."
        ]
      },
      {
        heading: "Amit nem lehet egy prezentációból megtanulni",
        paragraphs: [
          "A találkozó nem hagyományos előadás volt: kötetlen, interaktív szakmai beszélgetés alakult ki a hallgatók és a SZEFO szakemberei között.",
          "A beszélgetést a társaság vezető rehabilitációs tanácsadója vezette, aki több évtizedes tapasztalattal rendelkezik a rehabilitációs foglalkoztatás területén. Gyakorlati példákon keresztül mutatta be, miért fontos az egyéni képességek és szükségletek figyelembevétele a munkaszervezésben.",
          "A SZEFO-nál például előfordult, hogy látássérült munkatársaknak bizonyos összeszerelési folyamatok nehézséget okoztak, más munkafázisokban viszont gyorsabban és precízebben teljesítettek, mint látó kollégáik.",
          "A példa jól mutatja: a rehabilitációs foglalkoztatásban nem kizárólag a korlátokra, hanem az egyéni képességekre és erősségekre is építeni kell. Az egyik munkatárs abban a feladatban lehet különösen hatékony, amelyben másnak nehézséget okoz a munkavégzés – és fordítva.",
          "Ehhez pedig nem elég ismerni a munkakört. Ismerni kell az embert is."
        ]
      },
      {
        heading: "A rehabilitáció a munkahelyen túl is fontos",
        paragraphs: [
          "A beszélgetés során szó esett arról is, hogy a rehabilitációs foglalkoztatás jóval összetettebb a munkafeladatok megszervezésénél.",
          "A megváltozott munkaképességű munkatársak életében is adódhatnak olyan nehéz helyzetek – egészségügyi problémák, családi nehézségek vagy más élethelyzetek –, amelyek a munkavégzésre is hatással lehetnek.",
          "Ilyenkor különösen fontos a bizalmi kapcsolat a munkatárs és a rehabilitációs mentor vagy tanácsadó között. A munkatársak számára sokat jelenthet, ha tudják, hogy problémáikkal van kihez fordulniuk, és segítséget, támogatást kaphatnak."
        ]
      },
      {
        heading: "Két hiteles nézőpont",
        paragraphs: [
          "A hallgatók nemcsak a rehabilitációs szakember tapasztalatait ismerhették meg. A programban olyan SZEFO-s munkatárs is részt vett, aki maga is fogyatékossággal élő, megváltozott munkaképességű munkavállaló.",
          "Így a hallgatók szakmai és személyes nézőpontból egyaránt képet kaphattak arról, mit jelent a mindennapokban a megváltozott munkaképességű emberek foglalkoztatása.",
          "A kérdésekből hamar valódi párbeszéd alakult ki. A hallgatókat többek között az érdekelte, hogyan lehet megtalálni a megfelelő munkakört, mi történik, ha megváltozik egy munkavállaló állapota, és hogyan lehet összehangolni az egyéni szükségleteket a munkáltató elvárásaival.",
          "A személyes tapasztalatok és a gyakorlati példák olyan kérdéseket is megnyitottak, amelyekre egy hagyományos előadás nem feltétlenül ad választ."
        ]
      },
      {
        heading: "A gyárlátogatás is fontos része volt a programnak",
        paragraphs: [
          "A szakmai beszélgetést gyárlátogatás követte. A hallgatók megismerhették a SZEFO székhelyén több mint 70 éve működő kötöttáru-gyártás munkafolyamatait, az üzemegységeket és munkatársainkat.",
          "Így a rehabilitációs foglalkoztatást nemcsak elméleti szempontból, hanem valós munkahelyi környezetben is megtapasztalhatták.",
          "Bízunk benne, hogy amikor a jövőben HR-szakemberként megváltozott munkaképességű munkatársakkal dolgoznak majd, eszükbe jutnak az itt hallottak és tapasztaltak.",
          "Hogy ne csak arra fókuszáljanak, milyen akadályokkal kell számolni, hanem arra is, hogyan tudják megfelelő munkakörnyezettel, támogatással és odafigyeléssel segíteni a munkatársat abban, hogy képességeit, tudását és tehetségét kibontakoztathassa a munkája során.",
          "Mindez ugyanakkor nem jelenti a nehézségek figyelmen kívül hagyását. A befogadó szemlélethez az is hozzátartozik, hogy a munkatársak egyéni nehézségeit komolyan vegyük, és keressük azokat a megoldásokat, amelyekkel ezek mellett is lehetőséget teremthetünk a sikeres munkavégzésre.",
          "Mert egy inkluzív munkahely emberekről szól, akik szeretnének dolgozni, értéket teremteni, közösséghez tartozni – és arról, hogy ehhez megkapják a megfelelő lehetőséget és támogatást.",
          "A SZEFO számára ezért is különösen fontos, hogy ezt a szemléletet a jövő HR-szakemberei is megismerjék, és szakmai pályájuk során magukkal vigyék."
        ]
      }
    ]
  },
  {
    id: "ausztralia-messze-van",
    type: "blog",
    title: "Ausztrália messze van – de a lehetőség közelebb, mint gondolnánk",
    date: "2026. szeptember 4.",
    category: "szakmai",
    categoryLabel: "Szakmai blog",
    image: "../../img/hirek/blog/ausztralia-messze-van.webp",
    imagePosition: "center bottom",
    imageCredit: "Fotó: SZEFO Közhasznú Nonprofit Zrt.",
    excerpt:
      "Egy európai gyártóvállalat számára Ausztrália első pillantásra távoli piacnak tűnik.",
    featured: false,
    content: [
      {
        paragraphs: [
          "Egy európai gyártóvállalat számára Ausztrália első pillantásra távoli piacnak tűnik. Több mint 15 000 kilométer, jelentős időeltolódás, hosszú logisztikai útvonalak és egy teljesen más üzleti környezet választ el bennünket egymástól. Mégis éppen egy ilyen megkeresés mutatja meg, hogy a SZEFO előtt álló lehetőségeket ma már nem feltétlenül földrajzi határok határozzák meg.",
          "A közelmúltban egy ausztrál prémium divatpiaci szereplő keresett meg bennünket egy lehetséges európai gyártási együttműködés kapcsán. A tárgyalások még kezdeti szakaszban vannak, ezért korai lenne eredményekről beszélni. Arra azonban már most érdemes rávilágítani, hogy egy ilyen lehetőség milyen kihívásokat – és egyben milyen fejlődési lehetőségeket – jelenthet a SZEFO számára."
        ]
      },
      {
        heading: "A prémium piac nem kizárólag árról szól",
        paragraphs: [
          "Az európai gyártás egyik legnagyobb kihívása a globális verseny. Költségben nem minden esetben tudunk és nem is feltétlenül akarunk versenyezni a világ legalacsonyabb költségű gyártóival.",
          "A prémium szegmensben azonban más tényezők is meghatározóak: a minőség, a rugalmasság, a kis szériák gyártásának képessége, a rövid reakcióidő, a megbízhatóság, az átlátható európai beszállítói háttér és a magas szintű szakmai tudás.",
          "Ebben a környezetben a SZEFO több évtizedes textilipari tapasztalata valódi értéket képviselhet."
        ]
      },
      {
        heading: "Kis széria, nagy elvárások",
        paragraphs: [
          "A prémium divatipar egyik sajátossága, hogy sok esetben viszonylag alacsony darabszámok mellett vár el kiemelkedő minőséget és magas fokú rugalmasságot.",
          "Ez gyártási oldalról komoly kihívás.",
          "Egy 25–50 darabos széria megszervezése fajlagosan sokszor több figyelmet igényel, mint egy több ezres rendelés. Gyakoribbak az átállások, nagyobb szerepet kap a mintagyártás és az előkészítés, miközben ugyanazt a minőségi szintet kell biztosítani minden egyes terméknél.",
          "Ehhez nem pusztán megfelelő gépek szükségesek. Tapasztalt és rugalmas munkatársakra, jól működő folyamatokra és gyors döntéshozatalra is szükség van."
        ]
      },
      {
        heading: "Több mint bérgyártás",
        paragraphs: [
          "Az igazán érdekes lehetőség számunkra azonban az, ha a SZEFO nem egyszerűen gyártókapacitást kínál.",
          "Egyre több potenciális partner olyan beszállítót keres, amely képes részt venni az alapanyagok beszerzésében, kapcsolatot tart európai fonal- és textilgyártókkal, támogatni a termékfejlesztést, mintadarabokat készíteni, majd megszervezni a teljes gyártási folyamatot.",
          "Ez már egy magasabb hozzáadott értékű szerep.",
          "A célunk ezért az, hogy a SZEFO a jövőben ne egyszerűen azt tudja mondani egy potenciális partnernek, hogy „ezt le tudjuk gyártani”, hanem azt is, hogy „segítünk megoldani a teljes gyártási feladatot”."
        ]
      },
      {
        heading: "A távolság újfajta működést követel",
        paragraphs: [
          "Ausztrália esetében természetesen a földrajzi távolság sem hagyható figyelmen kívül.",
          "A minták küldése, az alapanyagok beszerzése, a késztermékek szállítása és a határidők összehangolása lényegesen nagyobb tervezési fegyelmet követel. Még egy videókonferencia megszervezésénél is figyelembe kell vennünk a nyolcórás időeltolódást.",
          "Ez azonban nem feltétlenül hátrány.",
          "A digitalizált kommunikáció, a megfelelő dokumentáció és a professzionális projektmenedzsment ma már lehetővé teszi, hogy egy szegedi gyártó ugyanolyan közvetlen kapcsolatban dolgozzon egy melbourne-i partnerrel, mint egy európai megrendelővel."
        ]
      },
      {
        heading: "A legfontosabb kérdés: készen állunk-e?",
        paragraphs: [
          "Egy ilyen megkeresés számunkra egyelőre nem megrendelést, hanem egy fontos tesztet jelent: képesek vagyunk-e megfelelni egy távoli prémium piac elvárásainak?",
          "Képesek vagyunk-e gyorsan reagálni?",
          "Képesek vagyunk-e kis szériában is versenyképesen gyártani?",
          "Képesek vagyunk-e a prémium piac által elvárt minőséget következetesen biztosítani?",
          "Képesek vagyunk-e beszállítóból valódi gyártási partnerré válni?",
          "Ezekre a kérdésekre nem egy tárgyalás során kell választ adnunk, hanem a mindennapi működésünkkel.",
          "A SZEFO több mint hetvenéves gyártási tapasztalattal rendelkezik, miközben társadalmi küldetést is teljesít: munkalehetőséget biztosít megváltozott munkaképességű emberek számára. Számunkra ezért minden új piac és minden új partner kettős jelentőséggel bír.",
          "Az üzleti siker nálunk egyben munkahelyek stabilitását és új lehetőségek megteremtését is jelenti.",
          "Ausztrália valóban messze van Szegedtől.",
          "De ha a megfelelő tudással, minőséggel és rugalmassággal rendelkezünk, akkor a világ egyetlen prémium piaca sem feltétlenül túl távoli számunkra."
        ]
      }
    ]
  },
  {
    id: "szte-hallgatok-latogatas",
    type: "news",
    title: "Az SZTE hallgatói a rehabilitációs foglalkoztatással ismerkedtek a SZEFO-nál",
    date: "2026. március 18.",
    category: "esemeny",
    categoryLabel: "Események",
    image: "../../img/hirek/hir/szte-hallgatok-latogatas.webp",
    imageCredit: "Fotó: SZEFO Közhasznú Nonprofit Zrt.",
    excerpt:
      "A Szegedi Tudományegyetem Juhász Gyula Pedagógusképző Karának Emberi erőforrás tanácsadó szakos hallgatóit fogadta a SZEFO Közhasznú Nonprofit Zrt.",
    featured: true,
    content: [
      {
        paragraphs: [
          "A Szegedi Tudományegyetem Juhász Gyula Pedagógusképző Karának Emberi erőforrás tanácsadó szakos hallgatóit fogadta a SZEFO Közhasznú Nonprofit Zrt. A látogatás célja az volt, hogy a hallgatók gyakorlati betekintést kapjanak a rehabilitációs foglalkoztatás működésébe és egy befogadó munkahely mindennapjaiba.",
          "A program során a SZEFO vezető rehabilitációs tanácsadója osztotta meg több évtizedes szakmai tapasztalatait a megváltozott munkaképességű munkavállalók foglalkoztatásának kihívásairól és a sikeres rehabilitációs foglalkoztatást segítő jó gyakorlatokról.",
          "A szakmai beszélgetést gyárlátogatás követte, amely során a hallgatók megismerhették a SZEFO működését, bepillantást nyerhettek a mindennapi munkafolyamatokba, és személyesen is találkozhattak munkatársainkkal.",
          "A SZEFO számára fontos, hogy megoszthassa a rehabilitációs foglalkoztatás terén szerzett tapasztalatait a jövő szakembereivel, és hozzájáruljon egy nyitottabb, befogadóbb munkaerőpiac kialakításához."
        ]
      }
    ]
  },
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
    featured: false,
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

// Visszaadja, hogy az adott típushoz (hírek vagy blog) milyen kategória-
// szűrőgombokat kell megjeleníteni – lásd a fenti komment: csak azok
// jelennek meg, amelyekhez ténylegesen tartozik legalább egy bejegyzés.
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

// Megmondja, van-e egyáltalán feltöltött tartalom az adott típushoz
// (hírek vagy blog) – ha nincs, a "Blogok feltöltése folyamatban" üzenet
// jelenik meg a "nincs találat" szöveg helyett.
function hasContentOfType(type) {
  return SZEFO_NEWS_BLOG_CONTENT.some((item) => item.type === type);
}

document.addEventListener("DOMContentLoaded", () => {
  initNewsBlogPage();
});

// A Hírek és blog oldal működését indítja el: beolvassa az oldalon lévő
// elemeket, majd bekapcsolja a fülváltást, a kategóriaszűrést, a keresést
// és a "Tovább olvasom" gombra megnyíló részletes nézetet.
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

  // Ha az oldalon hiányzik bármelyik szükséges elem, a szkript leáll –
  // ez védi ki, hogy hibás oldalszerkezet esetén ne fusson feleslegesen.
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

// Ha a link végén ?type=blog vagy ?q=keresett+szó szerepel (pl. egy külső
// hivatkozásból érkezve), az oldal ezzel a beállítással, ill. kereséssel nyílik meg.
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

  // Újrarajzolja a látható tartalmat a jelenlegi fül, szűrő, keresés és
  // kiválasztott cikk alapján. Gyakorlatilag minden felhasználói művelet
  // (fülváltás, szűrés, keresés, cikk megnyitása/bezárása) ezt hívja meg.
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

    const featuredItem = renderFeatured(items);
    renderCards(items, featuredItem);
    renderEmptyState(items);
  }

  // Kiválogatja azokat a hír-/blogbejegyzéseket, amelyek megfelelnek a
  // jelenleg kiválasztott fülnek (hírek/blog), kategóriaszűrőnek és a
  // keresőmezőbe beírt szövegnek.
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

  // Kiemeli (aktívra állítja) a Hírek vagy Blog fület, amelyik éppen látszik
  function renderTabs() {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.newsBlogType === activeType;

      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
  }

  // Legenerálja és megjeleníti a kategóriaszűrő gombokat (pl. "Céges hírek")
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

  // Megjeleníti a listából kiemelt (featured) cikket egy nagyobb, önálló
  // kártyán a lista tetején; ha nincs külön kiemelt cikk, az elsőt mutatja.
  // Visszaadja a kiemelt helyre került cikket, hogy a rács kihagyhassa.
  function renderFeatured(items) {
    const featuredItem = items.find((item) => item.featured) || items[0];

    if (!featuredItem) {
      featuredContainer.innerHTML = "";
      return null;
    }

    featuredContainer.innerHTML = createFeaturedCard(featuredItem);
    return featuredItem;
  }

  // A kiemelt helyen már látható cikken kívüli többi találatot jeleníti meg
  // kártyák rácsában. Nem elég a featured jelölést nézni: ha szűréskor vagy
  // kereséskor a kiemelt cikk kiesik, a lista első eleme kerül a kiemelt
  // helyre, és az nem jelenhet meg még egyszer a rácsban.
  function renderCards(items, featuredItem) {
    const normalItems = items.filter((item) => item !== featuredItem);

    resultsContainer.innerHTML = normalItems
      .map((item) => createContentCard(item))
      .join("");
  }

  // A "Nincs találat" üzenetet csak akkor mutatja, ha valóban nincs egy
  // egyezés sem az aktuális szűrésre/keresésre
  function renderEmptyState(items) {
    emptyState.hidden = items.length > 0;
  }

  // Megnyitja egy adott cikk teljes, helyben olvasható nézetét (nem
  // navigál el másik oldalra), és odagörget a tartalomhoz
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

  // Bezárja a részletes cikknézetet, és visszatér a lista nézetéhez
  function closeDetail() {
    activeDetailId = null;
    render();

    app.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  // Felépíti és megjeleníti a kiválasztott cikk teljes szövegét, a lista és
  // a szűrők elrejtése mellett
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

  // Fülre kattintva (Hírek/Blog) váltunk típust, és minden szűrés/keresés/
  // megnyitott cikk visszaáll alapállapotba
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

  // Kategóriaszűrő gombra kattintva csak az adott kategória bejegyzései
  // maradnak láthatók
  filtersContainer.addEventListener("click", (event) => {
    const button = event.target.closest("[data-news-blog-category]");
    if (!button) return;

    activeCategory = button.dataset.newsBlogCategory || "all";
    activeDetailId = null;

    render();
  });

  // Gépelés közben, folyamatosan szűri a listát a beírt szöveg alapján
  searchInput?.addEventListener("input", () => {
    activeSearch = searchInput.value.trim();
    activeDetailId = null;

    render();
  });

  // A "Tovább olvasom" és a "Vissza a listához" gombok kattintását figyeli
  // (mindkettő a kártyák/részletnézet dinamikusan generált HTML-jében van)
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

// Legyártja a kiemelt cikk HTML-jét (kép, kategória, dátum, cím, kivonat,
// "Tovább olvasom" gomb)
function createFeaturedCard(item) {
  return `
    <article class="news-blog-featured-card">
      <figure class="news-blog-featured-image">
        <img
          src="${escapeAttribute(item.image)}"
          alt="${escapeAttribute(item.title)}"
          loading="lazy"
          decoding="async"
          ${imagePositionStyle(item)}
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

// Legyártja egy szokásos (nem kiemelt) hír-/blogkártya HTML-jét
function createContentCard(item) {
  return `
    <article class="news-blog-card">
      <figure class="news-blog-card-image">
        <img
          src="${escapeAttribute(item.image)}"
          alt="${escapeAttribute(item.title)}"
          loading="lazy"
          decoding="async"
          ${imagePositionStyle(item)}
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

// Legyártja egy cikk teljes, részletes nézetének HTML-jét (visszalink,
// fejléc, kép, majd az összes szövegbekezdés szakaszonként)
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
        ${imagePositionStyle(item)}
      >
      ${creditHtml}
    </figure>

    <div class="news-blog-detail-content">
      ${contentHtml}
    </div>
  `;
}

// Opcionális képigazítás: ha a bejegyzésnél meg van adva az imagePosition
// (CSS object-position érték, pl. "center bottom"), a kép vágása arra igazodik
// a kártyákon és a részletes nézetben; enélkül a CSS szerinti középre
// igazítás marad érvényben.
function imagePositionStyle(item) {
  return item.imagePosition
    ? `style="object-position: ${escapeAttribute(item.imagePosition)}"`
    : "";
}

// A keresést ékezet- és kis-/nagybetű-érzéketlenné teszi (pl. "esemeny"
// is megtalálja az "esemény" szót tartalmazó cikkeket)
function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9áéíóöőúüű\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Biztonsági célú segédfüggvény: a cikkek szövegében esetlegesen szereplő
// <, >, & stb. jeleket ártalmatlan formára cseréli, mielőtt a szöveg
// HTML-ként bekerülne az oldalba – ez védi ki a rosszindulatú kódbeszúrást.
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Ugyanaz, mint az escapeHtml, de HTML-attribútumokba (pl. src="...") kerülő
// szövegekhez, ahol a backtick (`) karaktert is le kell cserélni
function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}