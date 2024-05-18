import { recreospotService } from "./recreospot-service-client.js";
import { runError } from "./errors-csr.js";

const map = L.map("userMap").setView([53.3571, -6.2512], 11); // Set default coordinates and zoom level

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

const userPoiIds = [];

let tempMarker;
let currPoiId;
let currName;
let currDescription;
let tempLat;
let tempLng;
let currFavs;

const poiDetailsDiv = document.getElementById("poiDetails");
const favorites = document.getElementById("favorites-pois");

const updateFavorites = async () => {
  const favs = await recreospotService.getUserFavorites();
  let list = "";
  if (favs.length === 0) list = "";
  else {
    favs.forEach((item) => {
      list += `<p>${item.name}</p>`;
    });
  }
  favorites.innerHTML = list;
  currFavs = favs.map((fav) => fav.id);
};

const createMarkerIcon = (color) =>
  `<svg width="35" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z" fill="${color}" stroke="black" stroke-width="1"/>
  </svg>`;

function getPoiDetails(poi) {
  const fav = currFavs.includes(poi.id) ? "<div id='favorite'></div>" : "<div id='unfavorite'></div>";
  poiDetailsDiv.innerHTML = `
  <p class="poi-title" id="poiName">${poi.name}</p>
  <div class="poi-box">
  <span class="poi-info-suffix"><p class="poi-info" id="poiLat">${poi.lat}</p>  lat</span>
  <span class="poi-info-suffix"><p class="poi-info" id="poiLon">${poi.lon}</p> lon</span>
  <p class="poi-info" id="poiDescription">${poi.description}</p>
  </div>
  ${userPoiIds.includes(poi.id) ? "<button id='updatePoiButton'>Modify POI</button>" : ""}
  ${poi.isPublic ? fav : ""}
  <div id='share'></div>
  `;
  tempLat = document.getElementById("poiLat").textContent;
  tempLng = document.getElementById("poiLon").textContent;
  currName = document.getElementById("poiName").textContent;
  currDescription = document.getElementById("poiDescription").textContent;
}

function sharePoi(poi) {
  const subject = encodeURIComponent(`Sharing POI: ${poi.name}`);
  const body = encodeURIComponent(
    `Hello,\n\nPlease find the details of the POI below:\n\nName: ${poi.name}\nLatitude: ${poi.lat}\nLongitude: ${poi.lng}\nDescription: ${poi.description}\n\nBest Regards,`
  );
  const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
  window.open(mailtoLink, "_blank");
}

function addPoiToMap(poi, iconColor) {
  const markerIcon = L.divIcon({
    className: "custom-div-icon",
    html: createMarkerIcon(iconColor),
    iconSize: [35, 40],
  });

  const marker = L.marker([poi.lat, poi.lon], { icon: markerIcon }).addTo(map);
  marker.on("click", () => {
    if (tempMarker) map.removeLayer(tempMarker);
    getPoiDetails(poi);
    currPoiId = poi.id;
  });
}

const loadPois = async () => {
  const userId = document.querySelector("[data-user-id]").getAttribute("data-user-id");
  const [userPois, publicPois] = await Promise.all([recreospotService.getPoisByUser(userId), recreospotService.getPoisPublic()]);
  // Determine color based on POI type
  userPois.forEach((poi) => {
    if (!poi.isCandidate) userPoiIds.push(poi.id);
    addPoiToMap(poi, poi.isCandidate ? "pink" : "black");
  });
  publicPois.forEach((poi) => addPoiToMap(poi, "purple"));
};

function buttonCreate() {
  // eslint-disable-next-line quotes
  poiDetailsDiv.innerHTML = `<button id="createPoiButton">New POI</button>`;
}

function emptyDetailsDiv() {
  poiDetailsDiv.innerHTML = "";
}

// <button id="createPoiButton">Create POI</button>
function formCreate() {
  poiDetailsDiv.innerHTML = `
  <form id="poiCreateForm">
    <input type="text" id="poiLat" name="lat" readonly />
    <input type="text" id="poiLon" name="lon" readonly />
    <input type="text" id="poiName" name="name" placeholder="Name" />
    <textarea id="poiDescription" name="description" placeholder="Description" rows="10"></textarea>
    <button id="poiSubmitButton" type="submit">Create</button>
  </form>
  `;
  document.getElementById("poiLat").value = tempLat;
  document.getElementById("poiLon").value = tempLng;
}

