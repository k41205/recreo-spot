import { expect } from "chai";
import { maggie, poisMock } from "../fixtures.js";
import { recreospotService } from "../recreospot-service-test.js";

describe("POI API", () => {
  const auth = async () => {
    const user = await recreospotService.createUser(maggie);
    const { email, password } = user;
    await recreospotService.authenticate({ email, password });
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
    await clean();
  });

  it("create - create a POI", async () => {
    const result = await recreospotService.createPoi(poisMock[0]);
    expect(result).to.deep.include(poisMock[0]);
  });

  it("findOne - find a POI by Id", async () => {
    const poi = await recreospotService.createPoi(poisMock[0]);
    const poiId = poi.id;
    const result = await recreospotService.getPoi(poiId);
    expect(result).to.deep.include(poisMock[0]);
  });

  it("findUserPois - find a POI by user Id", async function () {
    // to review
    this.timeout(5000);
    const user = await recreospotService.createUser(maggie);
    const { userId, email, password } = user;
    await recreospotService.authenticate({ email, password });
    const allUserPois = [];
    // Fill db with some user from mock data
    // eslint-disable-next-line no-restricted-syntax
    for (const poi of poisMock) {
      // eslint-disable-next-line no-await-in-loop
      const createdPoi = await recreospotService.createPoi(poi);
      allUserPois.push(createdPoi);
    }
    const result = allUserPois.map(({ id, author, isCandidate, isPublic, ...data }) => data);
    expect(result).to.deep.members(poisMock);
  });

  it("findPublicPois - find all the public POIs", async function () {
    this.timeout(5000);
    const allPois = [];
    // Fill db with some user from mock data
    // eslint-disable-next-line no-restricted-syntax
    for (const poi of poisMock) {
      // eslint-disable-next-line no-await-in-loop
      const createdPoi = await recreospotService.createPoi(poi);
      allPois.push(createdPoi);
    }
    const publicPois = poisMock.filter((poi) => poi.isPublic === true);
    const publicPoisDb = await recreospotService.getPoisPublic();
    const result = publicPoisDb.map(({ id, author, ...data }) => data);
    expect(result).to.deep.members(publicPois);
  });

  it("findCandidatePois - find all the candidate POIs", async function () {
    this.timeout(5000);
    const allPois = [];
    // Fill db with some user from mock data
    // eslint-disable-next-line no-restricted-syntax
    for (const poi of poisMock) {
      // eslint-disable-next-line no-await-in-loop
      const createdPoi = await recreospotService.createPoi(poi);
      allPois.push(createdPoi);
    }
    const candidatePois = poisMock.filter((poi) => poi.isCandidate === true);
    const candidatePoisDb = await recreospotService.getPoisCandidate();
    const result = candidatePoisDb.map(({ id, author, ...data }) => data);
    expect(result).to.deep.members(candidatePois);
  });

  it("find - find all the POIs", async function () {
    this.timeout(8000);
    const allPois = [];
    // Fill db with some user from mock data
    // eslint-disable-next-line no-restricted-syntax
    for (const poi of poisMock) {
      // eslint-disable-next-line no-await-in-loop
      const createdPoi = await recreospotService.createPoi(poi);
      allPois.push(createdPoi);
    }
    const result = allPois.map(({ id, author, isCandidate, isPublic, ...data }) => data);
    expect(result).to.deep.members(poisMock);
  });

  it("deleteOne - delete a POI by Id", async () => {
    const poi = await recreospotService.createPoi(poisMock[0]);
    const poiId = poi.id;
    const result = await recreospotService.deletePoi(poiId);
    expect(result).to.deep.equal({ success: true, message: "POI deleted successfully" });
  });

  it("delete - delete all the POIs", async () => {
    const allPois = [];
    // Fill db with some user from mock data
    // eslint-disable-next-line no-restricted-syntax
    for (const poi of poisMock) {
      // eslint-disable-next-line no-await-in-loop
      const createdPoi = await recreospotService.createPoi(poi);
      allPois.push(createdPoi);
    }
    const result = await recreospotService.deleteAllPois();
    expect(result).to.deep.equal({ success: true, message: "POIs deleted successfully" });
  });
});
