import { describe, it, expect } from "vitest";
import { formatDate } from "../src/utils/formatDate";

describe("formatDate utility", () => {
    it("should return empty string when dateString is undefined or empty", () => {
        expect(formatDate(undefined)).toBe("");
        expect(formatDate("")).toBe("");
    });

    it("should convert YYYY-MM-DD to DD-MM-YYYY", () => {
        expect(formatDate("2026-08-21")).toBe("21-08-2026");
        expect(formatDate("2025-12-31")).toBe("31-12-2025");
        expect(formatDate("2024-01-01")).toBe("01-01-2024");
    });

    it("should return raw string if format does not have 3 hyphen-separated parts", () => {
        expect(formatDate("invalid-date")).toBe("invalid-date");
        expect(formatDate("2026/08/21")).toBe("2026/08/21");
    });
});
