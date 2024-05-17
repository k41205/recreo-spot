import { recreospotService } from "./recreospot-service-client.js";

document.addEventListener("click", async (event) => {
  const { target } = event;

  if (target.classList.contains("analytics__button")) {
    const userId = target.getAttribute("data-user-id");
    const action = target.getAttribute("data-action");

    if (action === "promote") {
      await recreospotService.updateUser(userId, { type: "mod" });
    } else if (action === "demote") {
      await recreospotService.updateUser(userId, { type: "user" });
    }
    window.location.reload();
  }
});

function formatDate(timestamp) {
  if (!timestamp || !timestamp._seconds) return "";
  const date = new Date(timestamp._seconds * 1000);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return formattedDate.replace(",", " at");
}

async function loadAnnouncements() {
  try {
    const announcements = await recreospotService.getAllAnnouncements();
    const container = document.getElementById("announcements-list");
    if (!container) {
      console.error("Announcement list container not found!");
      return;
    }
    container.innerHTML = announcements
      .map(
        (ann) => `
      <div>
        <strong>${ann.title}</strong>: ${ann.message} - <em>${formatDate(ann.date)}</em>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading announcements", error);
  }
}

async function deleteAllAnnouncements() {
  try {
    await recreospotService.deleteAllAnnouncements();
    console.log("All announcements deleted");
    loadAnnouncements();
  } catch (error) {
    console.error("Failed to delete all announcements", error);
  }
}

document.getElementById("delete-all-announcements").addEventListener("click", deleteAllAnnouncements);

document.addEventListener("DOMContentLoaded", loadAnnouncements);

document.getElementById("announcement__form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const message = document.getElementById("message").value;

  try {
    const response = await recreospotService.createAnnouncement({ title, message });
    console.log("Announcement posted successfully", response);
    loadAnnouncements();
  } catch (error) {
    console.error("Failed to post announcement", error);
  }
});
