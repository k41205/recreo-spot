import { expect } from "chai";
import { db } from "../../src/models/db.js";
import { testPois } from "../fixtures.js";

describe("POI Model Firestore Tests", () => {
  // eslint-disable-next-line func-names
  beforeEach(async function () {
    this.timeout(5000); // Set timeout to 5 seconds
    // Initialize Firestore and switch to the test collection
    db.init("firestore");
    db.poiStore.isCollectionTest(true);

    // Clear the pois-test collection before each test
    const pois = await db.poiStore.getAllPois();
    // eslint-disable-next-line no-restricted-syntax
    for (const poi of pois) {
      // eslint-disable-next-line no-await-in-loop
      await db.poiStore.deletePoiById(poi.id);
    }

    // Insert default POIs to be used in tests
    // eslint-disable-next-line no-restricted-syntax
    for (const poi of testPois) {
      // eslint-disable-next-line no-await-in-loop
      await db.poiStore.addPoi(poi);
    }
  });

  it("should get all public POIs", async () => {
    const publicPois = await db.poiStore.getPublicPois();
    // Assuming there are 2 public POIs
    expect(publicPois.length).to.equal(2);
  });

  it("should get POIs by username", async () => {
    // Assuming testPois has at least one POI
    const expectedAuthor = testPois[0].author;
    const poisByAuthor = await db.poiStore.getPoisByUsername(expectedAuthor);
    expect(poisByAuthor).to.satisfy((pois) => pois.every((poi) => poi.author === expectedAuthor));
  });

  it("should return an empty array for a non-existent author", async () => {
    const poisByAuthor = await db.poiStore.getPoisByUsername("nonexistentAuthor");
    // eslint-disable-next-line no-unused-expressions
    expect(poisByAuthor).to.be.an("array").that.is.empty;
  });

  it("should get all POIs", async () => {
    const allPois = await db.poiStore.getAllPois();
    // Assuming the test setup inserts a known number of POIs
    expect(allPois.length).to.equal(testPois.length);
  });

  it("should find a POI by ID", async () => {
    const pois = await db.poiStore.getAllPois();
    const expectedPoi = pois[0];
    const foundPoi = await db.poiStore.getPoiById(expectedPoi.id);
    expect(foundPoi).to.deep.include({ id: expectedPoi.id });
  });

  it("should not find a POI with a non-existent ID", async () => {
    const poi = await db.poiStore.getPoiById("nonexistentId");
    // eslint-disable-next-line no-unused-expressions
    expect(poi).to.be.null;
  });

  it("should create a new POI", async () => {
    const newPoi = { author: "user10", name: "POI Private 10", isPublic: false, isCandidate: false, lat: "10lat", lon: "10lon", description: "Some private text 10" };
    const addedPoi = await db.poiStore.addPoi(newPoi);
    expect(addedPoi).to.deep.include(newPoi);
  });

  it("should delete a POI by ID", async () => {
    const pois = await db.poiStore.getAllPois();
    const poiToDelete = pois[0];
    const deletionSuccess = await db.poiStore.deletePoiById(poiToDelete.id);
    // eslint-disable-next-line no-unused-expressions
    expect(deletionSuccess).to.be.true;
  });
});
