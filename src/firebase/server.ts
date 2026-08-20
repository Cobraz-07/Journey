import { initializeApp, cert, getApps, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let _app: App | undefined;
let _auth: Auth | undefined;
let _db: Firestore | undefined;

function getApp(): App {
    if (!_app) {
        const activeApps = getApps();
        _app =
            activeApps.length === 0
                ? initializeApp({
                      credential: cert({
                          projectId: process.env.FIREBASE_PROJECT_ID,
                          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
                      }),
                  })
                : activeApps[0];
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
