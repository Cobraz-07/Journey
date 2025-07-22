// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAGeTp4WQFP1mcDreHThX7w6G-YgF8pVE",
  authDomain: "journey-4d59b.firebaseapp.com",
  projectId: "journey-4d59b",
  storageBucket: "journey-4d59b.firebasestorage.app",
  messagingSenderId: "487803690897",
  appId: "1:487803690897:web:38d25e97e435449fb6c430",
  measurementId: "G-3LE9HW063X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const projectAuth = getAuth(app);
export const db = getFirestore(app);