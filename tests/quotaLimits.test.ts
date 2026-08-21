import { describe, it, expect } from "vitest";
import {
    MAX_PHOTOS_PER_TRIP,
    MAX_TRIPS_PER_USER,
    MAX_JOURNALS_PER_TRIP,
    MAX_BATCH_UPLOAD_SIZE,
} from "../src/firebase/storageService";

describe("Quota limits and cost guardrails", () => {
    it("should enforce reasonable quota limits per business rules", () => {
        expect(MAX_PHOTOS_PER_TRIP).toBe(50);
        expect(MAX_TRIPS_PER_USER).toBe(30);
        expect(MAX_JOURNALS_PER_TRIP).toBe(100);
        expect(MAX_BATCH_UPLOAD_SIZE).toBe(20);
    });

    describe("Batch slot calculation helper logic", () => {
        function calculateAllowedBatchUpload(
            currentCount: number,
            selectedCount: number,
            maxPhotos = MAX_PHOTOS_PER_TRIP,
            maxBatch = MAX_BATCH_UPLOAD_SIZE
        ): { allowedCount: number; isFull: boolean; capped: boolean } {
            const remaining = maxPhotos - currentCount;
            if (remaining <= 0) {
                return { allowedCount: 0, isFull: true, capped: false };
            }
            const allowed = Math.min(selectedCount, remaining, maxBatch);
            return {
                allowedCount: allowed,
                isFull: false,
                capped: allowed < selectedCount,
            };
        }

        it("should allow full batch when plenty of slots remain", () => {
            const result = calculateAllowedBatchUpload(10, 15);
            expect(result.allowedCount).toBe(15);
            expect(result.isFull).toBe(false);
            expect(result.capped).toBe(false);
        });

        it("should cap batch to remaining slots if exceeding 50 photos", () => {
            const result = calculateAllowedBatchUpload(45, 10);
            expect(result.allowedCount).toBe(5);
            expect(result.isFull).toBe(false);
            expect(result.capped).toBe(true);
        });

        it("should cap batch to MAX_BATCH_UPLOAD_SIZE (20) if user selects 30 photos", () => {
            const result = calculateAllowedBatchUpload(0, 30);
            expect(result.allowedCount).toBe(20);
            expect(result.isFull).toBe(false);
            expect(result.capped).toBe(true);
        });

        it("should reject when trip is already at capacity", () => {
            const result = calculateAllowedBatchUpload(50, 5);
            expect(result.allowedCount).toBe(0);
            expect(result.isFull).toBe(true);
        });
    });
});
