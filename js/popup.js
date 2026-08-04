document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("smartPopup");
    if (!popup) return;

    const closeBtn = popup.querySelector(".popup-close");
    if (!closeBtn) return;

    // 5 mp múlva megjelenik
    setTimeout(() => {
        popup.classList.add("show");

        // 10 mp múlva automatikusan bezáródik
        setTimeout(() => {
            popup.classList.remove("show");
        }, 10000);

    }, 5000);

    // Kézi bezárás
    closeBtn.addEventListener("click", () => {
        popup.classList.remove("show");
    });
});
