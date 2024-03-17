document.addEventListener("click", (e) => {
  const errorSection = document.querySelector(".error");
  const errorOverlay = document.querySelector(".overlay");
  if (!errorSection.contains(e.target)) {
    console.log("Clicked outside the div!");
    errorSection.classList.remove("active");
    errorOverlay.classList.remove("active");
  }
});
