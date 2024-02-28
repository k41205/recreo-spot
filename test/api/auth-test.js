import { AssertionError, assert, expect } from "chai";
import { recreospotService } from "../recreospot-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

describe("Authentication API", async () => {
  let userId = "";
  let userToken = "";

  before(async () => {
    await recreospotService.createUser(maggie);
    await recreospotService.authenticate(maggie);
    await recreospotService.deleteAllUsers();
    recreospotService.clearAuth();
  });

  it("Authenticate", async () => {
    const user = await recreospotService.createUser(maggie);
    userId = user.id;
    const response = await recreospotService.authenticate(maggie);
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
