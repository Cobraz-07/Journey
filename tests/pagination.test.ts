import { describe, it, expect } from "vitest";
import { PHOTOS_PAGE_SIZE } from "../src/firebase/storageService";

describe("Pagination logic and constants", () => {
    it("should have a default page size of 12 for photos grid", () => {
        expect(PHOTOS_PAGE_SIZE).toBe(12);
    });

    describe("Paginated slicing and cursor simulation", () => {
        interface Item {
            id: string;
            createdAt: string;
        }

        const mockItems: Item[] = Array.from({ length: 30 }, (_, i) => ({
            id: `item_${i + 1}`,
            createdAt: new Date(2026, 0, 30 - i).toISOString(),
        }));

        function paginateItems(items: Item[], pageSize: number, startIndex = 0) {
            const page = items.slice(startIndex, startIndex + pageSize);
            const nextIndex = startIndex + page.length;
            const hasMore = nextIndex < items.length;
            return { page, nextIndex, hasMore };
        }

        it("should return the first page with hasMore = true", () => {
            const result = paginateItems(mockItems, 12, 0);
            expect(result.page.length).toBe(12);
            expect(result.page[0].id).toBe("item_1");
            expect(result.page[11].id).toBe("item_12");
            expect(result.hasMore).toBe(true);
            expect(result.nextIndex).toBe(12);
        });

        it("should return the second page with hasMore = true", () => {
            const result = paginateItems(mockItems, 12, 12);
            expect(result.page.length).toBe(12);
            expect(result.page[0].id).toBe("item_13");
            expect(result.page[11].id).toBe("item_24");
            expect(result.hasMore).toBe(true);
            expect(result.nextIndex).toBe(24);
        });

        it("should return the third and last page with hasMore = false", () => {
            const result = paginateItems(mockItems, 12, 24);
            expect(result.page.length).toBe(6);
            expect(result.page[0].id).toBe("item_25");
            expect(result.page[5].id).toBe("item_30");
            expect(result.hasMore).toBe(false);
            expect(result.nextIndex).toBe(30);
        });
    });
});
