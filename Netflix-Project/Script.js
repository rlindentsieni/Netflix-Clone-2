// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, // Added missing import
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your Firebase configuration
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


// Handle the sign-up button click (if present on the page)
const signupBtn = document.getElementById("signup-btn");
if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Perform Firebase sign-up
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        window.location.href = "landing.html"; // Removed hardcoded localhost URL
      })
      .catch((error) => {
        console.error("Error:", error.code, error.message);
        alert(`Error: ${error.message}`);
      });
  });
}

// Handle the sign-in button click
const signinBtn = document.getElementById("signin-btn");
if (signinBtn) {
  signinBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const spinner = document.getElementById("loading-spinner");
    if (spinner) spinner.style.display = "block";

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Don't set any session storage here, let onAuthStateChanged handle it
      window.location.href = "landing.html";
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      alert(`Sign-in failed: ${error.message}`);
    } finally {
      if (spinner) spinner.style.display = "none";
    }
  });
}

// Check authentication state
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes('signin.html')) {
    window.location.href = "landing.html";
  }
});

// Check for remembered email on page load
document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById("email");
  const rememberedEmail = localStorage.getItem('userEmail');
  if (emailInput && rememberedEmail) {
    emailInput.value = rememberedEmail;
    const rememberMe = document.getElementById("remember-me");
    if (rememberMe) rememberMe.checked = true;
  }
});




// // Check authentication state
// onAuthStateChanged(auth, (user) => {
//   // Only redirect if we're not already on the signup/signin pages
//   const currentPage = window.location.pathname;
//   const authPages = ['/signup.html', '/signin.html', '/index.html'];
  
//   if (!user && !authPages.some(page => currentPage.endsWith(page))) {
//     window.location.href = "signin.html";
//   } else if (user) {
//     console.log(`User is signed in: ${user.email}`);
//   }
// });

// Check for remembered email on page load
// document.addEventListener('DOMContentLoaded', () => {
//   const emailInput = document.getElementById("email");
//   const rememberedEmail = localStorage.getItem('userEmail');
//   if (emailInput && rememberedEmail) {
//     emailInput.value = rememberedEmail;
//     const rememberMe = document.getElementById("remember-me");
//     if (rememberMe) rememberMe.checked = true;
//   }
// });

// Plan selection
const planButtons = document.querySelectorAll(".plan-btn");
if (planButtons) {
  planButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const plan = btn.textContent.trim();
      localStorage.setItem("selectedPlan", plan);
      alert(`You selected: ${plan}`);
      window.location.href = "getstarted.html";
    });
  });
}

// Ensure plan is shown on signup page
if (window.location.pathname.includes("getstarted.html")) {
  const selectedPlan = localStorage.getItem("selectedPlan");
  if (!selectedPlan) {
    alert("Please choose a plan first.");
    window.location.href = "chooseplan.html";
  } else {
    document.getElementById("selected-plan").textContent = selectedPlan;
  }
}

// Handle sign-up logic
// const signupBtn = document.getElementById("signup-btn");
if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const selectedPlan = localStorage.getItem("selectedPlan");

    if (!email || !password || !selectedPlan) {
      alert("Please complete all fields and select a plan.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Save user plan to Firestore or Realtime Database
        const db = getFirestore();
        setDoc(doc(db, "users", user.uid), { email, plan: selectedPlan });
        window.location.href = "landing.html";
      })
      .catch((error) => {
        alert(`Sign-up error: ${error.message}`);
      });
  });
}