import admin from "firebase-admin";
import { UserFirestoreStore, User, Favorite, Announcement } from "user-firestore-store";

export function userFirestoreStore(firestore: admin.firestore.Firestore, FieldValue: typeof admin.firestore.FieldValue): UserFirestoreStore {
  return {
    // Set a default collection name
    collectionName: "users",
    noticeboard: "noticeboard",

    setCollectionTest(boolean: boolean): void {
      this.collectionName = boolean ? "users-test" : "users";
      this.noticeboard = boolean ? "noticeboard-test" : "noticeboard";
    },

    async addUser(userData: User): Promise<User> {
      const userRef = await firestore.collection(this.collectionName).add(userData);
      const userSnap = await userRef.get();
      if (!userSnap.exists) {
        throw new Error("Failed to create a new user.");
      }
      return { id: userSnap.id, type: "user", ...userSnap.data() } as User;
    },

    async getUserById(id: string): Promise<User | null> {
      const userSnap = await firestore.collection(this.collectionName).doc(id).get();
      return userSnap.exists ? ({ id: userSnap.id, ...userSnap.data() } as User) : null;
    },

    async getUserByUsername(username: string): Promise<User | null> {
      const userQuerySnapshot = await firestore.collection(this.collectionName).where("username", "==", username).get();
      if (userQuerySnapshot.empty) {
        return null;
      }
      // Assuming email is unique, take the first result
      const userDoc = userQuerySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() } as User;
    },

    async getUserByEmail(email: string): Promise<User | null> {
      const userQuerySnapshot = await firestore.collection(this.collectionName).where("email", "==", email).get();
      if (userQuerySnapshot.empty) {
        return null;
      }
      // Assuming email is unique, take the first result
      const userDoc = userQuerySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() } as User;
    },

    async getAllUsers(): Promise<User[]> {
      const snapshot = await firestore.collection(this.collectionName).get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as User);
    },

    async updateUser(id: string, updateData: Partial<User>): Promise<User> {
      const userRef = firestore.collection(this.collectionName).doc(id);
      await userRef.update(updateData);
      const updatedUserSnap = await userRef.get();
      if (!updatedUserSnap.exists) {
        throw new Error("User not found.");
      }
      return { ...(updatedUserSnap.data() as User) };
    },

    async deleteUserById(id: string): Promise<boolean> {
      await firestore.collection(this.collectionName).doc(id).delete();
      const user = await this.getUserById(id);
      return user === null; // returns true if deletion was successful
    },

    async deleteAllUsers(): Promise<boolean> {
      const snapshot = await firestore.collection(this.collectionName).get();
      const batch = firestore.batch();

      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      return true;
    },

    async getUserFavorites(userId: string): Promise<Favorite[]> {
      const userRef = await firestore.collection(this.collectionName).doc(userId);
      const userSnap = await userRef.get();
      if (!userSnap.exists) {
        throw new Error("User not found.");
      }
      const userData = userSnap.data();
      if (!userData) {
        throw new Error("UserData not found.");
      }
      return userData.favorites || [];
    },

    async addFavorite(userId: string, poiId: string, poiName: string): Promise<{ success: boolean; message: string }> {
      const userRef = await firestore.collection(this.collectionName).doc(userId);
      try {
        await userRef.update({
          favorites: FieldValue.arrayUnion({
            id: poiId,
            name: poiName,
          }),
        });
        return { success: true, message: "Favorite added" };
      } catch (error) {
        console.error("Failed to add favorite:", error);
        throw new Error("Failed to add favorite");
      }
    },

    async removeFavorite(userId: string, poiId: string): Promise<{ success: boolean; message: string }> {
      const userRef = await firestore.collection(this.collectionName).doc(userId);
      const userSnap = await userRef.get();
      if (!userSnap.exists) {
        throw new Error("User not found.");
      }
      const userData = userSnap.data();
      if (!userData) {
        throw new Error("UserData not found.");
      }
      const updatedFavorites = userData.favorites.filter((fav: Favorite) => fav.id !== poiId);
      try {
        await userRef.update({
          favorites: updatedFavorites,
        });
        return { success: true, message: "Favorite removed" };
      } catch (error) {
        console.error("Failed to remove favorite:", error);
        throw new Error("Failed to remove favorite");
      }
    },

    async createAnnouncement(title: string, message: string): Promise<Announcement> {
      try {
        const announcementRef = await firestore.collection(this.noticeboard).add({
          title,
          message,
          date: FieldValue.serverTimestamp(),
        });
        const announcementSnap = await announcementRef.get();
        return { id: announcementSnap.id, ...announcementSnap.data() } as Announcement;
      } catch (error) {
        console.error("Failed to create announcement:", error);
        throw new Error("Failed to create announcement");
      }
    },

    async getAllAnnouncements(): Promise<Announcement[]> {
      const snapshot = await firestore.collection(this.noticeboard).get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Announcement);
    },

    async deleteAllAnnouncements(): Promise<{ success: boolean; message: string }> {
      const snapshot = await firestore.collection(this.noticeboard).get();
      const batch = firestore.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      return { success: true, message: "All announcements deleted successfully" };
    },
  };
}
