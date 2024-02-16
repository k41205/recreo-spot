import { v4 } from "uuid";

let poiList = [];

export const poiMemStore = {
  async getAllPois() {
    return poiList;
  },

  async addPoi(poi) {
    poi._id = v4();
    poiList.push(poi);
    return poi;
  },

  async getPoiById(id) {
    return poiList.find((poi) => poi._id === id);
  },

  async deletePoiById(id) {
    const index = poiList.findIndex((poi) => poi._id === id);
    poiList.splice(index, 1);
  },

  async deleteAllPois() {
    poiList = [];
  },
};
