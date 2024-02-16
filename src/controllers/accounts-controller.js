import { db } from "../models/db.js";

export const accountsController = {
  index: {
    async handler(request, h) {
      return h.view("main", { title: "Welcome to RecreoSpot" });
    },
  },
  showSignup: {
    async handler(request, h) {
      return h.view("signup-view", { title: "Sign up for RecreoSpot" });
    },
  },
  signup: {
    async handler(request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    async handler(request, h) {
      return h.view("login-view", { title: "Login to RecreoSpot" });
    },
  },
  login: {
    async handler(request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      return h.redirect("/dashboard");
    },
  },
  logout: {
    async handler(request, h) {
      return h.redirect("/");
    },
  },
};
