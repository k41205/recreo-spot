import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";
import { UserIdSpec, UserCreatePayload, UserSchema, UserUpdatePayload, UserCredentialsPayload, UserArray } from "../models/joi-schemas.js";

export const userApi = {
  create: {
    auth: false,
    handler: async (request, h) => {
      try {
        const user = { ...request.payload, type: "user" };
        const newUser = await db.userStore.addUser(user);
        if (newUser) {
          return h.response(newUser).code(201);
        }
        return Boom.badImplementation("Error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a user",
    notes: "Returns the newly created user",
    validate: { payload: UserCreatePayload, failAction: validationError },
    response: { schema: UserSchema, failAction: validationError },
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
    notes: "Returns user details of the id passed by params",
    validate: { params: { id: UserIdSpec }, failAction: validationError },
    response: { schema: UserSchema, failAction: validationError },
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
    description: "Get all users",
    notes: "Returns details of all users",
    response: { schema: UserArray, failAction: validationError },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        const userId = request.params.id;
        const updateData = request.payload;
        const updatedUser = await db.userStore.updateUser(userId, updateData);
        if (updatedUser) {
          return h.response(updatedUser).code(200);
        }
        return Boom.notFound("User not found");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a specific user",
    notes: "Updates a user details of the id passed by params",
    validate: { params: { id: UserIdSpec }, payload: UserUpdatePayload, failAction: validationError, options: { abortEarly: false } },
    response: { schema: UserSchema, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
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
    notes: "Removes user of the id passed by params",
    validate: { params: { id: UserIdSpec }, failAction: validationError, options: { abortEarly: false } },
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
    notes: "All users are removed",
  },

  authenticate: {
    auth: false,
    handler: async (request, h) => {
      try {
        const { email, password } = request.payload;
        const user = await db.userStore.getUserByEmail(email);
        if (!user) {
          return Boom.unauthorized("User not found");
        }
        if (user.password !== password) {
          return Boom.unauthorized("Invalid password");
        }
        const token = createToken(user);
        return h.response({ success: true, token: token }).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    validate: { payload: UserCredentialsPayload, failAction: validationError, options: { abortEarly: false } },
  },

  getFavorites: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        const userId = request.auth.credentials.id;
        const favorites = await db.userStore.getUserFavorites(userId);
        return h.response(favorites).code(200);
      } catch (err) {
        return Boom.serverUnavailable(`Database Error: ${err.message}`);
      }
    },
    tags: ["api"],
    description: "Get a user's favorite POIs",
    notes: "Returns a list of POI objects that the user has marked as favorites",
  },

  addFavorite: {
    auth: { strategy: "jwt" },
    handler: async (request, h) => {
      try {
        const userId = request.auth.credentials.id;
        const { poiId, poiName } = request.payload;
        const result = await db.userStore.addFavorite(userId, poiId, poiName);
        return h.response(result).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Failed to add favorite");
      }
    },
    tags: ["api"],
    description: "Add a favorite POI",
    notes: "Adds a POI to the user's list of favorites",
  },

  removeFavorite: {
    auth: { strategy: "jwt" },
    handler: async (request, h) => {
      try {
        const userId = request.auth.credentials.id;
        const { poiId } = request.payload;
        const result = await db.userStore.removeFavorite(userId, poiId);
        return h.response(result).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Failed to remove favorite");
      }
    },
    tags: ["api"],
    description: "Remove a favorite POI",
    notes: "Removes a POI from the user's list of favorites",
  },
  createAnnouncement: {
    auth: { strategy: "jwt" },
    handler: async (request, h) => {
      try {
        console.log(request.payload);
        const { title, message } = request.payload;
        const result = await db.userStore.createAnnouncement(title, message);
        return h.response(result).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Failed to create announcement");
      }
    },
    tags: ["api"],
    description: "Create a new announcement",
    notes: "Creates a new announcement for the noticeboard",
  },

  getAllAnnouncements: {
    auth: { strategy: "jwt" },
    handler: async (request, h) => {
      try {
        const announcements = await db.userStore.getAllAnnouncements();
        return h.response(announcements).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Failed to fetch announcements");
      }
    },
    description: "Get all announcements",
    notes: "Returns all announcements from the database",
  },

  deleteAllAnnouncements: {
    auth: { strategy: "jwt" },
    handler: async (request, h) => {
      try {
        const result = await db.userStore.deleteAllAnnouncements();
        return h.response(result).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Failed to delete all announcements");
      }
    },
    description: "Delete all announcements",
    notes: "Deletes all announcements from the database",
  },
};
