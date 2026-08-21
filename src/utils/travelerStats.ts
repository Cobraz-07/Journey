export interface TripRecord {
    id?: string;
    title?: string;
    country?: string;
    countryCode?: string;
    startDate?: string;
    endDate?: string;
    [key: string]: any;
}

export interface VisitedCountryStats {
    code: string;
    name: string;
    tripCount: number;
    trips: TripRecord[];
}

export const TOTAL_WORLD_COUNTRIES = 195;

/**
 * Extracts and aggregates unique visited countries from an array of trips.
 */
export function aggregateVisitedCountries(trips: TripRecord[]): VisitedCountryStats[] {
    const countryMap = new Map<string, VisitedCountryStats>();

    for (const trip of trips) {
        if (!trip.countryCode && !trip.country) continue;
        const code = (trip.countryCode || "").toLowerCase().trim();
        if (!code) continue;

        const name = trip.country || code.toUpperCase();

        if (!countryMap.has(code)) {
            countryMap.set(code, {
                code,
                name,
                tripCount: 0,
                trips: [],
            });
        }

        const stats = countryMap.get(code)!;
        stats.tripCount += 1;
        stats.trips.push(trip);
    }

    return Array.from(countryMap.values()).sort((a, b) => b.tripCount - a.tripCount);
}

/**
 * Calculates the percentage of the world explored based on unique visited countries.
 */
export function calculateWorldExploredPercentage(
    visitedCount: number,
    totalCountries: number = TOTAL_WORLD_COUNTRIES
): number {
    if (totalCountries <= 0 || visitedCount <= 0) return 0;
    const percentage = (visitedCount / totalCountries) * 100;
    return Math.min(100, Math.round(percentage * 10) / 10);
}
