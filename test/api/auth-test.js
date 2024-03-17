import { assert, expect } from "chai";
import { recreospotService } from "../recreospot-service-test.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";
import { purgeAll } from "../../src/utils/reset-db.js";

describe("Authentication API", async () => {
  let userId = "";
  let userToken = "";

  before(async () => {
    await purgeAll();
  });

  it("Authenticate", async () => {
    const user = await recreospotService.createUser(maggie);
    userId = user.id;
    const { email, password } = user;
    const response = await recreospotService.authenticate({ email, password });
    userToken = response.token;
    expect(response).to.deep.equal({ success: true, token: userToken });
  });

  it("verify Token", async () => {
    const userInfo = decodeToken(userToken);
    expect(userId).to.equal(userInfo.userId);
  });

  it("check Unauthorized", async () => {
    recreospotService.clearAuth();
    try {
      await recreospotService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      if (error.response) {
        expect(error.response.data).to.have.property("statusCode", 401);
      }
      // Let buble up the error to reach Mocha
      if (error.name === "AssertionError") {
        throw error;
      }
    }
  });
});
