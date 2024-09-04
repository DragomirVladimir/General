"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const navMenu = document.querySelector(".nav__menu");
  const burgerBtn = document.querySelector(".burger-btn");
  const navLinks = document.querySelectorAll(".nav__menu-link");

  burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("burger-btn--active");
    navMenu.classList.toggle("nav__menu--active");
    body.classList.toggle("disable-scroll");
  });

  function deactivationMenu() {
    body.classList.remove("disable-scroll");
    burgerBtn.classList.remove("burger-btn--active");
    navMenu.classList.remove("nav__menu--active");
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      deactivationMenu();
    });
  });

  document.querySelectorAll("[data-anchor]").forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      let id = this.getAttribute("href");
      let targetElement = document.querySelector(id);
      let targetOffset =
        targetElement.getBoundingClientRect().top + window.scrollY;
      let startOffset = window.scrollY;
      let duration = 2000;
      let startTime = null;

      function scrollAnimation(currentTime) {
        if (startTime === null) startTime = currentTime;
        let elapsedTime = currentTime - startTime;
        let progress = Math.min(elapsedTime / duration, 1);
        let easeProgress =
          progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;
        let scrollTo =
          startOffset + (targetOffset - startOffset) * easeProgress;

        window.scrollTo(0, scrollTo);

        if (elapsedTime < duration) {
          requestAnimationFrame(scrollAnimation);
        }
      }

      requestAnimationFrame(scrollAnimation);
    });
  });

  const swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: true,
  });
});
