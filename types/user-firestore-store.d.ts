import { FieldValue } from "firebase-admin/firestore";

export type UserRole = "admin" | "mod" | "user";

export type Favorite = {
  id: string;
  name: string;
};

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  type: UserRole;
  password: string | null;
  favorites?: Favorite[];
}

export interface Announcement {
  id?: string;
  title: string;
  message: string;
  date: FirebaseFirestore.FieldValue;
}

export type arrayUnion = typeof FieldValue;

export interface UserFirestoreStore {
  collectionName: string;
  noticeboard: string;
  setCollectionTest(boolean: boolean): void;
  addUser(userData: User): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: string, updateData: Partial<User>): Promise<User>;
  deleteUserById(id: string): Promise<boolean>;
  deleteAllUsers(): Promise<boolean>;
  getUserFavorites(userId: string): Promise<Favorite[]>;
  addFavorite(userId: string, poiId: string, poiName: string): Promise<{ success: boolean; message: string }>;
  removeFavorite(userId: string, poiId: string): Promise<{ success: boolean; message: string }>;
  createAnnouncement(title: string, message: string): Promise<Announcement>;
  getAllAnnouncements(): Promise<Announcement[]>;
  deleteAllAnnouncements(): Promise<{ success: boolean; message: string }>;
}
