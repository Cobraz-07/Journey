import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let _app;
let _auth;
let _db;
function getApp() {
  if (!_app) {
    const activeApps = getApps();
    _app = activeApps.length === 0 ? initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
      })
    }) : activeApps[0];
  }
  return _app;
}
function getAdminAuth() {
  if (!_auth) {
    _auth = getAuth(getApp());
  }
  return _auth;
}
function getAdminDb() {
  if (!_db) {
    _db = getFirestore(getApp());
  }
  return _db;
}

export { getAdminDb as a, getAdminAuth as g };
