export const runError = (errors) => {
  const HTMLElement = `
    <div class="overlay active"></div>
    <section class="error active">
      <h3 class="error__title">There was a problem...</h3>
      <ul class="error__ul">
      ${errors.map((err) => `<li class="error__li">${err}</li>`).join("")}
      </ul>
    </section>`;

  document.querySelector("body").insertAdjacentHTML("afterbegin", HTMLElement);

  document.addEventListener("click", (e) => {
    const errorSection = document.querySelector(".error");
    const errorOverlay = document.querySelector(".overlay");
    if (!errorSection.contains(e.target)) {
      errorSection.classList.remove("active");
      errorOverlay.classList.remove("active");
    }
  });
};
