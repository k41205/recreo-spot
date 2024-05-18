import { db } from "../models/db.js";
import { ResponseToolkit, Request } from "@hapi/hapi";
import { Poi } from "poi-firestore-store";

export const userController = {
  index: {
    async handler(request: Request, h: ResponseToolkit) {
      const userId = request.auth.credentials.id as string;
      const loggedInUser = await db.userStore!.getUserById(userId);
      const pois = await db.poiStore!.getAllPois();
      const userPois = pois.filter((poi) => poi.author === loggedInUser!.id);
      const candidatePois = pois.filter((poi) => poi.isCandidate === true);
      const publicPois = pois.filter((poi) => poi.isPublic === true);
      const viewData = {
        title: "User View",
        username: loggedInUser!.username,
        id: loggedInUser!.id,
        type: loggedInUser!.type,
        userPois,
        candidatePois: [] as Poi[],
        publicPois: [] as Poi[],
      };
      if (loggedInUser!.type === "mod") {
        viewData.candidatePois = candidatePois;
        viewData.publicPois = publicPois;
      }
      return h.view("user-view", viewData);
    },
  },
};
