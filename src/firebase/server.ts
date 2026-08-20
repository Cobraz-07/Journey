import { initializeApp, cert, getApps, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let _app: App | undefined;
let _auth: Auth | undefined;
let _db: Firestore | undefined;

function getApp(): App {
    if (!_app) {
        const activeApps = getApps();
        if (activeApps.length === 0) {
            try {
                let privateKey = process.env.FIREBASE_PRIVATE_KEY;
                if (privateKey) {
                    // Remove surrounding quotes if they exist (Vercel sometimes passes them)
                    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
                        privateKey = privateKey.slice(1, -1);
                    }
                    // Replace literal escaped newlines with actual newlines
                    privateKey = privateKey.replace(/\\n/g, "\n");
                }

                _app = initializeApp({
                    credential: cert({
                        projectId: process.env.FIREBASE_PROJECT_ID,
                        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                        privateKey: privateKey,
                    }),
                });
            } catch (error) {
                console.error("Firebase Admin Initialization Error:", error);
                throw error;
            }
        } else {
            _app = activeApps[0];
        }
    }
    return _app;
}

export function getAdminAuth(): Auth {
    if (!_auth) {
        _auth = getAuth(getApp());
    }
    return _auth;
}

export function getAdminDb(): Firestore {
    if (!_db) {
        _db = getFirestore(getApp());
    }
    return _db;
}
