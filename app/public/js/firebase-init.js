import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXCAoDd8q2_BtyheburtVVBQYMqo6etGM",
  authDomain: "recreo-spot.firebaseapp.com",
  projectId: "recreo-spot",
  storageBucket: "recreo-spot.appspot.com",
  messagingSenderId: "1083936224959",
  appId: "1:1083936224959:web:959000f945a4951099b80a",
  measurementId: "G-8P5DFLLBRQ",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
