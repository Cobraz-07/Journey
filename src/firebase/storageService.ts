import { projectStorage, db } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import {
    collection,
    doc,
    setDoc,
    deleteDoc,
    getDocs,
    writeBatch,
} from "firebase/firestore";

export interface TripPhoto {
    id: string;
    url: string;
    storagePath: string;
    caption?: string;
    createdAt: string;
    size?: number;
}

/**
 * Extracts the storage path from a standard Firebase Storage download URL.
 */
export function getStoragePathFromUrl(url?: string | null): string | undefined {
    if (!url) return undefined;
    try {
        const matches = url.match(/\/o\/(.+?)\?/);
        if (matches && matches[1]) {
            return decodeURIComponent(matches[1]);
        }
    } catch {
        // Fallback or invalid URL
    }
    return undefined;
}

/**
 * Uploads a photo to a trip's gallery, saving the file in Storage and metadata in Firestore.
 */
export async function uploadTripPhoto(
    uid: string,
    tripId: string,
    file: File,
    caption = ""
): Promise<TripPhoto> {
    const photoId = `photo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const storagePath = `users/${uid}/trips/${tripId}/photos/${photoId}.webp`;
    const storageRef = ref(projectStorage, storagePath);

    // Upload file
    const snapshot = await uploadBytes(storageRef, file, {
        contentType: "image/webp",
    });
    const url = await getDownloadURL(snapshot.ref);

    const photoData: TripPhoto = {
        id: photoId,
        url,
        storagePath,
        caption: caption.trim(),
        createdAt: new Date().toISOString(),
        size: file.size,
    };

    // Save to Firestore under users/{uid}/trips/{tripId}/photos/{photoId}
    const photoDocRef = doc(db, "users", uid, "trips", tripId, "photos", photoId);
    await setDoc(photoDocRef, photoData);

    return photoData;
}

/**
 * Fetches all photos belonging to a trip ordered by creation date (newest first).
 */
export async function getTripPhotos(uid: string, tripId: string): Promise<TripPhoto[]> {
    const photosColRef = collection(db, "users", uid, "trips", tripId, "photos");
    const snapshot = await getDocs(photosColRef);

    const photos = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<TripPhoto, "id">),
    }));

    // Sort in memory to avoid Firestore requiring index
    photos.sort((a, b) => {
        const dateA = a.createdAt || "";
        const dateB = b.createdAt || "";
        return dateB.localeCompare(dateA);
    });

    return photos;
}

/**
 * Deletes a photo from both Firebase Storage and Firestore.
 */
export async function deleteTripPhoto(
    uid: string,
    tripId: string,
    photoId: string,
    storagePath?: string,
    photoUrl?: string
): Promise<void> {
    // Delete from Firestore
    const photoDocRef = doc(db, "users", uid, "trips", tripId, "photos", photoId);
    await deleteDoc(photoDocRef);

    const targetPath = storagePath || getStoragePathFromUrl(photoUrl);

    // Delete from Storage if path is resolved
    if (targetPath) {
        try {
            const storageRef = ref(projectStorage, targetPath);
            await deleteObject(storageRef);
        } catch (storageError) {
            console.warn("Could not delete file from Storage (might already be deleted):", storageError);
        }
    }
}

/**
 * Deletes a journal entry and its attached image from Storage if present.
 */
export async function deleteJournalEntry(
    uid: string,
    tripId: string,
    journalId: string,
    storagePath?: string,
    imageUrl?: string
): Promise<void> {
    const journalDocRef = doc(db, "users", uid, "trips", tripId, "journal", journalId);
    await deleteDoc(journalDocRef);

    const targetPath = storagePath || getStoragePathFromUrl(imageUrl);

    if (targetPath) {
        try {
            const storageRef = ref(projectStorage, targetPath);
            await deleteObject(storageRef);
        } catch (storageError) {
            console.warn("Could not delete journal image from Storage:", storageError);
        }
    }
}

/**
 * Recursively deletes all files in a Firebase Storage directory.
 */
export async function deleteStorageFolder(folderPath: string): Promise<void> {
    try {
        const folderRef = ref(projectStorage, folderPath);
        const res = await listAll(folderRef);

        // Delete all files in current folder
        const deletePromises = res.items.map((itemRef) => deleteObject(itemRef));
        await Promise.all(deletePromises);

        // Recursively delete subfolders
        const subfolderPromises = res.prefixes.map((prefixRef) =>
            deleteStorageFolder(prefixRef.fullPath)
        );
        await Promise.all(subfolderPromises);
    } catch (err) {
        console.warn(`Could not delete storage folder ${folderPath}:`, err);
    }
}

/**
 * Deletes a trip and all its photos, journals and files from Firestore and Storage using atomic batch writes.
 */
export async function deleteEntireTrip(uid: string, tripId: string): Promise<void> {
    const batch = writeBatch(db);

    // 1. Queue all photo documents in Firestore for batch deletion
    try {
        const photosColRef = collection(db, "users", uid, "trips", tripId, "photos");
        const photosSnap = await getDocs(photosColRef);
        photosSnap.docs.forEach((docSnap) => batch.delete(docSnap.ref));
    } catch (err) {
        console.warn("Error queuing trip photos docs for batch delete:", err);
    }

    // 2. Queue all journal documents in Firestore for batch deletion
    try {
        const journalColRef = collection(db, "users", uid, "trips", tripId, "journal");
        const journalSnap = await getDocs(journalColRef);
        journalSnap.docs.forEach((docSnap) => batch.delete(docSnap.ref));
    } catch (err) {
        console.warn("Error queuing trip journal docs for batch delete:", err);
    }

    // 3. Queue the trip document itself in Firestore
    const tripDocRef = doc(db, "users", uid, "trips", tripId);
    batch.delete(tripDocRef);

    // 4. Commit all Firestore document deletions atomically in a single request
    await batch.commit();

    // 5. Delete the trip folder from Firebase Storage (covers photos, covers, journal images)
    await deleteStorageFolder(`users/${uid}/trips/${tripId}`);
}

/**
 * Uploads a trip cover photo to Storage and deletes any previous cover file.
 * Returns download URL and storagePath for the caller to save into Firestore.
 */
export async function uploadTripCover(
    uid: string,
    tripId: string,
    file: File,
    oldCoverStoragePath?: string
): Promise<{ url: string; storagePath: string }> {
    const storagePath = `users/${uid}/trips/${tripId}/cover_${Date.now()}.webp`;
    const storageRef = ref(projectStorage, storagePath);

    const snapshot = await uploadBytes(storageRef, file, {
        contentType: "image/webp",
    });
    const url = await getDownloadURL(snapshot.ref);

    // Delete previous cover from Storage if there was one
    if (oldCoverStoragePath && oldCoverStoragePath !== storagePath) {
        try {
            const oldStorageRef = ref(projectStorage, oldCoverStoragePath);
            await deleteObject(oldStorageRef);
        } catch (delErr) {
            console.warn("Could not delete old cover from Storage:", delErr);
        }
    }

    return { url, storagePath };
}

/**
 * Uploads an image attached to a journal entry.
 * Returns both the download URL and the storage path for future cleanup.
 */
export async function uploadJournalImage(
    uid: string,
    tripId: string,
    journalId: string,
    file: File
): Promise<{ url: string; storagePath: string }> {
    const storagePath = `users/${uid}/trips/${tripId}/journals/${journalId}_${Date.now()}.webp`;
    const storageRef = ref(projectStorage, storagePath);

    const snapshot = await uploadBytes(storageRef, file, {
        contentType: "image/webp",
    });
    const url = await getDownloadURL(snapshot.ref);
    return { url, storagePath };
}

