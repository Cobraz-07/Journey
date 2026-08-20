import { projectStorage, db } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import {
    collection,
    doc,
    setDoc,
    deleteDoc,
    getDocs,
    getDoc,
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
 * Uploads a photo to a trip's gallery, saving the file in Storage and metadata in Firestore.
 */
export async function uploadTripPhoto(
    email: string,
    tripId: string,
    file: File,
    caption = ""
): Promise<TripPhoto> {
    const photoId = `photo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const storagePath = `users/${email}/trips/${tripId}/photos/${photoId}.webp`;
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

    // Save to Firestore under users/{email}/trips/{tripId}/photos/{photoId}
    const photoDocRef = doc(db, "users", email, "trips", tripId, "photos", photoId);
    await setDoc(photoDocRef, photoData);

    return photoData;
}

/**
 * Fetches all photos belonging to a trip ordered by creation date (newest first).
 */
export async function getTripPhotos(email: string, tripId: string): Promise<TripPhoto[]> {
    const photosColRef = collection(db, "users", email, "trips", tripId, "photos");
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
    email: string,
    tripId: string,
    photoId: string,
    storagePath?: string
): Promise<void> {
    // Delete from Firestore
    const photoDocRef = doc(db, "users", email, "trips", tripId, "photos", photoId);
    await deleteDoc(photoDocRef);

    // Delete from Storage if path is provided
    if (storagePath) {
        try {
            const storageRef = ref(projectStorage, storagePath);
            await deleteObject(storageRef);
        } catch (storageError) {
            console.warn("Could not delete file from Storage (might already be deleted):", storageError);
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
 * Deletes a trip and all its photos, journals and files from Firestore and Storage.
 */
export async function deleteEntireTrip(email: string, tripId: string): Promise<void> {
    // 1. Delete all photo documents in Firestore
    try {
        const photosColRef = collection(db, "users", email, "trips", tripId, "photos");
        const photosSnap = await getDocs(photosColRef);
        await Promise.all(photosSnap.docs.map((docSnap) => deleteDoc(docSnap.ref)));
    } catch (err) {
        console.warn("Error deleting trip photos docs:", err);
    }

    // 2. Delete all journal documents in Firestore
    try {
        const journalColRef = collection(db, "users", email, "trips", tripId, "journal");
        const journalSnap = await getDocs(journalColRef);
        await Promise.all(journalSnap.docs.map((docSnap) => deleteDoc(docSnap.ref)));
    } catch (err) {
        console.warn("Error deleting trip journal docs:", err);
    }

    // 3. Delete the trip folder from Firebase Storage
    await deleteStorageFolder(`users/${email}/trips/${tripId}`);

    // 4. Delete the trip document itself in Firestore
    const tripDocRef = doc(db, "users", email, "trips", tripId);
    await deleteDoc(tripDocRef);
}

/**
 * Uploads a trip cover photo, deletes any previous cover from Storage, and updates the trip's document in Firestore.
 */
export async function uploadTripCover(
    email: string,
    tripId: string,
    file: File
): Promise<string> {
    const tripDocRef = doc(db, "users", email, "trips", tripId);

    // Retrieve old coverStoragePath if it exists to delete it from Storage
    let oldCoverStoragePath: string | undefined;
    try {
        const tripSnap = await getDoc(tripDocRef);
        if (tripSnap.exists()) {
            oldCoverStoragePath = tripSnap.data()?.coverStoragePath;
        }
    } catch (e) {
        console.warn("Could not check existing trip cover:", e);
    }

    const storagePath = `users/${email}/trips/${tripId}/cover_${Date.now()}.webp`;
    const storageRef = ref(projectStorage, storagePath);

    const snapshot = await uploadBytes(storageRef, file, {
        contentType: "image/webp",
    });
    const coverUrl = await getDownloadURL(snapshot.ref);

    await setDoc(
        tripDocRef,
        {
            coverUrl,
            coverStoragePath: storagePath,
        },
        { merge: true }
    );

    // Delete previous cover from Storage if there was one
    if (oldCoverStoragePath && oldCoverStoragePath !== storagePath) {
        try {
            const oldStorageRef = ref(projectStorage, oldCoverStoragePath);
            await deleteObject(oldStorageRef);
        } catch (delErr) {
            console.warn("Could not delete old cover from Storage:", delErr);
        }
    }

    return coverUrl;
}

/**
 * Uploads an image attached to a journal entry.
 */
export async function uploadJournalImage(
    email: string,
    tripId: string,
    journalId: string,
    file: File
): Promise<string> {
    const storagePath = `users/${email}/trips/${tripId}/journals/${journalId}_${Date.now()}.webp`;
    const storageRef = ref(projectStorage, storagePath);

    const snapshot = await uploadBytes(storageRef, file, {
        contentType: "image/webp",
    });
    return await getDownloadURL(snapshot.ref);
}
