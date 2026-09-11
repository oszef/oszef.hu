// A főoldalon megjelenő felugró hirdetés (popup) időzítését és bezárását vezérli.
document.addEventListener("DOMContentLoaded", () => {
    // Ha az oldalon nincs popup elem (pl. egy aloldalon), a szkript itt leáll,
    // így ez a fájl veszélytelenül betölthető bármelyik oldalra.
    const popup = document.getElementById("smartPopup");
    if (!popup) return;

    const closeBtn = popup.querySelector(".popup-close");
    if (!closeBtn) return;

    // Az oldal betöltése után 5 másodperccel jelenik meg a popup
    setTimeout(() => {
        popup.classList.add("show");

        // Megjelenés után további 10 másodperccel automatikusan eltűnik,
        // ha addig a látogató nem zárta be kézzel
        setTimeout(() => {
            popup.classList.remove("show");
        }, 10000);

    }, 5000);

    // Kézi bezárás: a × gombra kattintva azonnal eltűnik a popup
    closeBtn.addEventListener("click", () => {
        popup.classList.remove("show");
    });
});
