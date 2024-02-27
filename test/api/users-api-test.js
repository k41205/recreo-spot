import { expect } from "chai";
import { recreospotService } from "../recreospot-service.js";
import { maggie, testUsers } from "../fixtures.js";

const users = [];

describe("User API", () => {
  before(async () => {
    // Clear any existing authentication and users before starting tests
    await recreospotService.clearAuth();
    // Create and authenticate 'maggie' before each test
    await recreospotService.createUser(maggie);
    await recreospotService.authenticate(maggie);
  });

  beforeEach(async () => {
    // Delete all users before each test
    await recreospotService.deleteAllUsers();
    // Create test users
    // eslint-disable-next-line no-restricted-syntax
    for (const user of testUsers) {
      // eslint-disable-next-line no-await-in-loop
      const createdUser = await recreospotService.createUser(user);
      users.push(createdUser);
    }
    // Recreate and authenticate 'maggie'
    await recreospotService.createUser(maggie);
    await recreospotService.authenticate(maggie);
  });

  afterEach(async () => {
    // Cleanup after each test if necessary
  });

  it("should create a user with the expected properties", async () => {
    const newUser = await recreospotService.createUser(maggie);
    expect(newUser).to.include(maggie);
    expect(newUser).to.have.property("id").that.is.a("string");
  });

  it("should delete all users and only have the newly created user afterwards", async () => {
    let allUsers = await recreospotService.getAllUsers();
    expect(allUsers).to.have.lengthOf.at.least(1); // Assuming at least 'maggie' exists
    await recreospotService.deleteAllUsers();
    await recreospotService.createUser(maggie);
    await recreospotService.authenticate(maggie);
    allUsers = await recreospotService.getAllUsers();
    expect(allUsers).to.have.lengthOf(1);
  });

  it("should retrieve the correct user by their id", async () => {
    const userToRetrieve = users[0];
    const retrievedUser = await recreospotService.getUser(userToRetrieve.id);
    expect(retrievedUser).to.deep.equal(userToRetrieve);
  });

  it("should not find a user with a non-existent id", async () => {
    try {
      await recreospotService.getUser("nonexistent-id");
      expect.fail("The request should not succeed");
    } catch (error) {
      expect(error.response.data.message).to.equal("No User with this id");
      expect(error.response.data).to.have.property("statusCode", 404);
    }
  });

  it("should not find a user that has been deleted", async () => {
    const userToDelete = users[0];
    await recreospotService.deleteUser(userToDelete._id);
    try {
      await recreospotService.getUser(userToDelete._id);
      expect.fail("The request should not succeed");
    } catch (error) {
      expect(error.response.data.message).to.equal("No User with this id");
      expect(error.response.data).to.have.property("statusCode", 404);
    }
  });
});
