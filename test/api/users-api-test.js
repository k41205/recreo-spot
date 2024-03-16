import { expect } from "chai";
import { recreospotService } from "../recreospot-service-test.js";
import { maggie, testUsers } from "../fixtures.js";

describe("User API", () => {
  const auth = async () => {
    await recreospotService.createUser(maggie);
    await recreospotService.authenticate(maggie);
  };

  const clean = async () => {
    await auth();
    await recreospotService.deleteAllUsers();
    recreospotService.clearAuth();
  };

  beforeEach(async () => {
    await auth();
  });

  afterEach(async () => {
    // Comment line below to check results on Cloud Firestore
    // await clean();
  });

  it("create - create a user", async () => {
    const result = await recreospotService.createUser(testUsers[0]);
    expect(result).to.deep.include(testUsers[0]);
  });

  it("findOne - find a user by Id", async () => {
    const user = await recreospotService.createUser(testUsers[0]);
    const userId = user.id;
    const result = await recreospotService.getUser(userId);
    expect(result).to.deep.include(testUsers[0]);
  });

  it("find - find all the users", async () => {
    const allUsers = [];
    // Fill db with some user from mock data
    // eslint-disable-next-line no-restricted-syntax
    for (const user of testUsers) {
      // eslint-disable-next-line no-await-in-loop
      const createdUser = await recreospotService.createUser(user);
      allUsers.push(createdUser);
    }
    const allUsersDb = await recreospotService.getAllUsers();
    // exclude Maggie user created just to auth the api call
    const allUserDbFilterd = allUsersDb.filter((item) => item.firstName !== "Maggie");
    // exclude Id from any user object
    const result = allUserDbFilterd.map(({ id, ...data }) => data);
    expect(result).to.deep.members(testUsers);
  });

  it("deleteOne - delete a user by Id", async () => {
    const user = await recreospotService.createUser(testUsers[0]);
    const userId = user.id;
    const result = await recreospotService.deleteUser(userId);
    console.log(result);
    expect(result).to.deep.equal({ success: true, message: "User deleted successfully" });
  });

  it("delete - delete all the users", async () => {
    const allUsers = [];
    // Fill db with some user from mock data
    // eslint-disable-next-line no-restricted-syntax
    for (const user of testUsers) {
      // eslint-disable-next-line no-await-in-loop
      const createdUser = await recreospotService.createUser(user);
      allUsers.push(createdUser);
    }
    const result = await recreospotService.deleteAllUsers();
    expect(result).to.deep.equal({ success: true, message: "Users deleted successfully" });
  });
});
