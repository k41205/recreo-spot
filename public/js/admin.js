import { recreospotService } from "./recreospot-service-client.js";

document.addEventListener("click", async (event) => {
  const { target } = event;

  if (target.classList.contains("analytics__button")) {
    const userId = target.getAttribute("data-user-id");
    const action = target.getAttribute("data-action");

    let response;
    if (action === "promote") {
      response = await recreospotService.updateUser(userId, { type: "mod" });
    } else if (action === "demote") {
      response = await recreospotService.updateUser(userId, { type: "user" });
    }
    window.location.reload();
  }
});
