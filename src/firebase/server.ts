import type { App } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";

let _app: App | undefined;
let _auth: Auth | undefined;
let _db: Firestore | undefined;

async function getApp(): Promise<App> {
    if (!_app) {
        // Dynamically import to prevent Vercel top-level module resolution issues
        const { initializeApp, cert, getApps } = await import("firebase-admin/app");
        const activeApps = getApps();

        if (activeApps.length === 0) {
            try {
                let privateKey = process.env.FIREBASE_PRIVATE_KEY;
                if (privateKey) {
                    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
                        privateKey = privateKey.slice(1, -1);
                    }
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

export async function getAdminAuth(): Promise<Auth> {
    if (!_auth) {
        const { getAuth } = await import("firebase-admin/auth");
        _auth = getAuth(await getApp());
    }
    return _auth;
}

export async function getAdminDb(): Promise<Firestore> {
    if (!_db) {
        const { getFirestore } = await import("firebase-admin/firestore");
        _db = getFirestore(await getApp());
    }
    return _db;
}
