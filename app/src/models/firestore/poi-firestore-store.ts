import admin from "firebase-admin";
import { Poi, PoiFirestoreStore } from "poi-firestore-store";

export function poiFirestoreStore(firestore: admin.firestore.Firestore): PoiFirestoreStore {
  return {
    // Set a default collection name
    collectionName: "pois",

    setCollectionTest(boolean: boolean): void {
      this.collectionName = boolean ? "pois-test" : "pois";
    },

    async addPoi(userId: string, poiData: Partial<Poi>): Promise<Poi> {
      const poiDataWithAuthor = { author: userId, isPublic: false, isCandidate: false, ...poiData };
      const poiRef = await firestore.collection(this.collectionName).add(poiDataWithAuthor);
      const poiSnap = await poiRef.get();
      if (!poiSnap.exists) {
        throw new Error("Failed to create a new poi.");
      }
      return { id: poiSnap.id, ...poiSnap.data() };
    },

    async getPoiById(id: string): Promise<Poi | null> {
      const poiSnap = await firestore.collection(this.collectionName).doc(id).get();
      return poiSnap.exists ? { id: poiSnap.id, ...poiSnap.data() } : null;
    },

    async getPoisByUser(id: string): Promise<Poi[]> {
      const poisQuerySnapshot = await firestore.collection(this.collectionName).where("author", "==", id).get();
      if (poisQuerySnapshot.empty) {
        return [];
      }
      return poisQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async getPublicPois(): Promise<Poi[]> {
      const poisQuerySnapshot = await firestore.collection(this.collectionName).where("isPublic", "==", true).get();
      if (poisQuerySnapshot.empty) {
        return [];
      }
      return poisQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async getCandidatePois(): Promise<Poi[]> {
      const poisQuerySnapshot = await firestore.collection(this.collectionName).where("isCandidate", "==", true).get();
      if (poisQuerySnapshot.empty) {
        return [];
      }
      return poisQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async getAllPois(): Promise<Poi[]> {
      const snapshot = await firestore.collection(this.collectionName).get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async updatePoi(id: string, updateData: Partial<Poi>): Promise<Poi> {
      const poiRef = firestore.collection(this.collectionName).doc(id);
      console.log(updateData);
      await poiRef.update(updateData);
      const updatedPoiSnap = await poiRef.get();
      if (!updatedPoiSnap.exists) {
        throw new Error("POI not found.");
      }
      return { id: updatedPoiSnap.id, ...updatedPoiSnap.data() };
    },

    async deletePoiById(id: string): Promise<boolean> {
      await firestore.collection(this.collectionName).doc(id).delete();
      const poi = await this.getPoiById(id);
      return poi === null; // returns true if deletion was successful
    },

    async deleteAllPois(): Promise<boolean> {
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
