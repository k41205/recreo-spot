import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

document.getElementById("google-login-btn").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    const response = await fetch("/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken }),
    });
    if (!response.ok) {
      console.error("HTTP error", response.status, response.statusText);
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Success:", data);
    window.location.href = data.redirectUrl;
  } catch (error) {
    console.error("Error during the sign-in or fetching process:", error.message);
  }
});
