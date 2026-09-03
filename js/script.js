/* =========================================================
   SZEFO.HU – KÖZÖS JAVASCRIPT / REFAKTORÁLT VÁLTOZAT
   Fájl: js/script.js

   Szerepe:
   - offcanvas menü
   - hero / ISO carousel
   - oldalváltás animáció
   - vezérigazgatói köszöntő
   - számláló animációk
   - timeline
   - business / units / ISO kártyák
   - közös részletező modal + egy kép
   - e-hulladék galéria
   - karrier modal
   - kereső űrlap átirányítás
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  [
    initOffcanvasMenu,
    initHeroCarousel,
    initIsoCarousel,
    initSmoothPageLinks,
    initCeoBlock,
    initFactsAnimation,
    initVisionAnimation,
    initTimeline,
    initBusinessCards,
    initUnitsCards,
    initBusinessDetailsModal,
    initEwasteGallery,
    initCareerJobsModal,
    initSearchForm
  ].forEach((init) => init());
});

/* =========================================================
   SEGÉDFÜGGVÉNYEK
========================================================= */

const SELECTOR_FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

function setBodyLocked(isLocked) {
  document.body.style.overflow = isLocked ? "hidden" : "";
}

/*
   A style.css már kikapcsolja az animációkat, ha a felhasználó
   csökkentett mozgást kért, de a carousel léptetése JS-ből jön,
   ezért azt itt kell külön leállítani.
   A matchMedia élőben kérdez, így a beállítás menet közbeni
   módosítása is azonnal érvényesül.
*/
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isVisible(element) {
  if (!element) return false;

  return (
    element.offsetWidth > 0 ||
    element.offsetHeight > 0 ||
    element === document.activeElement
  );
}

function getFocusableElements(scope) {
  return qsa(SELECTOR_FOCUSABLE, scope).filter(isVisible);
}

