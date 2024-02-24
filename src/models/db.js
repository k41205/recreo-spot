import { userMemStore } from "./mem/user-mem-store.js";
import { connectFirestore } from "./firestore/connect.js";
import { userFirestoreStore } from "./firestore/user-firestore-store.js";

export const db = {
  userStore: null,
  playlistStore: null,
  trackStore: null,

  init(storeType) {
    switch (storeType) {
      case "firestore":
        this.userStore = userFirestoreStore(connectFirestore());
        break;
      default:
        this.userStore = userMemStore;
    }
  },
};
