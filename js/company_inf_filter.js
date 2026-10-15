/* =========================================================
   SZEFO.HU – CÉGINFORMÁCIÓK IDEIGLENES SZŰRŐJE
   Fájl: js/company_inf_filter.js

   Szerepe (ideiglenes, amíg a Céginformációk adatai frissülnek):
   - a látogató a Céginformációk menüre kattintva lenyíló helyett
     egy értesítő ablakot kap: „Tartalmaink frissítés alatt.
     Köszönjük türelmét!”
   - a Céginformációk aloldalait közvetlen linkről (kereső, könyvjelző,
     főoldali gomb) megnyitva a tartalom helyett ugyanez az értesítés látszik
   - a fejlesztő (helyi gépen: localhost, 127.0.0.1, file://) mindent
     változatlanul lát és szerkeszthet

   Nézetváltás bármelyik gépen, az oldal címe után írva:
   - ?fejleszto=1  → fejlesztői nézet (a böngésző megjegyzi)
   - ?fejleszto=0  → látogatói nézet (a böngésző megjegyzi)

   Kikapcsolás: a fájl törlése, és az oldalak <head> részéből
   a rá mutató <script> sor törlése. Más fájlt nem érint:
   a stílusát is ez a fájl adja.

   FONTOS: ez csak megjelenítési szűrő. Az oldalak a szerveren
   továbbra is elérhetők (pl. forráskódból, JavaScript nélkül),
   ezért bizalmas adat nem kerülhet rájuk.
========================================================= */