function trapFocus(event, container) {
  if (event.key !== "Tab") return;

  const focusableElements = getFocusableElements(container);
  if (!focusableElements.length) {
    event.preventDefault();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  }

  if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

function scrollToElement(element, offset = 80) {
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({
    top,
    behavior: "smooth"
  });
}

/* =========================================================
   1. OFFCANVAS MENÜ
========================================================= */

/*
   Asztali nézetben (1025 px felett) a menü vízszintes sávban ül a logó
   mellett: nincs hamburger, nincs kicsúszó panel, a lenyílók lefelé
   nyílnak. Alatta marad a kicsúszó offcanvas.

   A töréspont a style.css `min-width: 1025px` szabályával van
   összehangolva – ha ott változik, ezt is át kell írni, különben a
   kettő szétcsúszik.
*/
const ASZTALI_MENU_TORESPONT = window.matchMedia("(min-width: 1025px)");

function initOffcanvasMenu() {
  const menuToggle = qs("#menuToggle");
  const offcanvas = qs("#offcanvasMenu");
  const closeMenu = qs("#closeMenu");
  const backdrop = qs("#backdrop");

  if (!menuToggle || !offcanvas || !closeMenu || !backdrop) return;

  const dropdownButtons = qsa(".dropdown-toggle", offcanvas);
  const menuLinks = qsa(".menu a", offcanvas);

  const asztali = () => ASZTALI_MENU_TORESPONT.matches;

  /*
     Mobilon a zárt panel csak kicsúszik a képernyőről, de a DOM-ban
     marad, így a benne lévő linkek alapból fókuszálhatók maradnának:
     billentyűzettel végig lehetne tabolni a láthatatlan menüponton.
     Az inert egyszerre veszi ki az elemet a tabsorrendből és
     a képernyőolvasó elől.

     Asztalon viszont a menü végig látható, ott az inert épp a
     billentyűzetes használatot lehetetlenítené el – ezért ott soha
     nem tesszük rá.
  */
  function setMenuInert(isInert) {
    if (isInert && !asztali()) {
      offcanvas.setAttribute("inert", "");
    } else {
      offcanvas.removeAttribute("inert");
    }
  }

  function openMenu() {
    if (asztali()) return;

    offcanvas.classList.add("open");
    backdrop.classList.add("show");

    setBodyLocked(true);

    menuToggle.setAttribute("aria-expanded", "true");
    offcanvas.setAttribute("aria-hidden", "false");
    setMenuInert(false);

    closeMenu.focus({ preventScroll: true });
  }

  function closeMenuPanel() {
    if (asztali()) {
      closeDropdowns();
      return;
    }

    // A fókuszt még az inert előtt ki kell hozni, különben a body-ra esik
    if (offcanvas.contains(document.activeElement)) {
      menuToggle.focus({ preventScroll: true });
    }

    offcanvas.classList.remove("open");
    backdrop.classList.remove("show");

    setBodyLocked(false);

    menuToggle.setAttribute("aria-expanded", "false");
    offcanvas.setAttribute("aria-hidden", "true");
    setMenuInert(true);

    closeDropdowns();
  }

  function closeDropdowns() {
    dropdownButtons.forEach((button) => {
      const dropdown = button.closest(".dropdown");
      if (!dropdown) return;

      dropdown.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    });
  }

  /*
     A töréspont átlépésekor rendet kell rakni: ami mobilon nyitva
     maradt, az asztali sávban ottragadna, és fordítva – az asztali
     nézetből érkező aria-hidden="false" mobilon elrejtetlenül hagyná
     a kicsúszott panelt.
  */
  function alkalmazNezet() {
    closeDropdowns();

    offcanvas.classList.remove("open");
    backdrop.classList.remove("show");
    setBodyLocked(false);
    menuToggle.setAttribute("aria-expanded", "false");

    if (asztali()) {
      offcanvas.setAttribute("aria-hidden", "false");
      offcanvas.removeAttribute("inert");
    } else {
      offcanvas.setAttribute("aria-hidden", "true");
      setMenuInert(true);
    }
  }

  /*
     A töréspontot két forrásból is figyeljük. A matchMedia "change"
     eseménye a szabályos út, de nem minden környezetben sül el
     megbízhatóan – ha kimarad, az asztali menü inert állapotban
     ragadna, vagyis billentyűzettel és képernyőolvasóval használhatatlan
     lenne. A resize csak akkor csinál bármit, ha tényleg átléptük a
     határt, így nincs fölösleges munka görgetés/átméretezés közben.
  */
  let elozoAsztali = asztali();

  function nezetFrissites() {
    const mostAsztali = asztali();
    if (mostAsztali === elozoAsztali) return;

    elozoAsztali = mostAsztali;
    alkalmazNezet();
  }

  alkalmazNezet();
  ASZTALI_MENU_TORESPONT.addEventListener("change", nezetFrissites);
  window.addEventListener("resize", nezetFrissites);

  /*
     Harmadik háló. Ha a fenti két esemény valamiért kimarad, az asztali
     menü inert állapotban ragadna: látszik, de billentyűzettel nem
     elérhető és a képernyőolvasó sem látja. A ResizeObserver a
     gyökérelem méretét figyeli, ami a nézetablakkal együtt változik, és
     megbízhatóbban jelez, mint a resize esemény. A nezetFrissites úgyis
     kilép, ha nem történt tényleges töréspontváltás.
  */
  if (typeof ResizeObserver === "function") {
    new ResizeObserver(nezetFrissites).observe(document.documentElement);
  }

  menuToggle.addEventListener("click", openMenu);
  closeMenu.addEventListener("click", closeMenuPanel);
  backdrop.addEventListener("click", closeMenuPanel);

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" && !offcanvas.classList.contains("open")) return;

    if (asztali()) {
      // Asztalon az Escape a nyitott lenyílót zárja, és visszaadja
      // a fókuszt a gombjára, hogy ne vesszen el.
      if (event.key !== "Escape") return;

      const nyitott = offcanvas.querySelector(".dropdown.open");
      if (!nyitott) return;

      const gomb = qs(".dropdown-toggle", nyitott);
      closeDropdowns();
      gomb?.focus({ preventScroll: true });
      return;
    }

    if (!offcanvas.classList.contains("open")) return;

    if (event.key === "Escape") {
      closeMenuPanel();
      return;
    }

    trapFocus(event, offcanvas);
  });

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const dropdown = button.closest(".dropdown");
      if (!dropdown) return;

      event.stopPropagation();

      const nyit = !dropdown.classList.contains("open");

      // Asztalon egyszerre csak egy lenyíló legyen nyitva, különben
      // két panel takarná egymást. Mobilon marad a régi viselkedés.
      if (asztali()) closeDropdowns();

      dropdown.classList.toggle("open", nyit);
      button.setAttribute("aria-expanded", String(nyit));
    });
  });

  // Asztalon a sávon kívülre kattintva záruljon a lenyíló.
  document.addEventListener("click", (event) => {
    if (!asztali()) return;
    if (event.target.closest(".dropdown")) return;

    closeDropdowns();
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenuPanel);
  });
}

