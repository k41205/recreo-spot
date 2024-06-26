import dotenv from "dotenv";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Hapi, { ResponseToolkit, Request } from "@hapi/hapi";
import path from "path";
import Joi from "joi";
import Cookie from "@hapi/cookie";
import Jwt from "hapi-auth-jwt2";
import HapiSwagger from "hapi-swagger";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import { accountsController } from "./controllers/accounts-controller.js";
import { validate } from "./api/jwt-utils.js";
import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";
import { eq } from "./utils/handlebars-helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
} else {
  dotenv.config({ path: path.resolve(__dirname, "../../.env.development") });
}
console.log(`ENV: ${process.env.NODE_ENV}`);

const swaggerOptions = {
  info: {
    title: "RecreoSpot API",
    version: "1.0",
  },
};

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
  });

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  await server.register(Cookie);
  await server.register(Jwt);

  server.validator(Joi);

  // Register the helpers
  Handlebars.registerHelper("eq", eq);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: path.join(__dirname, "views"),
    layoutPath: path.join(__dirname, "views/layouts"),
    partialsPath: path.join(__dirname, "views/partials"),
    layout: true,
    isCached: false,
  });

  server.ext("onPreResponse", (request: Request, h: ResponseToolkit) => {
    const { response } = request;
    // @ts-ignore
    if (response.variety === "view") {
      // @ts-ignore
      response.source.context = response.source.context || {};
      // @ts-ignore
      response.source.context.baseUrl = process.env.API_BASE_URL;
    }
    return h.continue;
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "session",
      password: process.env.COOKIE_PASSWORD,
      isSecure: process.env.NODE_ENV === "production",
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.strategy("jwt", "jwt", {
    key: process.env.COOKIE_PASSWORD,
    validate,
    verifyOptions: { algorithms: ["HS256"] },
  });
  server.auth.default("jwt");

  if (!process.env.FIRESTORE_INSTANCE) {
    throw new Error("FIRESTORE_INSTANCE environment variable is not set");
  }
  console.log(`DB: ${process.env.FIRESTORE_INSTANCE}`);
  db.init(process.env.FIRESTORE_INSTANCE);
  // @ts-ignore
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
