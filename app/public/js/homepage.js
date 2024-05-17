document.addEventListener("DOMContentLoaded", (event) => {
  const iconArrow = document.querySelector(".icon-arrow-down");
  const aboutSection = document.querySelector(".about");

  iconArrow.addEventListener("click", () => {
    aboutSection.scrollIntoView({ behavior: "smooth" });
  });
});
