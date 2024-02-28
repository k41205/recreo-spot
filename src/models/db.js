import { userMemStore } from "./mem/user-mem-store.js";
// import { poiMemStore } from "./mem/poi-mem-store.js";
import { connectFirestore } from "./firestore/connect.js";
import { userFirestoreStore } from "./firestore/user-firestore-store.js";
import { poiFirestoreStore } from "./firestore/poi-firestore-store.js";

export const db = {
  userStore: null,
  poiStore: null,

  init(storeType) {
    switch (storeType) {
      case "firestore":
        // eslint-disable-next-line no-case-declarations
        const instance = connectFirestore();
        this.userStore = userFirestoreStore(instance);
        this.poiStore = poiFirestoreStore(instance);
        break;
      case "firestore-test":
        // eslint-disable-next-line no-case-declarations
        const testInstance = connectFirestore();
        this.userStore = userFirestoreStore(testInstance);
        this.poiStore = poiFirestoreStore(testInstance);
        this.userStore.setCollectionTest(true);
        this.poiStore.setCollectionTest(true);
        break;
      default:
        this.userStore = userMemStore;
        this.poiStore = poiMemStore;
    }
  },
};
