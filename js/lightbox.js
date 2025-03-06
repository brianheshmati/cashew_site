document.addEventListener("DOMContentLoaded", function () {
    var lightbox = document.getElementById("lightbox");
    var applyBtn = document.getElementById("applyNowBtn");
    var closeBtn = document.getElementById("closeBtn");

    // Open Lightbox
    applyBtn.addEventListener("click", function () {
        lightbox.style.display = "flex";
    });

    // Close Lightbox
    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    // Close Lightbox When Clicking Outside
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
});
