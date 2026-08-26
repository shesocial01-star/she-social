/* =========================================================
   SHE SOCIAL — JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        // Fermer le menu lorsqu'on clique sur un lien
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });
    }


    /* =====================================================
       LIEN ACTIF DANS LA NAVIGATION
       ===================================================== */

    const currentPage = window.location.pathname.split("/").pop();

    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (!linkPage) return;

        const cleanLink = linkPage.split("/").pop();

        if (
            cleanLink === currentPage ||
            (currentPage === "" && cleanLink === "index.html")
        ) {
            link.classList.add("active");
        }
    });


    /* =====================================================
       SCROLL FLUIDE
       ===================================================== */

    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(function (anchor) {

        anchor.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =====================================================
       ANIMATION AU SCROLL
       ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".fade-in, .fade-up, .animate-on-scroll"
    );

    if ("IntersectionObserver" in window && animatedElements.length > 0) {

        const observer = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.15
            }
        );

        animatedElements.forEach(function (element) {
            observer.observe(element);
        });
    }


    /* =====================================================
       HEADER AU SCROLL
       ===================================================== */

    const header = document.querySelector(".navbar");

    if (header) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        });
    }


    /* =====================================================
       BOUTON RETOUR EN HAUT
       ===================================================== */

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    /* =====================================================
       FORMULAIRE DE CONTACT
       ===================================================== */

    const contactForm = document.querySelector("#contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.querySelector("#name");
            const email = document.querySelector("#email");
            const message = document.querySelector("#message");

            if (!name || !email || !message) {
                return;
            }

            if (
                name.value.trim() === "" ||
                email.value.trim() === "" ||
                message.value.trim() === ""
            ) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            alert(
                "Merci pour votre message ! SHE SOCIAL vous répondra prochainement."
            );

            contactForm.reset();
        });
    }


    /* =====================================================
       ANIMATION DES COMPTEURS
       ===================================================== */

    const counters = document.querySelectorAll(".counter");

    if ("IntersectionObserver" in window && counters.length > 0) {

        const counterObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target) || 0;

                    let current = 0;
                    const increment = Math.max(1, Math.ceil(target / 50));

                    const updateCounter = function () {

                        current += increment;

                        if (current >= target) {
                            counter.textContent = target;
                        } else {
                            counter.textContent = current;
                            requestAnimationFrame(updateCounter);
                        }
                    };

                    updateCounter();

                    observer.unobserve(counter);
                });

            },
            {
                threshold: 0.5
            }
        );

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }


    /* =====================================================
       CONSOLE
       ===================================================== */

    console.log("SHE SOCIAL — Portfolio chargé avec succès.");
});