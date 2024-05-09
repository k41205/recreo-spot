export function userFirestoreStore(firestore, FieldValue) {
  return {
    // Set a default collection name
    collectionName: "users",

    setCollectionTest(boolean) {
      this.collectionName = boolean ? "users-test" : "users";
    },

    async addUser(userData) {
      const userRef = await firestore.collection(this.collectionName).add(userData);
      const userSnap = await userRef.get();
      if (!userSnap.exists) {
        throw new Error("Failed to create a new user.");
      }
      return { id: userSnap.id, ...userSnap.data() };
    },

    async getUserById(id) {
      const userSnap = await firestore.collection(this.collectionName).doc(id).get();
      return userSnap.exists ? { id: userSnap.id, ...userSnap.data() } : null;
    },

    async getUserByUsername(username) {
      const userQuerySnapshot = await firestore.collection(this.collectionName).where("username", "==", username).get();
      if (userQuerySnapshot.empty) {
        return null;
      }
      // Assuming email is unique, take the first result
      const userDoc = userQuerySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    },

    async getUserByEmail(email) {
      const userQuerySnapshot = await firestore.collection(this.collectionName).where("email", "==", email).get();
      if (userQuerySnapshot.empty) {
        return null;
      }
      // Assuming email is unique, take the first result
      const userDoc = userQuerySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    },

    async getAllUsers() {
      const snapshot = await firestore.collection(this.collectionName).get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async updateUser(id, updateData) {
      const userRef = firestore.collection(this.collectionName).doc(id);
      await userRef.update(updateData);
      const updatedUserSnap = await userRef.get();
      if (!updatedUserSnap.exists) {
        throw new Error("User not found.");
      }
      return { id: updatedUserSnap.id, ...updatedUserSnap.data() };
    },

    async deleteUserById(id) {
      await firestore.collection(this.collectionName).doc(id).delete();
      const user = await this.getUserById(id);
      return user === null; // returns true if deletion was successful
    },

    async deleteAllUsers() {
      const snapshot = await firestore.collection(this.collectionName).get();
      const batch = firestore.batch();

      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      return true;
    },

    async getUserFavorites(userId) {
      const userRef = await firestore.collection(this.collectionName).doc(userId);
      const userSnap = await userRef.get();
      if (!userSnap.exists) {
        throw new Error("User not found.");
      }
      const userData = userSnap.data();
      return userData.favorites || [];
    },

    async addFavorite(userId, poiId, poiName) {
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

    async removeFavorite(userId, poiId) {
      const userRef = await firestore.collection(this.collectionName).doc(userId);
      const userSnap = await userRef.get();
      if (!userSnap.exists) {
        throw new Error("User not found.");
      }
      const userData = userSnap.data();
      const updatedFavorites = userData.favorites.filter((fav) => fav.id !== poiId);
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
  };
}
