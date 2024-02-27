import { assert } from "chai";
import { recreospotService } from "../recreospot-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

describe("Authentication API tests", async () => {
  before(async () => {
    await recreospotService.deleteAllUsers();
  });

  it("authenticate", async () => {
    await recreospotService.createUser(maggie);
    const response = await recreospotService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  it("verify Token", async () => {
    const returnedUser = await recreospotService.createUser(maggie);
    const response = await recreospotService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  it("check Unauthorized", async () => {
    recreospotService.clearAuth();
    try {
      await recreospotService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
