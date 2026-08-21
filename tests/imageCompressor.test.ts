import { describe, it, expect } from "vitest";
import {
    validateImageFile,
    formatFileSize,
    calculateAspectRatioFit,
} from "../src/utils/imageCompressor";

describe("imageCompressor utilities", () => {
    describe("formatFileSize", () => {
        it("should format bytes correctly", () => {
            expect(formatFileSize(500)).toBe("500 B");
            expect(formatFileSize(1024)).toBe("1.0 KB");
            expect(formatFileSize(50 * 1024)).toBe("50.0 KB");
            expect(formatFileSize(1.5 * 1024 * 1024)).toBe("1.50 MB");
        });
    });

    describe("validateImageFile", () => {
        it("should reject non-image files", () => {
            const fakeFile = new File(["dummy"], "test.pdf", { type: "application/pdf" });
            const result = validateImageFile(fakeFile);
            expect(result.valid).toBe(false);
            expect(result.error).toContain("not a valid image");
        });

        it("should accept valid image files within size limits", () => {
            const validFile = new File(["dummy"], "photo.jpg", { type: "image/jpeg" });
            const result = validateImageFile(validFile, 15);
            expect(result.valid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it("should reject image files exceeding max size", () => {
            // Mock file with size > 1MB
            const largeFile = {
                name: "large.png",
                type: "image/png",
                size: 2 * 1024 * 1024,
            } as File;
            const result = validateImageFile(largeFile, 1);
            expect(result.valid).toBe(false);
            expect(result.error).toContain("exceeds the allowed limit");
        });
    });

    describe("calculateAspectRatioFit", () => {
        it("should return identical dimensions if image is already smaller than max bounds", () => {
            const result = calculateAspectRatioFit(800, 600, 1920, 1920);
            expect(result).toEqual({ width: 800, height: 600 });
        });

        it("should constrain landscape image to maxWidth preserving aspect ratio", () => {
            const result = calculateAspectRatioFit(4000, 2000, 1920, 1920);
            expect(result.width).toBe(1920);
            expect(result.height).toBe(960);
        });

        it("should constrain portrait image to maxHeight preserving aspect ratio", () => {
            const result = calculateAspectRatioFit(2000, 4000, 1920, 1920);
            expect(result.width).toBe(960);
            expect(result.height).toBe(1920);
        });

        it("should constrain square image equally", () => {
            const result = calculateAspectRatioFit(3000, 3000, 360, 360);
            expect(result).toEqual({ width: 360, height: 360 });
        });
    });
});