/* =========================================================
   2. ÁLTALÁNOS CAROUSEL
========================================================= */

function createCarousel({
  slideSelector,
  nextSelector,
  prevSelector,
  activeClass = "active",
  autoplay = true,
  interval = 5000
}) {
  const slides = qsa(slideSelector);
  const nextButton = qs(nextSelector);
  const prevButton = qs(prevSelector);

  if (!slides.length) return;

  let currentIndex = Math.max(
    0,
    slides.findIndex((slide) => slide.classList.contains(activeClass))
  );

  let intervalId = null;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentIndex;

      slide.classList.toggle(activeClass, isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
  }

  function goToNextSlide() {
    showSlide(currentIndex + 1);
  }

  function goToPrevSlide() {
    showSlide(currentIndex - 1);
  }

  function stopAutoplay() {
    if (!intervalId) return;

    clearInterval(intervalId);
    intervalId = null;
  }

  function startAutoplay() {
    if (!autoplay || slides.length <= 1 || intervalId) return;
    if (prefersReducedMotion()) return;

    intervalId = setInterval(goToNextSlide, interval);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  showSlide(currentIndex);
  startAutoplay();

  nextButton?.addEventListener("click", () => {
    goToNextSlide();
    restartAutoplay();
  });

  prevButton?.addEventListener("click", () => {
    goToPrevSlide();
    restartAutoplay();
  });

  slides.forEach((slide) => {
    slide.addEventListener("mouseenter", stopAutoplay);
    slide.addEventListener("mouseleave", startAutoplay);
    slide.addEventListener("focusin", stopAutoplay);
    slide.addEventListener("focusout", startAutoplay);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });
}

function initHeroCarousel() {
  createCarousel({
    slideSelector: ".hero-slide",
    nextSelector: ".hero-next",
    prevSelector: ".hero-prev",
    autoplay: true,
    interval: 5000
  });
}

function initIsoCarousel() {
  createCarousel({
    slideSelector: ".iso-slide",
    nextSelector: ".iso-next",
    prevSelector: ".iso-prev",
    autoplay: true,
    interval: 5000
  });
}

/* =========================================================
   3. OLDALVÁLTÁS / FADE
========================================================= */

function initSmoothPageLinks() {
  document.body.classList.add("page-fade-in");

  qsa("a[data-smooth-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetUrl = link.getAttribute("href");

      if (
        !targetUrl ||
        targetUrl === "#" ||
        link.target === "_blank" ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      event.preventDefault();

      document.body.classList.add("page-fade-out");

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 600);
    });
  });
}

/* =========================================================
   4. VEZÉRIGAZGATÓI KÖSZÖNTŐ
========================================================= */

function initCeoBlock() {
  const preview = qs(".ceo-preview");
  const full = qs(".ceo-full");
  const openButton = qs(".ceo-btn");
  const backButton = qs(".back-btn");

  if (!preview || !full || !openButton || !backButton) return;

  const originalTitle = document.title;

  preview.classList.remove("ceo-hidden");
  full.classList.add("ceo-hidden");
  full.style.display = "none";

  openButton.setAttribute("aria-expanded", "false");

  openButton.addEventListener("click", (event) => {
    event.preventDefault();

    preview.classList.add("ceo-hidden");

    setTimeout(() => {
      preview.style.display = "none";
      full.style.display = "block";

      requestAnimationFrame(() => {
        full.classList.remove("ceo-hidden");
      });

      openButton.setAttribute("aria-expanded", "true");
      document.title = "Vezérigazgatói köszöntő | SZEFO Közhasznú Nonprofit Zrt.";

      scrollToElement(full, 80);
    }, 300);
  });

  backButton.addEventListener("click", () => {
    full.classList.add("ceo-hidden");

    setTimeout(() => {
      full.style.display = "none";
      preview.style.display = "block";

      requestAnimationFrame(() => {
        preview.classList.remove("ceo-hidden");
      });

      openButton.setAttribute("aria-expanded", "false");
      document.title = originalTitle;

      preview.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 300);
  });
}

/* =========================================================
   5. FŐBB ADATOK / SZÁMLÁLÓK
========================================================= */

function initFactsAnimation() {
  const section = qs(".facts-section");
  if (!section) return;

  const factItems = qsa(".fact-item");
  const factCards = qsa(".fact-card");
  const factNumbers = qsa(".fact-number");
  const pieProgress = qs(".pie .progress");
  const pieWrapper = qs(".facts-bottom");

  let hasStarted = false;

  function animateNumber(element) {
    const target = Number(element.dataset.target) || 0;
    const duration = 1600;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(target * easedProgress);

      element.textContent = currentValue.toLocaleString("hu-HU");

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target.toLocaleString("hu-HU");
      }
    }

    requestAnimationFrame(update);
  }

  function animatePie() {
    if (!pieProgress || !pieWrapper) return;

    pieWrapper.classList.add("visible");

    const target = 74;
    const duration = 1600;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * easedProgress);

      pieProgress.style.strokeDasharray = `${value} 100`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        pieProgress.style.strokeDasharray = `${target} 100`;
      }
    }

    requestAnimationFrame(update);
  }

  function startFactsAnimation() {
    if (hasStarted) return;
    hasStarted = true;

    [...factItems, ...factCards].forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("visible");
      }, index * 150);
    });

    factNumbers.forEach((number, index) => {
      setTimeout(() => {
        animateNumber(number);
      }, 400 + index * 180);
    });

    setTimeout(animatePie, 900);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        startFactsAnimation();
        observer.unobserve(section);
      });
    },
    {
      threshold: 0.25
    }
  );

  observer.observe(section);
}

