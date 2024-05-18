import { db } from "../models/db.js";
import { ResponseToolkit, Request } from "@hapi/hapi";

export const adminController = {
  index: {
    async handler(request: Request, h: ResponseToolkit) {
      const userId = request.auth.credentials.id as string;
      const loggedInUser = await db.userStore!.getUserById(userId);
      const allUsers = await db.userStore!.getAllUsers();
      const usersWithoutAdmin = allUsers.filter((user) => user.type !== "admin");
      const pois = await db.poiStore!.getAllPois();
      const publicPois = pois.filter((poi) => poi.isPublic === true);
      const candidatePois = pois.filter((poi) => poi.isCandidate === true);
      const privatePois = pois.filter((poi) => poi.isPublic === false && poi.isCandidate === false);
      if (!loggedInUser) {
        throw new Error("User admin doesn't exist!");
      }
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
