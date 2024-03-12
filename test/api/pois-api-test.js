import { expect } from "chai";
import { maggie, testPois, testUsers } from "../fixtures.js";
import { recreospotService } from "../recreospot-service.js";

describe("POI API", () => {
  const auth = async () => {
    await recreospotService.createUser(maggie);
    await recreospotService.authenticate(maggie);
  };

  const clean = async () => {
    auth();
    await recreospotService.deleteAllPois();
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

  it("create - create a POI", async () => {
    const result = await recreospotService.createPoi(testPois[0]);
    expect(result).to.deep.include(testPois[0]);
  });

  it("findOne - find a POI by Id", async () => {
    const poi = await recreospotService.createPoi(testPois[0]);
    const poiId = poi.id;
    const result = await recreospotService.getPoi(poiId);
    expect(result).to.deep.include(testPois[0]);
  });

  it("findUserPois - find a POI by user Id", async function () {
    // to review
    this.timeout(5000);
    const user = await recreospotService.createUser(testUsers[0]);
    await recreospotService.authenticate(testUsers[0]);
    const userId = user.id;
    const allPois = [];
    // Fill db with some user from mock data
    // eslint-disable-next-line no-restricted-syntax
    for (const poi of testPois) {
      // eslint-disable-next-line no-await-in-loop
      const createdPoi = await recreospotService.createPoi(poi);
      allPois.push(createdPoi);
    }
    const result = allPois.map(({ id, author, ...data }) => data);
    expect(result).to.deep.members(testPois);
  });

  it("findPublicPois - find all the public POIs", async function () {
    this.timeout(5000);
    const allPois = [];
    // Fill db with some user from mock data
    // eslint-disable-next-line no-restricted-syntax
    for (const poi of testPois) {
      // eslint-disable-next-line no-await-in-loop
      const createdPoi = await recreospotService.createPoi(poi);
      allPois.push(createdPoi);
    }
    const publicPois = testPois.filter((poi) => poi.isPublic === true);
    const publicPoisDb = await recreospotService.getPoisPublic();
    const result = publicPoisDb.map(({ id, author, ...data }) => data);
    expect(result).to.deep.members(publicPois);
  });

  it("findCandidatePois - find all the candidate POIs", async function () {
    this.timeout(5000);
    const allPois = [];
    // Fill db with some user from mock data
    // eslint-disable-next-line no-restricted-syntax
    for (const poi of testPois) {
      // eslint-disable-next-line no-await-in-loop
      const createdPoi = await recreospotService.createPoi(poi);
      allPois.push(createdPoi);
    }
    const candidatePois = testPois.filter((poi) => poi.isCandidate === true);
    const candidatePoisDb = await recreospotService.getPoisCandidate();
    const result = candidatePoisDb.map(({ id, author, ...data }) => data);
    expect(result).to.deep.members(candidatePois);
  });

  it("find - find all the POIs", async function () {
    this.timeout(8000);
    const allPois = [];
    // Fill db with some user from mock data
    // eslint-disable-next-line no-restricted-syntax
    for (const poi of testPois) {
      // eslint-disable-next-line no-await-in-loop
      const createdPoi = await recreospotService.createPoi(poi);
      allPois.push(createdPoi);
    }
    const result = allPois.map(({ id, author, ...data }) => data);
    expect(result).to.deep.members(testPois);
  });

  it("deleteOne - delete a POI by Id", async () => {
    const poi = await recreospotService.createPoi(testPois[0]);
    const poiId = poi.id;
    const result = await recreospotService.deletePoi(poiId);
    expect(result).to.deep.equal({ success: true, message: "POI deleted successfully" });
  });

  it("delete - delete all the POIs", async () => {
    const allPois = [];
    // Fill db with some user from mock data
    // eslint-disable-next-line no-restricted-syntax
    for (const poi of testPois) {
      // eslint-disable-next-line no-await-in-loop
      const createdPoi = await recreospotService.createPoi(poi);
      allPois.push(createdPoi);
    }
    const result = await recreospotService.deleteAllPois();
    expect(result).to.deep.equal({ success: true, message: "POIs deleted successfully" });
  });
});
