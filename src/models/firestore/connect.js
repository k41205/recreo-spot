import admin from "firebase-admin";

export function connectFirestore() {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  return admin.firestore();
}
