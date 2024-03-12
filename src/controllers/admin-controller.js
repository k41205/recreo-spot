import { db } from "../models/db.js";

export const adminController = {
  index: {
    async handler(request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const pois = await db.poiStore.getAllPois();
      const publicPois = pois.filter((poi) => poi.isPublic === true);
      const candidatePois = pois.filter((poi) => poi.isCandidate === true);
      const privatePois = pois.filter((poi) => poi.isPublic === false && poi.isCandidate === false);
      const viewData = {
        title: "Admin Dashboard",
        username: loggedInUser.username,
        users,
        pois,
        publicPois,
        candidatePois,
        privatePois,
      };
      return h.view("admin-view", viewData);
    },
  },
};
