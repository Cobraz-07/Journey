import { describe, it, expect } from "vitest";

describe("View Transitions helpers and naming patterns", () => {
    function generateTripTransitionName(prefix: string, tripId: string): string {
        const sanitized = tripId.replace(/[^a-zA-Z0-9_-]/g, "_");
        return `${prefix}-${sanitized}`;
    }

    it("should generate valid CSS identifier transition names for trips", () => {
        expect(generateTripTransitionName("trip-cover", "trip_123")).toBe("trip-cover-trip_123");
        expect(generateTripTransitionName("trip-title", "trip-abc-456")).toBe("trip-title-trip-abc-456");
    });

    it("should sanitize special characters from transition names", () => {
        expect(generateTripTransitionName("trip-cover", "trip#1/special!")).toBe("trip-cover-trip_1_special_");
    });

    describe("Reduced motion accessibility helper", () => {
        function shouldEnableMotion(prefersReducedMotion: boolean): boolean {
            return !prefersReducedMotion;
        }

        it("should allow animations when user has not requested reduced motion", () => {
            expect(shouldEnableMotion(false)).toBe(true);
        });

        it("should disable animations when user has requested reduced motion", () => {
            expect(shouldEnableMotion(true)).toBe(false);
        });
    });
});
