/**
 * Formats a date string from yyyy-mm-dd to dd-mm-yyyy.
 * Shared utility to avoid duplication across components.
 */
export function formatDate(dateString: string | undefined): string {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
}
