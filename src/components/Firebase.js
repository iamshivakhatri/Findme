// Import the necessary functions from Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCSf8t9cX-LDiUpU9B2VEKXbpDcexiXno",
  authDomain: "bondness-e8bdc.firebaseapp.com",
  projectId: "bondness-e8bdc",
  storageBucket: "bondness-e8bdc.appspot.com",
  messagingSenderId: "656083847400",
  appId: "1:656083847400:web:653c150eb02d59aebaa15d"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Create a Firestore instance
const db = getFirestore(app);

const auth = getAuth(app); // Add this line

export { db, auth };
