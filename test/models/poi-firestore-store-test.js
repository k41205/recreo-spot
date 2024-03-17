import { expect } from "chai";
import { db } from "../../src/models/db.js";
import { poisDev } from "../fixtures.js";
import { purgeAll, seeding } from "../../src/utils/reset-db.js";

describe("POI Model Firestore", () => {
  // eslint-disable-next-line func-names
  beforeEach(async () => {
    purgeAll();
    seeding();
  });

  it("Get all the public POIs", async () => {
    const publicPois = await db.poiStore.getPublicPois();
    // Assuming there are 2 public POIs
    expect(publicPois.length).to.equal(2);
  });

  it("Get all POIs", async () => {
    const allPois = await db.poiStore.getAllPois();
    // Assuming the test setup inserts a known number of POIs
    expect(allPois.length).to.equal(poisDev.length);
  });

  it("Find a POI by ID", async () => {
    const pois = await db.poiStore.getAllPois();
    const expectedPoi = pois[0];
    const foundPoi = await db.poiStore.getPoiById(expectedPoi.id);
    expect(foundPoi).to.deep.include({ id: expectedPoi.id });
  });

  it("Must not find a POI with a non-existent ID", async () => {
    const poi = await db.poiStore.getPoiById("nonexistentId");
    // eslint-disable-next-line no-unused-expressions
    expect(poi).to.be.null;
  });

  it("Delete a POI by ID", async () => {
    const pois = await db.poiStore.getAllPois();
    const poiToDelete = pois[0];
    const deletionSuccess = await db.poiStore.deletePoiById(poiToDelete.id);
    // eslint-disable-next-line no-unused-expressions
    expect(deletionSuccess).to.be.true;
  });
});
