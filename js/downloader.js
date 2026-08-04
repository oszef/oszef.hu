/* =========================================================
   PDF / DOKUMENTUM LETÖLTÉS SEGÉD
   Fájl helye: js/downloader.js
   Csak dokumentumtáras oldalakon betöltve.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initDocumentDownloads();
});

function initDocumentDownloads() {
  const downloadLinks = document.querySelectorAll("[data-download]");
  const viewLinks = document.querySelectorAll(".doc-action--view");

  downloadLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    if (!link.hasAttribute("download")) {
      const fileName = href.split("/").pop();
      link.setAttribute("download", fileName || "");
    }

    if (!link.hasAttribute("aria-label")) {
      link.setAttribute(
        "aria-label",
        `${link.textContent.trim()} PDF dokumentum letöltése`
      );
    }
  });

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