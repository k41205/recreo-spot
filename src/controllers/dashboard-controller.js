import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    async handler(request, h) {
      // const poiList = await db.poiStore.getAllPois();
      const poiList = [];
      const viewData = {
        title: "RecreoSpot Dashboard",
        poiList: poiList,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPoi: {
    async handler(request, h) {
      const newPoi = {
        name: request.payload.name,
      };
      await db.poiStore.addPoi(newPoi);
      return h.redirect("/dashboard");
    },
  },
};
