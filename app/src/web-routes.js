import path from "path";
import { fileURLToPath } from "url";
import { accountsController } from "./controllers/accounts-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { userController } from "./controllers/user-controller.js";
import { profileController } from "./controllers/profile-controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/signup", config: accountsController.signup },
  { method: "POST", path: "/google-login", config: accountsController.googleLogin },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/admin", config: adminController.index },
  { method: "GET", path: "/user", config: userController.index },
  { method: "GET", path: "/profile", config: profileController.index },
  {
    method: "GET",
    path: "/{param*}",
    handler: { directory: { path: path.resolve(__dirname, process.env.NODE_ENV === "production" ? "../../dist/public" : "../../build/public") } },
    options: { auth: false },
  },
];
