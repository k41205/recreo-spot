import { db } from "../models/db.js";

export const modController = {
  index: {
    async handler(request, h) {
      const userId = request.auth.credentials.id;
      const loggedInUser = await db.userStore.getUserById(userId);
      const pois = await db.poiStore.getAllPois();
      const publicPois = pois.filter((poi) => poi.isPublic === true);
      const candidatePois = pois.filter((poi) => poi.isCandidate === true);
      const viewData = {
        title: "Moderator Dashboard",
        username: loggedInUser.username,
        id: loggedInUser.id,
        type: loggedInUser.type,
        publicPois,
        candidatePois,
      };
      return h.view("mod-view", viewData);
    },
  },
};
