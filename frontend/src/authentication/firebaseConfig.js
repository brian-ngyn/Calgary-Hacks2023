// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk2EiVsZaktoheg_lNBVpWTMLYYY7APOQ",
  authDomain: "calgary-hacks2023.firebaseapp.com",
  projectId: "calgary-hacks2023",
  storageBucket: "calgary-hacks2023.appspot.com",
  messagingSenderId: "768329700428",
  appId: "1:768329700428:web:e183a50f9f52d07ef350e9",
  measurementId: "G-K6N9F1KQWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const firebaseAuth = getAuth(app);
export { app, db, firebaseAuth };
