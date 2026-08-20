/**
 * Escapes HTML special characters to prevent XSS when interpolating
 * user-controlled data into innerHTML template literals.
 */
export function escapeHtml(str: string | undefined | null): string {
    if (!str) return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
