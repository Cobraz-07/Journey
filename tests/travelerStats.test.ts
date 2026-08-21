import { describe, it, expect } from "vitest";
import {
    aggregateVisitedCountries,
    calculateWorldExploredPercentage,
    getVisitedContinents,
    calculateTotalDaysTraveled,
    calculateTravelerSummary,
} from "../src/utils/travelerStats";

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

    it("should correctly identify visited continents", () => {
        const codes = ["es", "fr", "jp", "us", "br", "au", "eg"];
        const result = getVisitedContinents(codes);
        expect(result.visitedCount).toBe(6); // Europe (es, fr), Asia (jp), North America (us), South America (br), Oceania (au), Africa (eg)
        expect(result.totalContinents).toBe(7);
        expect(result.continentsList).toContain("Europe");
        expect(result.continentsList).toContain("Asia");
        expect(result.continentsList).toContain("North America");
        expect(result.continentsList).toContain("South America");
        expect(result.continentsList).toContain("Oceania");
        expect(result.continentsList).toContain("Africa");
    });

    it("should calculate total days traveled accurately", () => {
        const trips = [
            { id: "1", startDate: "2024-06-01", endDate: "2024-06-10" }, // 10 days
            { id: "2", startDate: "2024-07-01", endDate: "2024-07-01" }, // 1 day
            { id: "3", startDate: "2024-08-15" },                         // 1 day
        ];

        expect(calculateTotalDaysTraveled(trips)).toBe(12);
    });

    it("should calculate complete summary stats correctly", () => {
        const trips = [
            { id: "1", title: "Japan", country: "Japan", countryCode: "jp", startDate: "2024-01-01", endDate: "2024-01-05" },
            { id: "2", title: "Spain", country: "Spain", countryCode: "es", startDate: "2024-02-01", endDate: "2024-02-07" },
        ];

        const summary = calculateTravelerSummary(trips);
        expect(summary.visitedCountriesCount).toBe(2);
        expect(summary.worldExploredPercentage).toBe(1.0);
        expect(summary.totalTripsCount).toBe(2);
        expect(summary.visitedContinentsCount).toBe(2); // Asia, Europe
        expect(summary.totalDaysTraveled).toBe(12); // 5 + 7
    });
});
