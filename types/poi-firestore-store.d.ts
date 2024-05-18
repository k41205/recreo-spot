export interface Poi {
  id?: string;
  name?: string;
  author?: string;
  isPublic?: boolean;
  isCandidate?: boolean;
  lat?: string;
  lon?: string;
  description?: string;
}

export interface PoiFirestoreStore {
  collectionName: string;
  setCollectionTest(boolean: boolean): void;
  addPoi(userId: string, poiData: Partial<Poi>): Promise<Poi>;
  getPoiById(id: string): Promise<Poi | null>;
  getPoisByUser(id: string): Promise<Poi[]>;
  getPublicPois(): Promise<Poi[]>;
  getCandidatePois(): Promise<Poi[]>;
  getAllPois(): Promise<Poi[]>;
  updatePoi(id: string, updateData: Partial<Poi>): Promise<Poi>;
  deletePoiById(id: string): Promise<boolean>;
  deleteAllPois(): Promise<boolean>;
}
