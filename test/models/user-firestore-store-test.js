import { expect } from "chai";
import { db } from "../../src/models/db.js";
import { maggie, usersDev } from "../fixtures.js";
import { purgeAll, seeding } from "../../src/utils/reset-db.js";

describe("User Model Firestore", () => {
  before(async () => {
    purgeAll();
    seeding();
  });

  it("Create a user", async () => {
    const newUser = await db.userStore.addUser(maggie);
    expect(newUser).to.deep.include(maggie);
  });

  it("Delete a user by id", async () => {
    const users = await db.userStore.getAllUsers();
    const userToDelete = users[0];
    const deletionSuccess = await db.userStore.deleteUserById(userToDelete.id);
    // eslint-disable-next-line no-unused-expressions
    expect(deletionSuccess).to.be.true;
  });

  it("Get all the users", async () => {
    const allUsers = await db.userStore.getAllUsers();
    expect(allUsers).to.have.lengthOf(5);
  });

  it("Find a user by id", async () => {
    const users = await db.userStore.getAllUsers();
    const userToFind = users.find((user) => user.username === "user1");
    expect(userToFind).to.deep.include(usersDev[2]);
  });

  it("Must not find a user with non-existent ID", async () => {
    const user = await db.userStore.getUserById("nonexistent");
    // eslint-disable-next-line no-unused-expressions
    expect(user).to.be.null;
  });

  it("Find a user by email", async () => {
    const user = await db.userStore.addUser(usersDev[2]);
    console.log(user);
    const foundUser = await db.userStore.getUserByEmail("user1@example.com");
    console.log(foundUser);
    expect(foundUser).to.deep.include(user);
  });

  it("Must not find a user with non-existent email", async () => {
    const user = await db.userStore.getUserByEmail("nonexistentemail@example.com");
    // eslint-disable-next-line no-unused-expressions
    expect(user).to.be.null;
  });
});
