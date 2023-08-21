// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBSYlWCREletGGPyFwp8SBX_53SnyQJCm0",
  authDomain: "uni-test-442a6.firebaseapp.com",
  projectId: "uni-test-442a6",
  storageBucket: "uni-test-442a6.appspot.com",
  messagingSenderId: "852268395789",
  appId: "1:852268395789:web:d64048db85f084f5621444"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getFirestore(app)