/* =========================================================
   6. VÍZIÓ BLOKK ANIMÁCIÓ
========================================================= */

function initVisionAnimation() {
  const section = qs(".vision-section");
  const image = qs(".vision-image");
  const content = qs(".vision-content");

  if (!section || !image || !content) return;

  function reveal() {
    image.classList.add("visible");

    setTimeout(() => {
      content.classList.add("visible");
    }, 250);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        reveal();
        observer.unobserve(section);
      });
    },
    {
      threshold: 0.25
    }
  );

  observer.observe(section);
}

/* =========================================================
   7. TIMELINE
========================================================= */

function initTimeline() {
  const timeline = qs("#timeline");
  const sections = qsa(".timeline-section");
  const yearItems = qsa(".year-item");
  const ticks = qsa(".timeline-tick");
  const track = qs(".timeline-years-track");
  const currentYearLabel = qs(".timeline-current-year");

  if (!timeline || !sections.length) return;

  function isTimelineVisible() {
    const rect = timeline.getBoundingClientRect();
    const styles = window.getComputedStyle(document.documentElement);
    const navbarHeight = parseInt(styles.getPropertyValue("--navbar-height"), 10) || 80;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    return rect.bottom > navbarHeight && rect.top < viewportHeight;
  }

  function updateCurrentYearLabel(year) {
    if (!currentYearLabel) return;

    const tick = qs(`.timeline-tick[data-year="${year}"]`);
    const yearButton = qs(`.year-item[data-year="${year}"]`);

    currentYearLabel.textContent =
      tick?.getAttribute("aria-label") ||
      yearButton?.textContent?.trim() ||
      year;
  }

  function showSection(year, shouldScroll = false) {
    if (!year) return;

    sections.forEach((section) => {
      const isActive = section.dataset.year === year;

      section.classList.toggle("active", isActive);
      section.setAttribute("aria-hidden", String(!isActive));
    });

    yearItems.forEach((item) => {
      const isActive = item.dataset.year === year;

      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    ticks.forEach((tick) => {
      const isActive = tick.dataset.year === year;

      tick.classList.toggle("active", isActive);
      tick.setAttribute("aria-selected", String(isActive));
    });

    if (shouldScroll && !isTimelineVisible()) {
      scrollToElement(timeline, 80);
    }

    if (track) {
      const activeTick = qs(`.timeline-tick.active[data-year="${year}"]`, track);
      activeTick?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    }

    updateCurrentYearLabel(year);
  }

  function moveTimelineControl(items, currentIndex, key) {
    let nextIndex = currentIndex;

    if (key === "ArrowRight") nextIndex = (currentIndex + 1) % items.length;
    if (key === "ArrowLeft") nextIndex = (currentIndex - 1 + items.length) % items.length;
    if (key === "Home") nextIndex = 0;
    if (key === "End") nextIndex = items.length - 1;

    const nextItem = items[nextIndex];
    const nextYear = nextItem?.dataset.year;

    if (!nextYear) return;

    nextItem.focus();
    showSection(nextYear, true);
  }

  yearItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      showSection(item.dataset.year, true);
    });

    item.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;

      event.preventDefault();
      moveTimelineControl(yearItems, index, event.key);
    });
  });

  ticks.forEach((tick, index) => {
    tick.setAttribute("tabindex", "0");
    tick.setAttribute("role", "option");
    tick.setAttribute("aria-selected", "false");

    tick.addEventListener("click", () => {
      showSection(tick.dataset.year, true);
    });

    tick.addEventListener("keydown", (event) => {
      if (!["Enter", " ", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;

      event.preventDefault();

      if (event.key === "Enter" || event.key === " ") {
        showSection(tick.dataset.year, true);
        return;
      }

      moveTimelineControl(ticks, index, event.key);
    });
  });

  const initialYear =
    qs(".year-item.active")?.dataset.year ||
    qs(".timeline-tick.active")?.dataset.year ||
    sections[0]?.dataset.year;

  showSection(initialYear, false);
}

/* =========================================================
   8. KERESŐ ŰRLAP – ÁTIRÁNYÍTÁS
========================================================= */

function initSearchForm() {
  const searchForms = qsa("form.search");
  if (!searchForms.length) return;

  searchForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const input = qs("input[type='search'], input[type='text']", form);
      const query = input?.value.trim();

      if (!query) return;

      const path = window.location.pathname;

      const searchPageUrl =
        path.endsWith("/hu/") || path.endsWith("/hu/index.html")
          ? "./kereses/index.html"
          : path.includes("/hu/")
            ? "../kereses/index.html"
            : "hu/kereses/index.html";

      window.location.href = `${searchPageUrl}?q=${encodeURIComponent(query)}`;
    });
  });
}

