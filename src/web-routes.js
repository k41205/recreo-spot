import { accountsController } from "./controllers/accounts-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { modController } from "./controllers/mod-controller.js";
import { userController } from "./controllers/user-controller.js";
import { profileController } from "./controllers/profile-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/signup", config: accountsController.signup },
  { method: "POST", path: "/google-login", config: accountsController.googleLogin },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/admin", config: adminController.index },
  { method: "GET", path: "/mod", config: modController.index },
  { method: "GET", path: "/user", config: userController.index },
  { method: "GET", path: "/profile", config: profileController.index },
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
