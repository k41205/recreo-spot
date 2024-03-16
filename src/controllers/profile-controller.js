import { db } from "../models/db.js";

export const profileController = {
  index: {
    async handler(request, h) {
      const userId = request.auth.credentials.id;
      const loggedInUser = await db.userStore.getUserById(userId);
      console.log(userId);
      console.log(loggedInUser);
      const viewData = {
        id: loggedInUser.id,
        username: loggedInUser.username,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
        password: loggedInUser.password,
      };
      return h.view("profile-view", viewData);
    },
  },
  updateProfile: {
    async handler(request, h) {
      // call updateUser function
      const viewData = {};
      return h.view("profile-view", viewData);
    },
  },
};