/* =========================================================
   9. KÖZÖS KÁRTYA NYITÁS / ZÁRÁS
========================================================= */

function initToggleCards({
  sectionSelector,
  cardSelector,
  openButtonSelector,
  closeButtonSelector
}) {
  const section = qs(sectionSelector);
  if (!section) return;

  function closeCard(card) {
    card.classList.remove("is-open");

    const button = qs(openButtonSelector, card);
    if (!button) return;

    button.setAttribute("aria-expanded", "false");
    button.textContent = "Bővebben";
  }

  function closeOtherCards(activeCard) {
    qsa(cardSelector, section).forEach((card) => {
      if (card !== activeCard) closeCard(card);
    });
  }

  section.addEventListener("click", (event) => {
    const openButton = event.target.closest(openButtonSelector);
    const closeButton = event.target.closest(closeButtonSelector);

    if (!openButton && !closeButton) return;

    event.preventDefault();
    event.stopPropagation();

    const card = event.target.closest(cardSelector);
    if (!card) return;

    if (closeButton) {
      closeCard(card);
      return;
    }

    const isOpen = card.classList.toggle("is-open");

    openButton.setAttribute("aria-expanded", String(isOpen));
    openButton.textContent = isOpen ? "Bezárás" : "Bővebben";

    if (isOpen) closeOtherCards(card);
  });
}

function initBusinessCards() {
  initToggleCards({
    sectionSelector: ".business-section",
    cardSelector: ".business-card",
    openButtonSelector: ".business-card-toggle",
    closeButtonSelector: ".business-card-close"
  });
}

function initUnitsCards() {
  initToggleCards({
    sectionSelector: ".units-section",
    cardSelector: ".units-card",
    openButtonSelector: ".units-card-toggle",
    closeButtonSelector: ".units-card-close"
  });
}

/* =========================================================
   10. BUSINESS / UNITS KÖZÖS MODAL
========================================================= */

function initBusinessDetailsModal() {
  const modal = qs("#businessModal");
  const modalContent = qs("#businessModalContent");

  if (!modal || !modalContent) return;

  let lastFocusedElement = null;

  function openBusinessModal(openButton) {
    const card = openButton.closest(".business-card, .units-card");
    const detailContent = qs(".business-detail-content", card);

    if (!detailContent) return;

    lastFocusedElement = openButton;

    modalContent.innerHTML = detailContent.innerHTML;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    setBodyLocked(true);
    updateBusinessModalTitle();

    qs(".business-modal-close", modal)?.focus({ preventScroll: true });
  }

  function closeBusinessModal() {
    if (!modal.classList.contains("is-open")) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalContent.innerHTML = "";

    setBodyLocked(false);

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus({ preventScroll: true });
    }

    lastFocusedElement = null;
  }

  function updateBusinessModalTitle() {
    const title = qs("h2", modalContent);
    if (!title) return;

    if (!title.id) {
      title.id = "businessModalTitle";
    }

    modal.setAttribute("aria-labelledby", title.id);
  }

  document.addEventListener("click", (event) => {
    const openButton = event.target.closest(".business-detail-open");
    const closeButton = event.target.closest("[data-business-modal-close]");

    if (openButton) {
      event.preventDefault();
      event.stopPropagation();

      openBusinessModal(openButton);
      return;
    }

    if (closeButton) {
      event.preventDefault();
      closeBusinessModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeBusinessModal();
      return;
    }

    trapFocus(event, modal);
  });
}

