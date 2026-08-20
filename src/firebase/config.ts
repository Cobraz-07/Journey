import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase client config strictly from environment variables with safe defaults for test/SSR
const firebaseConfig = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY || "AIzaSyFakeKeyForTestingAndSSR00000",
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || "journey-test.firebaseapp.com",
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || "journey-test",
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || "journey-test.appspot.com",
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
    measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const projectAuth = getAuth(app);
export const db = getFirestore(app);
export const projectStorage = getStorage(app);

if (typeof window !== "undefined") {
    setPersistence(projectAuth, browserLocalPersistence).catch((error) => {
        console.error("Error setting persistence mode:", error);
    });
}
