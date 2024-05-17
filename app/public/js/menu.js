document.addEventListener("click", async (event) => {
  const { target } = event;
  if (target.classList.contains("icon-profile")) {
    const dropDownContent = document.querySelector(".menu__dropdown-content");
    dropDownContent.classList.toggle("show");
  }
});
