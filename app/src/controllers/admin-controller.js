import { db } from "../models/db.js";

export const adminController = {
  index: {
    async handler(request, h) {
      const userId = request.auth.credentials.id;
      const loggedInUser = await db.userStore.getUserById(userId);
      const allUsers = await db.userStore.getAllUsers();
      const usersWithoutAdmin = allUsers.filter((user) => user.type !== "admin");
      const pois = await db.poiStore.getAllPois();
      const publicPois = pois.filter((poi) => poi.isPublic === true);
      const candidatePois = pois.filter((poi) => poi.isCandidate === true);
      const privatePois = pois.filter((poi) => poi.isPublic === false && poi.isCandidate === false);
      const viewData = {
        title: "Admin Dashboard",
        username: loggedInUser.username,
        type: loggedInUser.type,
        users: usersWithoutAdmin,
        pois,
        publicPois,
        candidatePois,
        privatePois,
      };
      return h.view("admin-view", viewData);
    },
  },
};
