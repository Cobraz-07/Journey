import { randomBytes } from "node:crypto";

/**
 * Generates a cryptographically secure, URL-safe random token for public trip sharing.
 * Defaults to 24 characters (12 random bytes encoded in hex/base64url).
 */
export function generateShareToken(byteLength: number = 12): string {
    return randomBytes(byteLength).toString("base64url");
}

/**
 * Validates whether a given share token is well-formed.
 */
export function isValidShareToken(token: unknown): boolean {
    if (typeof token !== "string") return false;
    const trimmed = token.trim();
    // Base64url or hex alphanumeric with dashes/underscores, 8 to 64 chars
    return /^[A-Za-z0-9_-]{8,64}$/.test(trimmed);
}
