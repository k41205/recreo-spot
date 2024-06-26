import { ResponseToolkit, Request } from "@hapi/hapi";
import { User, UserRole } from "user-firestore-store";
import admin from "firebase-admin";
// @ts-ignore
import bcrypt from "bcrypt";
import { db } from "../models/db.js";
import { UserCreatePayload, UserCredentialsPayload } from "../models/joi-schemas.js";
import { createToken } from "../api/jwt-utils.js";

const saltRounds = 10;

export const accountsController = {
  index: {
    auth: false,
    async handler(request: Request, h: ResponseToolkit) {
      return h.view("main", { title: "Welcome to RecreoSpot" });
    },
  },
  showLogin: {
    auth: false,
    async handler(request: Request, h: ResponseToolkit) {
      return h.view("login-view", { title: "Login to RecreoSpot" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserCreatePayload,
      options: { abortEarly: false },
      failAction: (request: Request, h: ResponseToolkit, error: any) => h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400),
    },
    // eslint-disable-next-line consistent-return
    handler: async (request: Request, h: ResponseToolkit) => {
      const user = { ...(request.payload as User) };
      user.password = await bcrypt.hash(user.password, saltRounds);
      const newUser = await db.userStore!.addUser(user);
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
      failAction: (request: Request, h: ResponseToolkit, error: any) => h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400),
    },
    // eslint-disable-next-line consistent-return
    handler: async (request: Request, h: ResponseToolkit) => {
      const { email, password } = request.payload as User;
      const user = await db.userStore!.getUserByEmail(email);
      // const isMatch = await bcrypt.compare(password, user.password);
      if (!user) {
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
      if (user.type === "mod" || user.type === "user") {
        return h.redirect("/user");
      }
    },
  },
  googleLogin: {
    auth: false,
    handler: async (request: Request, h: ResponseToolkit) => {
      const { token } = request.payload as any;
      try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        let user = await db.userStore!.getUserByEmail(decodedToken.email as string);
        if (!user) {
          const [name, surname] = decodedToken.name.split(" ") as string;
          const newUser = {
            email: decodedToken.email as string,
            firstName: name,
            lastName: surname,
            password: null,
            type: "user" as UserRole,
            username: ["user", decodedToken.uid.slice(0, 4)].join("-"),
          };
          user = await db.userStore!.addUser(newUser);
        }
        const sessionToken = createToken(user);
        h.state("token", sessionToken, {
          isHttpOnly: true,
          path: "/",
          isSecure: process.env.NODE_ENV === "production",
        });
        // Check user type and redirect to the appropriate dashboard
        let redirectUrl = "/";
        if (user.type === "admin") {
          redirectUrl = "/admin";
        }
        if (user.type === "mod" || user.type === "user") {
          redirectUrl = "/user";
        }
        return h.response({ redirectUrl: redirectUrl }).code(200);
      } catch (error) {
        console.error("Failed to authenticate:", error);
        return h
          .view("login-view", { title: "Log in error", errors: [{ message: "Authentication failed" }] })
          .takeover()
          .code(400);
      }
    },
  },
  logout: {
    auth: false,
    handler: async (request: Request, h: ResponseToolkit) =>
      h
        .response("Logged out")
        .unstate("token", {
          path: "/",
          isSecure: process.env.NODE_ENV === "production",
          // SameSite: "Strict",
        })
        .redirect("/"),
  },
  async validate(request: Request, session: any) {
    const user = await db.userStore!.getUserById(session.id as string);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
