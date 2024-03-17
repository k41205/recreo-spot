import { db } from "../models/db.js";

export const profileController = {
  index: {
    async handler(request, h) {
      const userId = request.auth.credentials.id;
      const loggedInUser = await db.userStore.getUserById(userId);
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
