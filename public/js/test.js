import { recreospotService } from "./clientApi.js";

document.addEventListener("click", async (event) => {
  const { target } = event;
  console.log(event);

  if (target.classList.contains("analytics__button")) {
    const userId = target.getAttribute("data-user-id");
    const action = target.getAttribute("data-action");

    try {
      let response;
      if (action === "promote") {
        response = await recreospotService.updateUser(userId, { type: "mod" });
      } else if (action === "demote") {
        response = await recreospotService.updateUser(userId, { type: "user" });
      }
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  if (target.classList.contains("icon-profile")) {
    const dropDownContent = document.querySelector(".menu__dropdown-content");
    dropDownContent.classList.toggle("show");
  }
});
