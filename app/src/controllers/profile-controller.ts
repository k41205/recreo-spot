import { db } from "../models/db.js";
import { ResponseToolkit, Request } from "@hapi/hapi";

export const profileController = {
  index: {
    async handler(request: Request, h: ResponseToolkit) {
      const userId = request.auth.credentials.id as string;
      const loggedInUser = await db.userStore!.getUserById(userId);
      if (!loggedInUser) {
        throw new Error("User doesn't exist when accessed user profile!");
      }
      const viewData = {
        id: loggedInUser.id,
        username: loggedInUser.username,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
        password: loggedInUser.password,
        type: loggedInUser.type,
      };
      return h.view("profile-view", viewData);
    },
  },
};
