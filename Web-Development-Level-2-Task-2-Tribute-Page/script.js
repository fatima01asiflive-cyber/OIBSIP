// ==========================================
// TRIBUTE PAGE - JAVASCRIPT
// OASIS INFOBYTE LEVEL 2 - TASK 2
// ==========================================


// ==========================================
// SMOOTH SCROLL
// ==========================================

const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        const targetSection =
            document.querySelector(targetId);

        if (targetSection) {

            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });

});


// ==========================================
// SCROLL REVEAL
// ==========================================

const sections =
    document.querySelectorAll(
        ".biography, .timeline-item, .legacy-card, .quote-container"
    );


const observerOptions = {
    threshold: 0.15
};


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);
                }

            });

        },
        observerOptions
    );


sections.forEach((section) => {

    section.classList.add("hidden");

    observer.observe(section);

});


// ==========================================
// CURRENT YEAR
// ==========================================

const footer =
    document.querySelector("footer");

if (footer) {

    const year = new Date().getFullYear();

    footer.setAttribute(
        "data-year",
        year
    );
}


// ==========================================
// IMAGE ERROR HANDLING
// ==========================================

const tributeImage =
    document.querySelector(".image-container img");

if (tributeImage) {

    tributeImage.addEventListener(
        "error",
        function () {

            this.alt =
                "Tribute image could not be loaded.";

            console.log(
                "Tribute image failed to load."
            );

        }
    );
}