// A főoldalon megjelenő felugró hirdetés (popup) időzítését és bezárását vezérli.
document.addEventListener("DOMContentLoaded", () => {
    // Ha az oldalon nincs popup elem (pl. egy aloldalon), a szkript itt leáll,
    // így ez a fájl veszélytelenül betölthető bármelyik oldalra.
    const popup = document.getElementById("smartPopup");
    if (!popup) return;

    const closeBtn = popup.querySelector(".popup-close");
    if (!closeBtn) return;

    // Az oldal betöltése után 5 másodperccel jelenik meg a popup.
    // Magától nem tűnik el: a látogató addig olvashatja, ameddig akarja
    // (WCAG 2.2.1 – nincs időkorlát), és ő maga zárja be.
    setTimeout(() => {
        popup.classList.add("show");
    }, 5000);

    function closePopup() {
        popup.classList.remove("show");
    }

    // Kézi bezárás: a × gombra kattintva azonnal eltűnik a popup
    closeBtn.addEventListener("click", closePopup);

    // Escape-pel is bezárható, így ha éppen eltakarna egy fókuszált elemet,
    // a billentyűzetes látogató a fókusz elmozdítása nélkül eltüntetheti
    // (WCAG 2.1.1, 2.4.11).
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && popup.classList.contains("show")) {
            closePopup();
        }
    });
});
