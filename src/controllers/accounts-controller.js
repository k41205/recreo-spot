import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";

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
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: (request, h, error) => h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400),
    },
    handler: async (request, h) => {
      const user = { type: "user", ...request.payload };
      await db.userStore.addUser(user);
      return h.redirect("/dashboard");
    },
  },
  showLogin: {
    async handler(request, h) {
      return h.view("login-view", { title: "Login to RecreoSpot" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: (request, h, error) => h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400),
    },
    handler: async (request, h) => {
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
