import { describe, it, expect } from "vitest";
import { getStoragePathFromUrl } from "../src/firebase/storageService";

describe("getStoragePathFromUrl", () => {
    it("should return undefined for falsy URLs", () => {
        expect(getStoragePathFromUrl(undefined)).toBeUndefined();
        expect(getStoragePathFromUrl(null)).toBeUndefined();
        expect(getStoragePathFromUrl("")).toBeUndefined();
    });

    it("should extract and decode storage path from Firebase download URL", () => {
        const firebaseUrl =
            "https://firebasestorage.googleapis.com/v0/b/my-app.appspot.com/o/users%2Fuser_123%2Ftrips%2Ftrip_456%2Fphotos%2Fphoto_789.webp?alt=media&token=abc-123";
        const result = getStoragePathFromUrl(firebaseUrl);
        expect(result).toBe("users/user_123/trips/trip_456/photos/photo_789.webp");
    });

    it("should extract cover photo path from Firebase download URL", () => {
        const firebaseUrl =
            "https://firebasestorage.googleapis.com/v0/b/my-app.appspot.com/o/users%2Fuid_abc%2Ftrips%2Ftrip_xyz%2Fcover_123456789.webp?alt=media&token=xyz";
        const result = getStoragePathFromUrl(firebaseUrl);
        expect(result).toBe("users/uid_abc/trips/trip_xyz/cover_123456789.webp");
    });
});
