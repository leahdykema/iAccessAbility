// mobile versions
const menuIcon = document.querySelector('.menu-icon-container');
const navContainer = document.querySelector(".nav-container");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle('active');
    navContainer.classList.toggle('active');
});