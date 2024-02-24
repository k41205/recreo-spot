// Set a default collection name
let collectionName = "users";

export function userFirestoreStore(firestore) {
  return {
    isCollectionTest(boolean) {
      collectionName = boolean ? "users-test" : "users";
    },

    async addUser(userData) {
      const userRef = await firestore.collection(collectionName).add(userData);
      const userSnap = await userRef.get();
      if (!userSnap.exists) {
        throw new Error("Failed to create a new user.");
      }
      return { id: userSnap.id, ...userSnap.data() };
    },

    async getUserById(id) {
      const userSnap = await firestore.collection(collectionName).doc(id).get();
      return userSnap.exists ? { id: userSnap.id, ...userSnap.data() } : null;
    },

    async getUserByUsername(username) {
      const userQuerySnapshot = await firestore.collection(collectionName).where("username", "==", username).get();
      if (userQuerySnapshot.empty) {
        return null;
      }
      // Assuming email is unique, take the first result
      const userDoc = userQuerySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    },

    async getUserByEmail(email) {
      const userQuerySnapshot = await firestore.collection(collectionName).where("email", "==", email).get();
      if (userQuerySnapshot.empty) {
        return null;
      }
      // Assuming email is unique, take the first result
      const userDoc = userQuerySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    },

    async getAllUsers() {
      const snapshot = await firestore.collection(collectionName).get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },

    async deleteUserById(id) {
      await firestore.collection(collectionName).doc(id).delete();
      const user = await this.getUserById(id);
      return user === null; // returns true if deletion was successful
    },
  };
}
