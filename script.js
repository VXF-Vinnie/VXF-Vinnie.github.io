document.addEventListener("DOMContentLoaded", () => {
    const yearElements = document.querySelectorAll(".current-year");
    const currentYear = new Date().getFullYear();

    yearElements.forEach((element) => {
        element.textContent = currentYear;
    });

    const navigationLinks = document.querySelectorAll(
        "#mainNavigation .nav-link"
    );

    const navigationMenu = document.querySelector("#mainNavigation");

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (
                navigationMenu &&
                navigationMenu.classList.contains("show") &&
                window.bootstrap
            ) {
                const collapse =
                    bootstrap.Collapse.getOrCreateInstance(navigationMenu);

                collapse.hide();
            }
        });
    });
});

document.addEventListener("mousemove", (event) => {
    document.documentElement.style.setProperty(
        "--mouse-x",
        `${event.clientX}px`
    );

    document.documentElement.style.setProperty(
        "--mouse-y",
        `${event.clientY}px`
    );
});