import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { PoiCreatePayload, UserIdSpec, PoiIdSpec, PoiSchema, PoiArray } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const poiApi = {
  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        const userId = request.auth.credentials.id;
        const poi = await db.poiStore.addPoi(userId, request.payload);
        if (poi) {
          return h.response(poi).code(201);
        }
        return Boom.badImplementation("error creating POI");
      } catch (err) {
        return Boom.serverUnavailable("Error when creating a POI");
      }
    },
    tags: ["api"],
    description: "Create a POI",
    notes: "Returns the newly created POI",
    validate: { payload: PoiCreatePayload, failAction: validationError, options: { abortEarly: false } },
    response: { schema: PoiSchema, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        const poi = await db.poiStore.getPoiById(request.params.id);
        if (!poi) {
          return Boom.notFound("No POI with this id");
        }
        return poi;
      } catch (err) {
        return Boom.serverUnavailable("Error when looking for this id POI");
      }
    },
    tags: ["api"],
    description: "Get a specific POI",
    notes: "Returns POI details of the id passed by params",
    validate: { params: { id: PoiIdSpec }, failAction: validationError, options: { abortEarly: false } },
    response: { schema: PoiSchema, failAction: validationError },
  },

  findUserPois: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        const pois = await db.poiStore.getPoisByUser(request.params.userId);
        return pois;
      } catch (err) {
        return Boom.serverUnavailable("Error looking for user's POIs");
      }
    },
    tags: ["api"],
    description: "Get all user's POIs",
    notes: "Returns details of all user's POIs of the user id passed by params",
    validate: { params: { userId: UserIdSpec }, failAction: validationError, options: { abortEarly: false } },
    response: { schema: PoiArray, failAction: validationError },
  },

  findPublicPois: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        const pois = await db.poiStore.getPublicPois();
        return pois;
      } catch (err) {
        return Boom.serverUnavailable("Error looking for public POIs");
      }
    },
    tags: ["api"],
    description: "Get all public POIs",
    notes: "Returns all public POIs details",
    response: { schema: PoiArray, failAction: validationError },
  },

  findCandidatePois: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        const pois = await db.poiStore.getCandidatePois();
        return pois;
      } catch (err) {
        return Boom.serverUnavailable("Error looking for candidate POIs");
      }
    },
    tags: ["api"],
    description: "Get all candidate POIs",
    notes: "Returns all candidate POIs details",
    response: { schema: PoiArray, failAction: validationError },
  },

  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        const pois = await db.poiStore.getAllPois();
        return pois;
      } catch (err) {
        return Boom.serverUnavailable("Error looking for all POIs");
      }
    },
    tags: ["api"],
    description: "Get all POIs",
    notes: "Returns all POIs details",
    response: { schema: PoiArray, failAction: validationError },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        const poiId = request.params.id;
        const updateData = request.payload;
        const updatedPoi = await db.poiStore.updatePoi(poiId, updateData);
        if (updatedPoi) {
          return h.response(updatedPoi).code(200);
        }
        return Boom.notFound("User not found");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a specific POI",
    notes: "Updates a POI details of the id passed by params",
    validate: { params: { id: PoiIdSpec }, payload: PoiCreatePayload, failAction: validationError, options: { abortEarly: false } },
    response: { schema: PoiSchema, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        const poiDeleted = await db.poiStore.deletePoiById(request.params.id);
        if (!poiDeleted) {
          return Boom.notFound("POI not found or unable to delete");
        }
        return h.response({ success: true, message: "POI deleted successfully" }).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Error trying to delete this POI");
      }
    },
    tags: ["api"],
    description: "Delete a specific POI",
    notes: "Removes a POI of the id passed by params",
    validate: { params: { id: PoiIdSpec }, failAction: validationError, options: { abortEarly: false } },
  },

  delete: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        await db.poiStore.deleteAllPois();
        return h.response({ success: true, message: "POIs deleted successfully" }).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Error trying to delete all POIs");
      }
    },
    tags: ["api"],
    description: "Delete all POIs",
    notes: "Removes all the POIs",
  },
};
