document.addEventListener("click", (e) => {
  const errorSection = document.querySelector(".error");
  const errorOverlay = document.querySelector(".overlay");
  if (!errorSection.contains(e.target)) {
    errorSection.classList.remove("active");
    errorOverlay.classList.remove("active");
  }
});
