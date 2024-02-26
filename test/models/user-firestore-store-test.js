import { expect } from "chai";
import { db } from "../../src/models/db.js";
import { testUsers } from "../fixtures.js";

describe("User Model Firestore Tests", () => {
  beforeEach(async () => {
    // Initialize Firestore and switch to the test collection
    db.init("firestore");
    db.userStore.isCollectionTest(true);

    // Clear the users-test collection before each test
    const users = await db.userStore.getAllUsers();
    // eslint-disable-next-line no-restricted-syntax
    for (const user of users) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.deleteUserById(user.id);
    }

    // Define and insert default users to be used in tests
    // eslint-disable-next-line no-restricted-syntax
    for (const user of testUsers) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(user);
    }
  });

  it("should create a new user", async () => {
    const newUser = { name: "User Four", surname: "Surname Four", password: "password4", type: "user", username: "userfour", email: "userfour@example.com" };
    const addedUser = await db.userStore.addUser(newUser);
    expect(addedUser).to.deep.include(newUser);
  });

  it("should delete a user by ID", async () => {
    const users = await db.userStore.getAllUsers();
    const userToDelete = users[0];
    const deletionSuccess = await db.userStore.deleteUserById(userToDelete.id);
    // eslint-disable-next-line no-unused-expressions
    expect(deletionSuccess).to.be.true;
  });

  it("should get all users", async () => {
    const allUsers = await db.userStore.getAllUsers();
    // Assuming there were 3 default users, and we're adding one more
    expect(allUsers).to.have.lengthOf(3);
  });

  it("should find a user by ID", async () => {
    const users = await db.userStore.getAllUsers();
    const userToFind = users[0];
    const user = await db.userStore.getUserById(userToFind.id);
    expect(user).to.deep.include({ id: userToFind.id, name: userToFind.name });
  });

  it("should not find a user with non-existent ID", async () => {
    const user = await db.userStore.getUserById("nonexistent");
    // eslint-disable-next-line no-unused-expressions
    expect(user).to.be.null;
  });

  it("should find a user by username", async () => {
    const expectedUser = testUsers[0]; // Assuming testUsers has at least one user
    const foundUser = await db.userStore.getUserByUsername(expectedUser.username);
    expect(foundUser).to.deep.include({ username: expectedUser.username });
  });

  it("should not find a user with non-existent username", async () => {
    const user = await db.userStore.getUserByUsername("nonexistentUsername");
    // eslint-disable-next-line no-unused-expressions
    expect(user).to.be.null;
  });

  it("should find a user by email", async () => {
    const expectedUser = testUsers[0]; // Assuming testUsers has at least one user with a unique email
    await db.userStore.addUser(expectedUser); // Ensure the user is added for the test
    const foundUser = await db.userStore.getUserByEmail(expectedUser.email);
    expect(foundUser).to.deep.include({ email: expectedUser.email });
  });

  it("should not find a user with non-existent email", async () => {
    const user = await db.userStore.getUserByEmail("nonexistentemail@example.com");
    // eslint-disable-next-line no-unused-expressions
    expect(user).to.be.null;
  });
});
