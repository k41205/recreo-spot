import { db } from "../models/db.js";
import { UserCreatePayload, UserCredentialsPayload } from "../models/joi-schemas.js";
import { createToken } from "../api/jwt-utils.js";

export const accountsController = {
  index: {
    auth: false,
    async handler(request, h) {
      return h.view("main", { title: "Welcome to RecreoSpot" });
    },
  },
  showLogin: {
    auth: false,
    async handler(request, h) {
      return h.view("login-view", { title: "Login to RecreoSpot" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserCreatePayload,
      options: { abortEarly: false },
      failAction: (request, h, error) => h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400),
    },
    // eslint-disable-next-line consistent-return
    handler: async (request, h) => {
      const user = { type: "user", ...request.payload };
      const newUser = await db.userStore.addUser(user);
      if (newUser) {
        const token = createToken(newUser);
        h.state("token", token, {
          isHttpOnly: true,
          path: "/",
          isSecure: process.env.NODE_ENV === "production",
          // SameSite: "Strict", // Optional
        });
        // Redirect to the dashboard
        return h.redirect("/user");
      }
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsPayload,
      options: { abortEarly: false },
      failAction: (request, h, error) => h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400),
    },
    // eslint-disable-next-line consistent-return
    handler: async (request, h) => {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        const errors = [{ message: !user ? "User not found." : "Invalid email or password." }];
        return h.view("login-view", { title: "Log in error", errors: errors }).takeover().code(400);
      }
      const token = createToken(user);
      h.state("token", token, {
        isHttpOnly: true,
        path: "/",
        isSecure: process.env.NODE_ENV === "production",
        // SameSite: "Strict", // Optional
      });
      // Check user type and redirect to the appropriate dashboard
      if (user.type === "admin") {
        return h.redirect("/admin");
      }
      if (user.type === "mod") {
        return h.redirect("/mod");
      }
      if (user.type === "user") {
        return h.redirect("/user");
      }
    },
  },
  logout: {
    auth: false,
    handler: async (request, h) =>
      h
        .response("Logged out")
        .unstate("token", {
          path: "/",
          isSecure: process.env.NODE_ENV === "production",
          // SameSite: "Strict",
        })
        .redirect("/"),
  },
  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
