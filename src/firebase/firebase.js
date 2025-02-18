import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHIz_EqJyM20dwWtJDwNMPHU9TPQEpCzg",
  authDomain: "enipp-d0fd9.firebaseapp.com",
  projectId: "enipp-d0fd9",
  storageBucket: "enipp-d0fd9.firebasestorage.app",
  messagingSenderId: "256362722040",
  appId: "1:256362722040:web:f496c97b87c376e78e010d",
  measurementId: "G-YF4B0WJLKB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)