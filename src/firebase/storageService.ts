import { projectStorage, db } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import {
    collection,
    doc,
    setDoc,
    deleteDoc,
    getDocs,
    updateDoc,
    query,
    orderBy,
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
    const q = query(photosColRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<TripPhoto, "id">),
    }));
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
 * Uploads a trip cover photo and updates the trip's document in Firestore.
 */
export async function uploadTripCover(
    email: string,
    tripId: string,
    file: File
): Promise<string> {
    const storagePath = `users/${email}/trips/${tripId}/cover_${Date.now()}.webp`;
    const storageRef = ref(projectStorage, storagePath);

    const snapshot = await uploadBytes(storageRef, file, {
        contentType: "image/webp",
    });
    const coverUrl = await getDownloadURL(snapshot.ref);

    const tripDocRef = doc(db, "users", email, "trips", tripId);
    await updateDoc(tripDocRef, {
        coverUrl,
        coverStoragePath: storagePath,
    });

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
