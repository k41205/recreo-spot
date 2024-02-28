export function poiFirestoreStore(firestore) {
  return {
    // Set a default collection name
    collectionName: "pois",

    setCollectionTest(boolean) {
      this.collectionName = boolean ? "pois-test" : "pois";
    },

    async addPoi(userId, poiData) {
      const poiDataWithAuthor = { author: userId, ...poiData };
      const poiRef = await firestore.collection(this.collectionName).add(poiDataWithAuthor);
      const poiSnap = await poiRef.get();
      if (!poiSnap.exists) {
        throw new Error("Failed to create a new poi.");
      }
      return { id: poiSnap.id, ...poiSnap.data() };
    },

    async getPoiById(id) {
      const poiSnap = await firestore.collection(this.collectionName).doc(id).get();
      return poiSnap.exists ? { id: poiSnap.id, ...poiSnap.data() } : null;
    },

    async getPoisByUser(id) {
      const poisQuerySnapshot = await firestore.collection(this.collectionName).where("author", "==", id).get();
      if (poisQuerySnapshot.empty) {
        return [];
      }
      return poisQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async getPublicPois() {
      const poisQuerySnapshot = await firestore.collection(this.collectionName).where("isPublic", "==", true).get();
      if (poisQuerySnapshot.empty) {
        return [];
      }
      return poisQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async getCandidatePois() {
      const poisQuerySnapshot = await firestore.collection(this.collectionName).where("isCandidate", "==", true).get();
      if (poisQuerySnapshot.empty) {
        return [];
      }
      return poisQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async getAllPois() {
      const snapshot = await firestore.collection(this.collectionName).get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async deletePoiById(id) {
      await firestore.collection(this.collectionName).doc(id).delete();
      const poi = await this.getPoiById(id);
      return poi === null; // returns true if deletion was successful
    },

    async deleteAllPois() {
      const snapshot = await firestore.collection(this.collectionName).get();
      const batch = firestore.batch();

      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      return true;
    },
  };
}
