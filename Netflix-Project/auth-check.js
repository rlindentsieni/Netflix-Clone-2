// landing-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv-3DvlY6cPZy5-bOlLEWcBJ4rryvXd_0",
  authDomain: "netflix-clone-e118c.firebaseapp.com",
  projectId: "netflix-clone-e118c",
  storageBucket: "netflix-clone-e118c.appspot.com",
  messagingSenderId: "909605438398",
  appId: "1:909605438398:web:06ce7b845fbf0911812fef",
  measurementId: "G-VYQZHDNH0T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Handle sign out
document.getElementById("signOut").addEventListener("click", async () => {
  try {
    await signOut(auth);
    // Clear any stored data
    localStorage.removeItem('userEmail');
    
    // Use replace instead of href to prevent history stacking
    window.location.replace("signin.html");
  } catch (error) {
    console.error("Error signing out:", error);
    alert("Error signing out. Please try again.");
  }
});

// Check authentication state
onAuthStateChanged(auth, (user) => {
  if (!user && window.location.pathname.includes('landing.html')) {
    window.location.replace("signin.html");
  }
});