function modifyPoiForm() {
  tempLat = document.getElementById("poiLat").textContent;
  tempLng = document.getElementById("poiLon").textContent;
  currName = document.getElementById("poiName").textContent;
  currDescription = document.getElementById("poiDescription").textContent;

  poiDetailsDiv.innerHTML = `
  <form id="poiModifyForm">
    <input type="text" id="poiLat" name="lat" readonly />
    <input type="text" id="poiLon" name="lon" readonly />
    <input type="text" id="poiName" name="name" placeholder="Name" />
    <textarea id="poiDescription" name="description" placeholder="Description" rows="10"></textarea>
    <button id="poiSubmitButton" type="submit">Update</button>
  </form>
  `;
  document.getElementById("poiLat").value = tempLat;
  document.getElementById("poiLon").value = tempLng;
  document.getElementById("poiName").value = currName;
  document.getElementById("poiDescription").value = currDescription;
}

document.getElementById("poiDetails").addEventListener("click", async (event) => {
  if (event.target && event.target.id === "createPoiButton") {
    formCreate();
  }
  if (event.target && event.target.id === "updatePoiButton") {
    modifyPoiForm();
  }
});

// Handle click using event delegation
document.getElementById("poiDetails").addEventListener("click", async (event) => {
  if (event.target.id === "unfavorite") {
    await recreospotService.addFavorite(currPoiId, currName);
    document.getElementById("unfavorite").id = "favorite";
    await updateFavorites();
    return;
  }
  if (event.target.id === "favorite") {
    await recreospotService.removeFavorite(currPoiId);
    document.getElementById("favorite").id = "unfavorite";
    await updateFavorites();
    return;
  }
  if (event.target.id === "share") {
    const poi = {
      name: currName,
      lat: tempLat,
      lng: tempLng,
      description: currDescription,
    };
    // console.log(poi);
    sharePoi(poi);
  }
});

// Handle form submission using event delegation
document.getElementById("poiDetails").addEventListener("submit", async (event) => {
  event.preventDefault();

  if (event.target && event.target.id === "poiCreateForm") {
    const formData = {
      lat: document.getElementById("poiLat").value,
      lon: document.getElementById("poiLon").value,
      name: document.getElementById("poiName").value,
      description: document.getElementById("poiDescription").value,
    };
    try {
      const poiCreated = await recreospotService.createPoi(formData);
      userPoiIds.push(poiCreated.id);

      if (tempMarker) {
        map.removeLayer(tempMarker);
        tempMarker = null;
      }
      await loadPois();
      emptyDetailsDiv();
    } catch (error) {
      const { errors } = error.response.data;
      runError(errors);
    }
  }

  if (event.target && event.target.id === "poiModifyForm") {
    const formData = {
      lat: document.getElementById("poiLat").value,
      lon: document.getElementById("poiLon").value,
      name: document.getElementById("poiName").value,
      description: document.getElementById("poiDescription").value,
    };

    await recreospotService.updatePoi(currPoiId, formData);

    if (tempMarker) {
      map.removeLayer(tempMarker);
      tempMarker = null;
    }
    await loadPois();
    emptyDetailsDiv();
    poiDetailsDiv.innerHTML = "<p className='poi-title'>Updated!</p>";
  }
});

map.on("click", (event) => {
  // Remove the previous temporary marker if it exists
  if (tempMarker) {
    map.removeLayer(tempMarker);
  }
  const tempMarkerIcon = L.divIcon({
    className: "custom-div-icon",
    html: createMarkerIcon("red"), // Set the HTML to the SVG string
    iconSize: [35, 40], // Size of the icon
  });

  tempLat = event.latlng.lat;
  tempLng = event.latlng.lng;
  tempMarker = L.marker([tempLat, tempLng], { icon: tempMarkerIcon }).addTo(map);
  buttonCreate();
});

await loadPois();
updateFavorites();
