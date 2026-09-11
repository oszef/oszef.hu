/* =========================================================
   PDF / DOKUMENTUM LETÖLTÉS SEGÉD
   Fájl helye: js/downloader.js
   Csak dokumentumtáras oldalakon betöltve.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initDocumentDownloads();
});

// Az oldalon található "Letöltés" és "Megnyitás" gombokat/linkeket egészíti ki
// a szükséges technikai beállításokkal, hogy a dokumentumtár-kártyák HTML-jébe
// ne kelljen ezeket egyenként, kézzel beírni.
function initDocumentDownloads() {
  const downloadLinks = document.querySelectorAll("[data-download]");
  const viewLinks = document.querySelectorAll(".doc-action--view");

  // "Letöltés" linkek: rávesszük a böngészőt, hogy a megnyitás helyett
  // valóban letöltse a fájlt, a fájl nevét pedig a linkből (URL-ből) olvassuk ki.
  downloadLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    if (!link.hasAttribute("download")) {
      const fileName = href.split("/").pop();
      link.setAttribute("download", fileName || "");
    }

    // Ha a HTML-ben nincs külön aria-label megadva, generálunk egyet, hogy
    // képernyőolvasóval is egyértelmű legyen, melyik dokumentumról van szó.
    if (!link.hasAttribute("aria-label")) {
      link.setAttribute(
        "aria-label",
        `${link.textContent.trim()} PDF dokumentum letöltése`
      );
    }
  });

  // "Megnyitás" linkek: mindig új böngészőlapon nyíljanak meg (target="_blank"),
  // a rel="noopener" pedig biztonsági okból leválasztja az új lapot az eredetiről.
  viewLinks.forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");

    if (!link.hasAttribute("aria-label")) {
      link.setAttribute(
        "aria-label",
        `${link.textContent.trim()} PDF dokumentum megnyitása új lapon`
      );
    }
  });
}