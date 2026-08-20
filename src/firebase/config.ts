import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase client config (supports env variables with default project fallbacks for build resilience)
const firebaseConfig = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY || "AIzaSyBAGeTp4WQFP1mcDreHThX7w6G-YgF8pVE",
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || "journey-4d59b.firebaseapp.com",
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || "journey-4d59b",
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || "journey-4d59b.firebasestorage.app",
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "487803690897",
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || "1:487803690897:web:38d25e97e435449fb6c430",
    measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID || "G-3LE9HW063X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const projectAuth = getAuth(app);
export const db = getFirestore(app);
export const projectStorage = getStorage(app);

setPersistence(projectAuth, browserLocalPersistence).catch((error) => {
    console.error("Error setting persistence mode:", error);
});
