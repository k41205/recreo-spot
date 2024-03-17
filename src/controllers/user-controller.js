import { db } from "../models/db.js";

export const userController = {
  index: {
    async handler(request, h) {
      const userId = request.auth.credentials.id;
      const loggedInUser = await db.userStore.getUserById(userId);
      const pois = await db.poiStore.getAllPois();
      console.log(loggedInUser.type);
      const userPois = pois.filter((poi) => poi.author === loggedInUser.id);
      const viewData = {
        title: "User Dashboard",
        username: loggedInUser.username,
        id: loggedInUser.id,
        type: loggedInUser.type,
        userPois,
      };
      return h.view("user-view", viewData);
    },
  },
};
