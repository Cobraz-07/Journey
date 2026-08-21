import { projectStorage, db } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import {
    collection,
    doc,
    setDoc,
    getDoc,
    deleteDoc,
    getDocs,
    writeBatch,
    query,
    orderBy,
    limit,
    startAfter,
    getCountFromServer,
    type QueryDocumentSnapshot,
    type DocumentData,
} from "firebase/firestore";

export interface TripPhoto {
    id: string;
    url: string;
    storagePath: string;
    thumbnailUrl?: string;
    thumbnailStoragePath?: string;
    blurDataUrl?: string;
    caption?: string;
    createdAt: string;
    size?: number;
    thumbnailSize?: number;
    width?: number;
    height?: number;
}

export interface PaginatedTripPhotosResult {
    photos: TripPhoto[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
    hasMore: boolean;
    totalCount: number;
}

export const PHOTOS_PAGE_SIZE = 12;

export interface ResponsiveUploadPayload {
    displayFile: File;
    thumbnailFile?: File;
    blurDataUrl?: string;
    displayWidth?: number;
    displayHeight?: number;
}

export const MAX_PHOTOS_PER_TRIP = 50;
export const MAX_TRIPS_PER_USER = 30;
export const MAX_JOURNALS_PER_TRIP = 100;
export const MAX_BATCH_UPLOAD_SIZE = 20;

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
 * Gets the current count of photos in a trip.
 */
export async function getTripPhotoCount(uid: string, tripId: string): Promise<number> {
    const photosColRef = collection(db, "users", uid, "trips", tripId, "photos");
    const snapshot = await getCountFromServer(photosColRef);
    return snapshot.data().count;
}

/**
 * Uploads a photo to a trip's gallery with responsive display and thumbnail assets.
 */
export async function uploadTripPhoto(
    uid: string,
    tripId: string,
    fileOrPayload: File | ResponsiveUploadPayload,
    caption = "",
    skipCountCheck = false
): Promise<TripPhoto> {
    if (!skipCountCheck) {
        const currentCount = await getTripPhotoCount(uid, tripId);
        if (currentCount >= MAX_PHOTOS_PER_TRIP) {
            throw new Error(`Has alcanzado el límite máximo de ${MAX_PHOTOS_PER_TRIP} fotos para este viaje.`);
        }
    }

    const photoId = `photo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const isPayload = "displayFile" in fileOrPayload;
    const displayFile = isPayload ? fileOrPayload.displayFile : fileOrPayload;
    const thumbnailFile = isPayload ? fileOrPayload.thumbnailFile : undefined;
    const blurDataUrl = isPayload ? fileOrPayload.blurDataUrl : undefined;
    const width = isPayload ? fileOrPayload.displayWidth : undefined;
    const height = isPayload ? fileOrPayload.displayHeight : undefined;

    const storagePath = `users/${uid}/trips/${tripId}/photos/${photoId}_display.webp`;
    const storageRef = ref(projectStorage, storagePath);

    // Upload display image
    const uploadDisplayPromise = uploadBytes(storageRef, displayFile, {
        contentType: "image/webp",
    }).then((snap) => getDownloadURL(snap.ref));

    // Upload thumbnail image if provided
    let thumbStoragePath: string | undefined;
    let uploadThumbPromise: Promise<string | undefined> = Promise.resolve(undefined);
    if (thumbnailFile) {
        thumbStoragePath = `users/${uid}/trips/${tripId}/photos/${photoId}_thumb.webp`;
        const thumbRef = ref(projectStorage, thumbStoragePath);
        uploadThumbPromise = uploadBytes(thumbRef, thumbnailFile, {
            contentType: "image/webp",
        }).then((snap) => getDownloadURL(snap.ref));
    }

    const [url, thumbnailUrl] = await Promise.all([uploadDisplayPromise, uploadThumbPromise]);

    const photoData: TripPhoto = {
        id: photoId,
        url,
        storagePath,
        ...(thumbnailUrl && thumbStoragePath ? { thumbnailUrl, thumbnailStoragePath: thumbStoragePath } : {}),
        ...(blurDataUrl ? { blurDataUrl } : {}),
        caption: caption.trim(),
        createdAt: new Date().toISOString(),
        size: displayFile.size,
        ...(thumbnailFile ? { thumbnailSize: thumbnailFile.size } : {}),
        ...(width && height ? { width, height } : {}),
    };

    // Save to Firestore under users/{uid}/trips/{tripId}/photos/{photoId}
    const photoDocRef = doc(db, "users", uid, "trips", tripId, "photos", photoId);
    await setDoc(photoDocRef, photoData);

    return photoData;
}

/**
 * Retrieves all photos of a trip sorted by createdAt descending.
 */
export async function getTripPhotos(uid: string, tripId: string): Promise<TripPhoto[]> {
    const photosColRef = collection(db, "users", uid, "trips", tripId, "photos");
    const q = query(photosColRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<TripPhoto, "id">),
    }));
}

/**
 * Retrieves a page of photos using cursor-based pagination (startAfter).
 */
export async function getTripPhotosPaginated(
    uid: string,
    tripId: string,
    pageSize = PHOTOS_PAGE_SIZE,
    startAfterDoc: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<PaginatedTripPhotosResult> {
    const photosColRef = collection(db, "users", uid, "trips", tripId, "photos");
    const totalCount = await getTripPhotoCount(uid, tripId);

    const q = startAfterDoc
        ? query(photosColRef, orderBy("createdAt", "desc"), startAfter(startAfterDoc), limit(pageSize))
        : query(photosColRef, orderBy("createdAt", "desc"), limit(pageSize));

    const snapshot = await getDocs(q);
    const photos = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<TripPhoto, "id">),
    }));

    const lastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;
    const hasMore = snapshot.docs.length === pageSize;

    return {
        photos,
        lastDoc,
        hasMore,
        totalCount,
    };
}

/**
 * Deletes a photo from both Firebase Storage (display + thumb) and Firestore.
 */
export async function deleteTripPhoto(
    uid: string,
    tripId: string,
    photoId: string,
    storagePath?: string,
    photoUrl?: string,
    thumbnailStoragePath?: string,
    thumbnailUrl?: string
): Promise<void> {
    // Delete from Firestore
    const photoDocRef = doc(db, "users", uid, "trips", tripId, "photos", photoId);
    await deleteDoc(photoDocRef);

    const targetPath = storagePath || getStoragePathFromUrl(photoUrl);
    const targetThumbPath = thumbnailStoragePath || getStoragePathFromUrl(thumbnailUrl);

    // Delete both files in parallel from Storage
    const deletePromises: Promise<any>[] = [];
    if (targetPath) {
        const storageRef = ref(projectStorage, targetPath);
        deletePromises.push(
            deleteObject(storageRef).catch((err) => {
                console.warn("Could not delete display file from Storage:", err);
            })
        );
    }
    if (targetThumbPath) {
        const thumbRef = ref(projectStorage, targetThumbPath);
        deletePromises.push(
            deleteObject(thumbRef).catch((err) => {
                console.warn("Could not delete thumbnail file from Storage:", err);
            })
        );
    }

    await Promise.all(deletePromises);
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
 * Deletes a trip and all its photos, journals and files from Firestore and Storage.
 * Uses the API endpoint to securely delete Firestore documents (including public index)
 * and then deletes Storage files from the client.
 */
export async function deleteEntireTrip(uid: string, tripId: string): Promise<void> {
    // 1. Call API endpoint to delete Firestore documents securely
    const response = await fetch(`/api/trips/${tripId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete trip data from database.");
    }

    // 2. Delete the trip folder from Firebase Storage (covers photos, covers, journal images)
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

