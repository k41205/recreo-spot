import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { UserSpec, UserSpecPlus, UserArray, IdSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";

export const userApi = {
  create: {
    auth: false,
    handler: async (request, h) => {
      try {
        const user = await db.userStore.addUser(request.payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a User",
    notes: "Returns the newly created user",
    validate: { payload: UserSpecPlus, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns user details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all userApi",
    notes: "Returns details of all userApi",
    response: { schema: UserArray, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    validate: {
      params: IdSpec,
      failAction: validationError,
    },
    handler: async (request, h) => {
      try {
        const userDeleted = await db.userStore.deleteUserById(request.params.id);
        if (!userDeleted) {
          return Boom.notFound("User not found or unable to delete");
        }
        return h.response({ success: true, message: "User deleted successfully" }).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete a specific user",
    notes: "Removes a user from RecreoSpot",
  },

  delete: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        await db.userStore.deleteAllUsers();
        return h.response({ success: true, message: "Users deleted successfully" }).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all users",
    notes: "All users removed from RecreoSpot",
  },

  authenticate: {
    auth: false,
    handler: async (request, h) => {
      try {
        const user = await db.userStore.getUserByEmail(request.payload.email);
        if (!user) {
          return Boom.unauthorized("User not found");
        }
        if (user.password !== request.payload.password) {
          return Boom.unauthorized("Invalid password");
        }
        const token = createToken(user);
        return h.response({ success: true, token: token }).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
