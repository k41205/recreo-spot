export function userFirestoreStore(firestore) {
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
  };
}