(() => {
  const NEZET_KULCS = "szefo-ceginf-nezet";
  const UZENET = "Tartalmaink frissítés alatt. Köszönjük türelmét!";

  // A Céginformációk menü aloldalai (a mappanevük szerint)
  const CEGINFO_OLDALAK = [
    "altalanos_ceginformaciok",
    "kozerdeku_adatok",
    "kepzo_intezmenyek",
    "projektek",
    "minosegpolitika",
    "partnerek",
    "alapitvany",
    "adatigenyles_rendje",
    "eves_beszamolok",
    "archivum"
  ];

  /* ---------- Fejlesztői vagy látogatói nézet? ---------- */

  function tarolt(ertek) {
    try {
      if (ertek === undefined) return localStorage.getItem(NEZET_KULCS);
      localStorage.setItem(NEZET_KULCS, ertek);
    } catch (hiba) {
      // Tiltott tárhely (pl. privát ablak): marad az alapértelmezés.
    }
    return null;
  }

  const parameter = new URLSearchParams(window.location.search).get("fejleszto");
  if (parameter === "1") tarolt("fejleszto");
  if (parameter === "0") tarolt("latogato");

  const helyiGep =
    window.location.protocol === "file:" ||
    ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);

  const nezet = tarolt();
  const fejlesztoiNezet = nezet ? nezet === "fejleszto" : helyiGep;

  if (fejlesztoiNezet) return;

  /* ---------- Stílus (a fájllal együtt törlődik) ---------- */

  const stilus = document.createElement("style");
  stilus.textContent = `
    html.ceginf-frissites main > :not(.ceginf-oldal-ertesites) { display: none !important; }
    .ceginf-oldal-ertesites .info-content { text-align: center; }
    .ceginf-oldal-ertesites p { margin: 12px 0 24px; }
    .ceginf-ertesites { position: fixed; inset: 0; z-index: 999999999; display: grid; place-items: center; padding: 16px; }
    .ceginf-ertesites[hidden] { display: none; }
    .ceginf-ertesites-hatter { position: absolute; inset: 0; background: rgba(0, 20, 45, 0.55); }
    .ceginf-ertesites-doboz {
      position: relative; width: min(100%, 460px); padding: 32px 28px 28px;
      background: var(--color-surface, #fff); color: var(--color-text, #333);
      border-radius: var(--radius-lg, 16px); box-shadow: var(--shadow-soft, 0 20px 50px rgba(0,0,0,.2));
      text-align: center;
    }
    .ceginf-ertesites-doboz h2 {
      margin: 0 0 12px; color: var(--color-primary, #003f7d);
      font-size: var(--font-size-section-title, 1.5rem); line-height: var(--line-height-heading, 1.2);
    }
    .ceginf-ertesites-doboz p { margin: 0 0 24px; font-size: var(--font-size-body, 1rem); line-height: var(--line-height-body, 1.65); }
    .ceginf-ertesites-gomb {
      min-height: 44px; padding: 12px 24px; border: 0; border-radius: 999px; cursor: pointer;
      background: var(--color-primary, #003f7d); color: var(--color-white, #fff);
      font: inherit; font-weight: 700;
    }
    .ceginf-ertesites-gomb:hover { background: var(--color-primary-dark, #004999); }
    .ceginf-ertesites-gomb:focus-visible { outline: var(--focus-ring, 3px solid #005bbb); outline-offset: var(--focus-ring-offset, 3px); }
  `;
  document.head.appendChild(stilus);

  /* ---------- Közvetlenül megnyitott Céginformációk-aloldal ---------- */

  const oldal = (window.location.pathname.match(/\/hu\/([^/]+)\//) || [])[1];
  const zartOldal = CEGINFO_OLDALAK.includes(oldal);

  // Már a <head>-ben elrejtjük a tartalmat, hogy ne villanjon fel.
  if (zartOldal) document.documentElement.classList.add("ceginf-frissites");

  function oldalErtesites() {
    const main = document.querySelector("main");
    if (!main) return;

    const blokk = document.createElement("section");
    blokk.className = "info-page ceginf-oldal-ertesites";
    blokk.setAttribute("aria-labelledby", "ceginf-oldal-cim");
    blokk.innerHTML = `
      <section class="info-block section-card">
        <div class="info-content">
          <h1 id="ceginf-oldal-cim">Tartalmaink frissítés alatt</h1>
          <p>Köszönjük türelmét!</p>
          <a class="mission-back-link" href="../../index.html">← Vissza a főoldalra</a>
        </div>
      </section>`;
    main.prepend(blokk);
  }

  /* ---------- Értesítő ablak a menüre kattintáskor ---------- */

  let ablak = null;
  let visszaFokusz = null;

  function ablakLetrehozasa() {
    ablak = document.createElement("div");
    ablak.className = "ceginf-ertesites";
    ablak.hidden = true;
    ablak.innerHTML = `
      <div class="ceginf-ertesites-hatter" data-ceginf-bezar></div>
      <div class="ceginf-ertesites-doboz" role="dialog" aria-modal="true"
           aria-labelledby="ceginf-ertesites-cim" aria-describedby="ceginf-ertesites-szoveg">
        <h2 id="ceginf-ertesites-cim">Céginformációk</h2>
        <p id="ceginf-ertesites-szoveg">${UZENET}</p>
        <button class="ceginf-ertesites-gomb" type="button" data-ceginf-bezar>Rendben</button>
      </div>`;
    document.body.appendChild(ablak);

    ablak.addEventListener("click", (event) => {
      if (event.target.closest("[data-ceginf-bezar]")) ablakBezarasa();
    });
  }

  function ablakMegnyitasa(gomb) {
    if (!ablak) ablakLetrehozasa();
    visszaFokusz = gomb;
    ablak.hidden = false;
    ablak.querySelector(".ceginf-ertesites-gomb").focus();
  }

  function ablakBezarasa() {
    if (!ablak || ablak.hidden) return;
    ablak.hidden = true;
    visszaFokusz?.focus({ preventScroll: true });
    // Ha a gomb nem kaphat fókuszt (pl. közben bezárult a mobilmenü), ne maradjon a rejtett ablakon.
    if (ablak.contains(document.activeElement)) document.activeElement.blur();
  }

  function ceginfoGomb(elem) {
    const gomb = elem.closest?.(".dropdown-toggle");
    if (!gomb) return null;
    const menu = gomb.closest(".dropdown");
    return menu && menu.querySelector('a[href*="altalanos_ceginformaciok"]') ? gomb : null;
  }

  // Elfogó fázisban fut, így a menü saját kezelője (lenyíló nyitása) nem kapja meg.
  window.addEventListener(
    "click",
    (event) => {
      const gomb = ceginfoGomb(event.target);
      if (!gomb) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      ablakMegnyitasa(gomb);
    },
    true
  );

  // Nyitott ablaknál az Escape zár, a Tab a gombon marad (a mobilmenü fókuszcsapdája helyett).
  window.addEventListener(
    "keydown",
    (event) => {
      if (!ablak || ablak.hidden) return;
      if (event.key === "Escape") {
        event.stopImmediatePropagation();
        ablakBezarasa();
      } else if (event.key === "Tab") {
        event.preventDefault();
        event.stopImmediatePropagation();
        ablak.querySelector(".ceginf-ertesites-gomb").focus();
      }
    },
    true
  );

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".dropdown-toggle").forEach((elem) => {
      if (ceginfoGomb(elem)) elem.setAttribute("aria-haspopup", "dialog");
    });
    if (zartOldal) oldalErtesites();
  });
})();
