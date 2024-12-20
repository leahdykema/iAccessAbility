const menuIcon = document.querySelector(".menu-icon-container");
const navContainer = document.querySelector(".nav-container");
const desktopNav = document.querySelector(".desktop-nav");
const mobileNav = document.querySelector(".mobile-nav");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    navContainer.classList.toggle("active");
    desktopNav.classList.toggle("hidden"); // Toggle visibility of desktop nav
    mobileNav.classList.toggle("hidden"); // Optional, depending on design
});
