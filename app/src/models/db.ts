import { DB } from "db";
import { userFirestoreStore } from "./firestore/user-firestore-store.js";
import { poiFirestoreStore } from "./firestore/poi-firestore-store.js";
import { userMemStore } from "./mem/user-mem-store.js";
import { poiMemStore } from "./mem/poi-mem-store.js";
import { connectFirestore } from "./firestore/connect.js";

export const db: DB = {
  userStore: null,
  poiStore: null,

  init(storeType: string) {
    const { firestore, fieldValue } = connectFirestore();
    switch (storeType) {
      case "firestore":
        this.userStore = userFirestoreStore(firestore, fieldValue);
        this.poiStore = poiFirestoreStore(firestore);
        break;
      case "firestore-test":
        this.userStore = userFirestoreStore(firestore, fieldValue);
        this.poiStore = poiFirestoreStore(firestore);
        this.userStore.setCollectionTest(true);
        this.poiStore.setCollectionTest(true);
        break;
      default:
        //@ts-ignore
        this.userStore = userMemStore;
        //@ts-ignore
        this.poiStore = poiMemStore;
    }
  },
};
