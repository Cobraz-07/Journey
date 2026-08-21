import { describe, it, expect } from "vitest";
import { generateShareToken, isValidShareToken } from "../src/utils/shareToken";

describe("Share Token Utility", () => {
    it("should generate a URL-safe token of appropriate length", () => {
        const token = generateShareToken();
        expect(typeof token).toBe("string");
        expect(token.length).toBeGreaterThanOrEqual(16);
        expect(isValidShareToken(token)).toBe(true);
    });

    it("should generate unique tokens on multiple calls", () => {
        const token1 = generateShareToken();
        const token2 = generateShareToken();
        const token3 = generateShareToken();

        expect(token1).not.toBe(token2);
        expect(token2).not.toBe(token3);
        expect(token1).not.toBe(token3);
    });

    it("should validate well-formed tokens and reject invalid ones", () => {
        expect(isValidShareToken("abcdef1234567890")).toBe(true);
        expect(isValidShareToken("aB-_1234567890xyz")).toBe(true);

        expect(isValidShareToken("")).toBe(false);
        expect(isValidShareToken("short")).toBe(false);
        expect(isValidShareToken(null)).toBe(false);
        expect(isValidShareToken(undefined)).toBe(false);
        expect(isValidShareToken(123456789)).toBe(false);
        expect(isValidShareToken("invalid token with spaces!")).toBe(false);
        expect(isValidShareToken("invalid<script>alert(1)</script>")).toBe(false);
    });
});
