import { db } from "../models/db.js";

export const modController = {
  index: {
    auth: false,
    async handler(request, h) {
      return h.view("main", { title: "Welcome to RecreoSpot" });
    },
  },
};
