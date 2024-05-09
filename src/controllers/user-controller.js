import { db } from "../models/db.js";

export const userController = {
  index: {
    async handler(request, h) {
      const userId = request.auth.credentials.id;
      const loggedInUser = await db.userStore.getUserById(userId);
      const pois = await db.poiStore.getAllPois();
      const userPois = pois.filter((poi) => poi.author === loggedInUser.id);
      const candidatePois = pois.filter((poi) => poi.isCandidate === true);
      const publicPois = pois.filter((poi) => poi.isPublic === true);
      const viewData = {
        title: "User View",
        username: loggedInUser.username,
        id: loggedInUser.id,
        type: loggedInUser.type,
        userPois,
      };
      if (loggedInUser.type === "mod") {
        viewData.candidatePois = candidatePois;
        viewData.publicPois = publicPois;
      }
      return h.view("user-view", viewData);
    },
  },
};
