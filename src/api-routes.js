import { userApi } from "./api/user-api.js";
import { poiApi } from "./api/pois-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },
  { method: "DELETE", path: "/api/users", config: userApi.delete },

  { method: "POST", path: "/api/pois", config: poiApi.create },
  { method: "GET", path: "/api/pois/{id}", config: poiApi.findOne },
  { method: "GET", path: "/api/pois/user/{userId}", config: poiApi.findUserPois },
  { method: "GET", path: "/api/pois/public", config: poiApi.findPublicPois },
  { method: "GET", path: "/api/pois/candidate", config: poiApi.findCandidatePois },
  { method: "GET", path: "/api/pois", config: poiApi.find },
  { method: "DELETE", path: "/api/pois/{id}", config: poiApi.deleteOne },
  { method: "DELETE", path: "/api/pois", config: poiApi.delete },
];
