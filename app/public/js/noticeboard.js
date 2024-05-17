import { recreospotService } from "./recreospot-service-client.js";

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

loadAnnouncements();
