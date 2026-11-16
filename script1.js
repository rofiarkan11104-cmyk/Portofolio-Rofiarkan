
/* =========================================================
   PORTFOLIO — INTERACTIVE JAVASCRIPT
   Features:
   Cursor Glow, Scroll Reveal, Timeline, Wishlist,
   Project 3D, Parallax, Particles, Smooth Navigation
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. ELEMENT REFERENCES & SETTINGS
    ===================================================== */

    const header = document.querySelector("header");

    const profileImage = document.querySelector(
        ".hero-image img"
    );

    const projectCards = document.querySelectorAll(
        ".project-card"
    );

    const timelineItems = document.querySelectorAll(
        ".timeline-item"
    );

    const wishlistCards = document.querySelectorAll(
        ".wish-card"
    );

    const revealElements = document.querySelectorAll(
        ".about-text, .about-skills, .project-card, .section-title"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = () => window.innerWidth <= 768;


    /* =====================================================
       2. CURSOR GLOW
    ===================================================== */

    if (!isMobile() && !prefersReducedMotion) {
        const cursor = document.createElement("div");

        cursor.className = "cursor-glow";
        cursor.setAttribute("aria-hidden", "true");

        document.body.appendChild(cursor);

        document.addEventListener("mousemove", (event) => {
            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;
        });
    }


    /* =====================================================
       3. HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =====================================================
       4. SCROLL REVEAL
    ===================================================== */

    if ("IntersectionObserver" in window) {
        revealElements.forEach((element) => {
            element.classList.add("reveal");
        });

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("active");
        });
    }


    /* =====================================================
       5. TIMELINE ANIMATION
    ===================================================== */

    if ("IntersectionObserver" in window) {
        const timelineObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2
            }
        );

        timelineItems.forEach((item) => {
            item.classList.add("timeline-hidden");

            timelineObserver.observe(item);
        });
    } else {
        timelineItems.forEach((item) => {
            item.classList.add("show");
        });
    }


    /* =====================================================
       6. 3D PROJECT CARD
    ===================================================== */

    if (!prefersReducedMotion) {
        projectCards.forEach((card) => {

            card.addEventListener("mousemove", (event) => {
                if (isMobile()) return;

                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -5;

                const rotateY =
                    ((x - centerX) / centerX) * 5;

                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }


    /* =====================================================
       7. PROFILE IMAGE PARALLAX
    ===================================================== */

    if (profileImage && !prefersReducedMotion) {
        document.addEventListener("mousemove", (event) => {
            if (isMobile()) return;

            const x =
                (window.innerWidth / 2 - event.clientX) / 45;

            const y =
                (window.innerHeight / 2 - event.clientY) / 45;

            profileImage.style.transform =
                `translate(${x}px, ${y}px)`;
        });

        document.addEventListener("mouseleave", () => {
            profileImage.style.transform = "";
        });
    }


    /* =====================================================
       8. FLOATING PARTICLES
    ===================================================== */

    if (!prefersReducedMotion) {
        const particleCount = isMobile() ? 8 : 18;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");

            particle.className = "particle";
            particle.setAttribute("aria-hidden", "true");

            const size = 2 + Math.random() * 4;

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            particle.style.animationDuration =
                `${8 + Math.random() * 10}s`;

            particle.style.animationDelay =
                `${Math.random() * 8}s`;

            particle.style.opacity =
                `${0.15 + Math.random() * 0.45}`;

            document.body.appendChild(particle);
        }
    }


    /* =====================================================
       9. BACK TO TOP BUTTON
    ===================================================== */

    const backTop = document.createElement("button");

    backTop.className = "back-top";
    backTop.type = "button";
    backTop.innerHTML = "&#8593;";

    backTop.setAttribute("aria-label", "Kembali ke atas");

    document.body.appendChild(backTop);

    function updateBackTop() {
        if (window.scrollY > 500) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }
    }

    window.addEventListener("scroll", updateBackTop, {
        passive: true
    });

    updateBackTop();

    backTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    });


    /* =====================================================
       10. SMOOTH NAVIGATION
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });


    /* =====================================================
       11. WISHLIST — POLAROID INTERACTION
    ===================================================== */

    wishlistCards.forEach((card) => {
        card.setAttribute("tabindex", "0");

        card.addEventListener("click", () => {
            const wasActive = card.classList.contains("active");

            wishlistCards.forEach((item) => {
                item.classList.remove("active");
            });

            if (!wasActive) {
                card.classList.add("active");
            }
        });

        card.addEventListener("keydown", (event) => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                card.click();
            }
        });
    });


    /* =====================================================
       12. IMAGE ERROR FALLBACK
    ===================================================== */

    document.querySelectorAll("img").forEach((image) => {

        function handleImageError() {
            image.style.background =
                "linear-gradient(135deg, #49335f, #f47d5a)";

            image.style.objectFit = "cover";

            image.setAttribute("data-image-error", "true");
        }

        image.addEventListener("error", handleImageError);

        // Menangani gambar yang sudah gagal dimuat sebelumnya.
        if (image.complete && image.naturalWidth === 0) {
            handleImageError();
        }
    });


    /* =====================================================
       13. CLEANUP INLINE EFFECTS ON MOBILE
    ===================================================== */

    function resetDesktopEffects() {
        if (!isMobile()) return;

        if (profileImage) {
            profileImage.style.transform = "";
        }

        projectCards.forEach((card) => {
            card.style.transform = "";
        });
    }

    window.addEventListener("resize", resetDesktopEffects, {
        passive: true
    });

    resetDesktopEffects();


    /* =====================================================
       14. INITIALIZATION COMPLETE
    ===================================================== */

    console.log("Portfolio interactive effects initialized.");

});
