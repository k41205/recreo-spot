// Set a default collection name
let collectionName = "pois";

export function poiFirestoreStore(firestore) {
  return {
    isCollectionTest(boolean) {
      collectionName = boolean ? "pois-test" : "pois";
    },

    async addPoi(poiData) {
      const poiRef = await firestore.collection(collectionName).add(poiData);
      const poiSnap = await poiRef.get();
      if (!poiSnap.exists) {
        throw new Error("Failed to create a new poi.");
      }
      return { id: poiSnap.id, ...poiSnap.data() };
    },

    async getPoiById(id) {
      const poiSnap = await firestore.collection(collectionName).doc(id).get();
      return poiSnap.exists ? { id: poiSnap.id, ...poiSnap.data() } : null;
    },

    async getPoisByUsername(username) {
      const poisQuerySnapshot = await firestore.collection(collectionName).where("author", "==", username).get();
      if (poisQuerySnapshot.empty) {
        return [];
      }
      return poisQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async getPublicPois() {
      const poisQuerySnapshot = await firestore.collection(collectionName).where("isPublic", "==", true).get();
      if (poisQuerySnapshot.empty) {
        return [];
      }
      return poisQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async getCandidatePois() {
      const poisQuerySnapshot = await firestore.collection(collectionName).where("isCandidate", "==", true).get();
      if (poisQuerySnapshot.empty) {
        return [];
      }
      return poisQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async getAllPois() {
      const snapshot = await firestore.collection(collectionName).get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async deletePoiById(id) {
      await firestore.collection(collectionName).doc(id).delete();
      const poi = await this.getPoiById(id);
      return poi === null; // returns true if deletion was successful
    },
  };
}
