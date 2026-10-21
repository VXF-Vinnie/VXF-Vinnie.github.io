document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
    // Footer year
    const currentYear = new Date().getFullYear();
    document.querySelectorAll(".current-year").forEach((element) => {
        element.textContent = currentYear;
    });

    // Close the mobile menu after a link is tapped
    const navigationMenu = document.querySelector("#mainNavigation");
    document.querySelectorAll("#mainNavigation .nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            if (navigationMenu && navigationMenu.classList.contains("show") && window.bootstrap) {
                bootstrap.Collapse.getOrCreateInstance(navigationMenu).hide();
            }
        });
    });

    // Add a border under the navbar once the page scrolls
    const navbar = document.querySelector(".site-navbar");
    const updateNavbar = () => {
        if (navbar) navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    // Fade sections in as they scroll into view
    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("is-visible"));
    }

    // Copy-to-clipboard buttons (Contact page)
    document.querySelectorAll("[data-copy]").forEach((button) => {
        button.addEventListener("click", async () => {
            const originalLabel = button.textContent;
            try {
                await navigator.clipboard.writeText(button.dataset.copy);
                button.textContent = "Copied!";
            } catch {
                button.textContent = "Copy failed";
            }
            setTimeout(() => {
                button.textContent = originalLabel;
            }, 1800);
        });
    });

    // Cursor spotlight: only on devices with a real mouse and when motion is allowed
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (finePointer && !reducedMotion) {
        document.body.classList.add("has-spotlight");
        let frameRequested = false;
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener("mousemove", (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            if (frameRequested) return;
            frameRequested = true;
            requestAnimationFrame(() => {
                document.documentElement.style.setProperty("--mouse-x", `${mouseX}px`);
                document.documentElement.style.setProperty("--mouse-y", `${mouseY}px`);
                frameRequested = false;
            });
        });
    }
});
