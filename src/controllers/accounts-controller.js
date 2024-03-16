import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { createToken } from "../api/jwt-utils.js";

export const accountsController = {
  index: {
    auth: false,
    async handler(request, h) {
      return h.view("main", { title: "Welcome to RecreoSpot" });
    },
  },
  showSignup: {
    auth: false,
    async handler(request, h) {
      return h.view("signup-view", { title: "Sign up for RecreoSpot" });
    },
  },
  signup: {
    auth: false,
    handler: async (request, h) => {
      const user = { type: "user", ...request.payload };
      const newUser = await db.userStore.addUser(user);
      if (newUser) {
        const token = createToken(newUser);
        h.state("token", token, {
          isHttpOnly: true,
          path: "/",
          isSecure: false, // In production it should be true
          // SameSite: "Strict", // Optional
        });

        // Redirect to the dashboard
        return h.redirect("/user");
      }
      // Error page if user type is unknown
      return h.redirect("/login");
    },
  },
  showLogin: {
    auth: false,
    async handler(request, h) {
      return h.view("login-view", { title: "Login to RecreoSpot" });
    },
  },
  login: {
    auth: false,
    validate: {
      // payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: (request, h, error) => h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400),
    },
    handler: async (request, h) => {
      console.log(request.payload);
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      const token = createToken(user);
      h.state("token", token, {
        isHttpOnly: true,
        path: "/",
        isSecure: false, // In production it should be true
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
      // Error page if user type is unknown
      return h.redirect("/login");
    },
  },
  logout: {
    auth: false,
    handler: async (request, h) =>
      h
        .response("Logged out")
        .unstate("token", {
          path: "/",
          isSecure: false,
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
