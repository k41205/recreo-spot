import dotenv from "dotenv";
import { db } from "../models/db.js";
import { usersDev, poisDev } from "../../test/fixtures.js";

dotenv.config();
db.init("firestore-test");

const allUsers = [];

export const purgeAll = async () => {
  await db.userStore.deleteAllUsers();
  await db.poiStore.deleteAllPois();
};

const seedUsersTestCollection = async () => {
  // Fill db with some user from mock data
  // eslint-disable-next-line no-restricted-syntax
  for (const user of usersDev) {
    // eslint-disable-next-line no-await-in-loop
    const createdUser = await db.userStore.addUser(user);
    allUsers.push(createdUser);
  }
};

const seedPoisTestCollection = async (userMapping) => {
  const allPois = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const poi of poisDev) {
    if (userMapping[poi.author]) {
      const userId = userMapping[poi.author];
      const { author, ...poiDataWithoutAuthor } = poi;
      // eslint-disable-next-line no-await-in-loop
      const createdPoi = await db.poiStore.addPoi(userId, poiDataWithoutAuthor);
      allPois.push(createdPoi);
    }
  }
};

export const seeding = async () => {
  await seedUsersTestCollection();

  const userMapping = allUsers.reduce((acc, user) => {
    acc[user.username] = user.id;
    return acc;
  }, {});

  await seedPoisTestCollection(userMapping);
};

// Running the main function if this file is run directly with '--run' flag
if (process.argv.includes("--run")) {
  purgeAll();
  seeding();
}
