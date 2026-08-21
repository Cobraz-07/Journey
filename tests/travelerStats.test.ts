import { describe, it, expect } from "vitest";
import { aggregateVisitedCountries, calculateWorldExploredPercentage } from "../src/utils/travelerStats";

describe("Traveler Stats & Visited Countries Utility", () => {
    it("should return an empty list when trips array is empty", () => {
        const result = aggregateVisitedCountries([]);
        expect(result).toEqual([]);
    });

    it("should aggregate multiple trips to the same country correctly", () => {
        const trips = [
            { id: "1", title: "Trip to Tokyo", country: "Japan", countryCode: "jp" },
            { id: "2", title: "Trip to Kyoto", country: "Japan", countryCode: "JP" },
            { id: "3", title: "Trip to Paris", country: "France", countryCode: "fr" },
        ];

        const stats = aggregateVisitedCountries(trips);
        expect(stats.length).toBe(2);

        const japan = stats.find((s) => s.code === "jp");
        expect(japan).toBeDefined();
        expect(japan?.tripCount).toBe(2);
        expect(japan?.name).toBe("Japan");

        const france = stats.find((s) => s.code === "fr");
        expect(france).toBeDefined();
        expect(france?.tripCount).toBe(1);
    });

    it("should ignore trips without a valid countryCode", () => {
        const trips = [
            { id: "1", title: "Mystery Trip", country: "", countryCode: "" },
            { id: "2", title: "Trip to Spain", country: "Spain", countryCode: "es" },
        ];

        const stats = aggregateVisitedCountries(trips);
        expect(stats.length).toBe(1);
        expect(stats[0].code).toBe("es");
    });

    it("should calculate world explored percentage accurately", () => {
        expect(calculateWorldExploredPercentage(0)).toBe(0);
        expect(calculateWorldExploredPercentage(1, 195)).toBe(0.5);
        expect(calculateWorldExploredPercentage(10, 195)).toBe(5.1);
        expect(calculateWorldExploredPercentage(195, 195)).toBe(100);
        expect(calculateWorldExploredPercentage(250, 195)).toBe(100);
    });
});
