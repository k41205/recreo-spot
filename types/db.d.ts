import { UserFirestoreStore } from "./user-firestore-store";
import { PoiFirestoreStore } from "./poi-firestore-store";

export interface DB {
  userStore: UserFirestoreStore | null;
  poiStore: PoiFirestoreStore | null;
  init(storeType: string): void;
}