/* =========================================================
   11. E-HULLADÉK KÉPGALÉRIA
========================================================= */

function initEwasteGallery() {
  const gallery = qs("[data-ewaste-gallery]");
  const modal = qs("[data-ewaste-gallery-modal]");

  if (!gallery || !modal) return;

  const items = qsa(".ewaste-gallery-item", gallery);
  const modalImage = qs("[data-ewaste-gallery-image]", modal);
  const modalCaption = qs("[data-ewaste-gallery-caption]", modal);
  const closeButtons = qsa("[data-ewaste-gallery-close]", modal);
  const prevButton = qs("[data-ewaste-gallery-prev]", modal);
  const nextButton = qs("[data-ewaste-gallery-next]", modal);

  if (!items.length || !modalImage || !modalCaption) return;

  let currentIndex = 0;
  let lastFocusedElement = null;

  function updateGalleryImage() {
    const item = items[currentIndex];
    if (!item) return;

    const imageSrc = item.dataset.galleryImage;
    const imageAlt = item.dataset.galleryAlt || "";

    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modalCaption.textContent = imageAlt;
  }

  function openGallery(index) {
    currentIndex = index;
    lastFocusedElement = document.activeElement;

    updateGalleryImage();

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    setBodyLocked(true);

    nextButton?.focus({ preventScroll: true });
  }

  function closeGallery() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    setBodyLocked(false);

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus({ preventScroll: true });
    }

    lastFocusedElement = null;
  }

  function showPreviousImage() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateGalleryImage();
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % items.length;
    updateGalleryImage();
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      openGallery(index);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeGallery);
  });

  prevButton?.addEventListener("click", showPreviousImage);
  nextButton?.addEventListener("click", showNextImage);

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeGallery();
      return;
    }

    if (event.key === "ArrowLeft") {
      showPreviousImage();
      return;
    }

    if (event.key === "ArrowRight") {
      showNextImage();
      return;
    }

    trapFocus(event, modal);
  });
}

/* =========================================================
   12. KARRIER OLDAL – ÁLLÁSHIRDETÉS MODAL
========================================================= */

function initCareerJobsModal() {
  const modal = qs("#careerModal");
  const modalContent = qs("#careerModalContent");

  if (!modal || !modalContent) return;

  let lastFocusedElement = null;

  function updateCareerModalTitle() {
    const modalTitle = qs("h2", modalContent);
    if (!modalTitle) return;

    if (!modalTitle.id) {
      modalTitle.id = "careerModalTitle";
    }

    modal.setAttribute("aria-labelledby", modalTitle.id);
  }

  function openCareerModal(openButton) {
    const card = openButton.closest(".career-job-card");
    const detailContent = qs(".career-job-detail", card);

    if (!detailContent) return;

    lastFocusedElement = openButton;

    modalContent.innerHTML = detailContent.innerHTML;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    setBodyLocked(true);
    updateCareerModalTitle();

    qs(".career-modal-close", modal)?.focus({ preventScroll: true });
  }

  function closeCareerModal() {
    if (!modal.classList.contains("is-open")) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalContent.innerHTML = "";

    setBodyLocked(false);

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus({ preventScroll: true });
    }

    lastFocusedElement = null;
  }

  document.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-job-modal-open]");
    const closeButton = event.target.closest("[data-career-modal-close]");

    if (openButton) {
      event.preventDefault();
      openCareerModal(openButton);
      return;
    }

    if (closeButton) {
      event.preventDefault();
      closeCareerModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeCareerModal();
      return;
    }

    trapFocus(event, modal);
  });
}

/* =========================================================
   COPYRIGHT ÉVSZÁM AUTOMATIKUS FRISSÍTÉSE
   A láblécben a HTML tartalmazza az évszámot, így JavaScript
   nélkül is látszik. Ez a blokk az aktuális évre állítja.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  updateFooterYear();
});

function updateFooterYear() {
  const currentYear = String(new Date().getFullYear());

  document.querySelectorAll(".site-footer-year").forEach((element) => {
    if (element.textContent.trim() !== currentYear) {
      element.textContent = currentYear;
    }
  });
}
