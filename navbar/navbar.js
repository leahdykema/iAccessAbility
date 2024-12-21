function toggleNav() {
    const navContainer = document.querySelector(".nav-container");
    const navMenu = document.querySelector("#nav-menu");
    const toggleButton = document.querySelector(".menu-icon");
    const links = document.querySelectorAll("#nav-menu a");

    // Toggle the 'active' class on navContainer and navMenu
    const isOpen = navContainer.classList.toggle("active");
    navMenu.classList.toggle("active", isOpen);

    // Update aria-expanded attribute for the button
    toggleButton.setAttribute("aria-expanded", isOpen);

    // Update aria-hidden and tabindex for links based on menu state
    links.forEach((link) => {
        if (isOpen) {
            link.setAttribute("aria-hidden", "false");
            link.setAttribute("tabindex", "0");
        } else {
            link.setAttribute("aria-hidden", "true");
            link.setAttribute("tabindex", "-1");
        }
    });
}
	    
function isMobileView() {
    return window.matchMedia("(max-width: 768px)").matches;
}

document.addEventListener("DOMContentLoaded", () => {
    if (isMobileView()) {
            const links = document.querySelectorAll("#nav-menu a");
            links.forEach((link) => {
            link.setAttribute("aria-hidden", "true");
            link.setAttribute("tabindex", "-1");
        });
    }
});

// Ensure links are hidden on page load in mobile view
document.addEventListener("DOMContentLoaded", () => {
const links = document.querySelectorAll("#nav-menu a");
    links.forEach((link) => {
        link.setAttribute("aria-hidden", "true");
        link.setAttribute("tabindex", "-1");
    });
});

// mobile versions
const menuIcon = document.querySelector(".menu-icon-container");
const navContainer = document.querySelector(".nav-container");

    menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle('active');
    navContainer.classList.toggle('active');
});
