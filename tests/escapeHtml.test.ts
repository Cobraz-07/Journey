import { describe, it, expect } from "vitest";
import { escapeHtml } from "../src/utils/escapeHtml";

describe("escapeHtml utility", () => {
    it("should return empty string for undefined or null", () => {
        expect(escapeHtml(undefined)).toBe("");
        expect(escapeHtml(null)).toBe("");
        expect(escapeHtml("")).toBe("");
    });

    it("should escape special characters to prevent XSS", () => {
        const raw = `<script>alert("XSS & attack 'now'")</script>`;
        const sanitized = escapeHtml(raw);
        expect(sanitized).toBe(
            "&lt;script&gt;alert(&quot;XSS &amp; attack &#039;now&#039;&quot;)&lt;/script&gt;"
        );
        expect(sanitized).not.toContain("<");
        expect(sanitized).not.toContain(">");
        expect(sanitized).not.toContain('"');
    });

    it("should leave safe strings unchanged", () => {
        expect(escapeHtml("Viaje a Japon 2026")).toBe("Viaje a Japon 2026");
    });
});
