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

export interface ContinentStats {
    name: string;
    code: string;
    visited: boolean;
}

export interface TravelerStatsSummary {
    visitedCountriesCount: number;
    worldExploredPercentage: number;
    totalTripsCount: number;
    visitedContinentsCount: number;
    totalContinentsCount: number;
    visitedContinentsList: string[];
    totalDaysTraveled: number;
}

export const TOTAL_WORLD_COUNTRIES = 195;
export const TOTAL_CONTINENTS = 7;

/**
 * Mapping of 2-letter ISO country codes to Continents.
 */
const COUNTRY_TO_CONTINENT: Record<string, string> = {
    // Europe
    al: "Europe", ad: "Europe", at: "Europe", by: "Europe", be: "Europe", ba: "Europe",
    bg: "Europe", hr: "Europe", cy: "Europe", cz: "Europe", dk: "Europe", ee: "Europe",
    fo: "Europe", fi: "Europe", fr: "Europe", de: "Europe", gi: "Europe", gr: "Europe",
    gg: "Europe", hu: "Europe", is: "Europe", ie: "Europe", im: "Europe", it: "Europe",
    je: "Europe", xk: "Europe", lv: "Europe", li: "Europe", lt: "Europe", lu: "Europe",
    mk: "Europe", mt: "Europe", md: "Europe", mc: "Europe", me: "Europe", nl: "Europe",
    no: "Europe", pl: "Europe", pt: "Europe", ro: "Europe", ru: "Europe", sm: "Europe",
    rs: "Europe", sk: "Europe", si: "Europe", es: "Europe", sj: "Europe", se: "Europe",
    ch: "Europe", ua: "Europe", gb: "Europe", va: "Europe", ax: "Europe",

    // Asia
    af: "Asia", am: "Asia", az: "Asia", bh: "Asia", bd: "Asia", bt: "Asia",
    bn: "Asia", kh: "Asia", cn: "Asia", ge: "Asia", hk: "Asia", in: "Asia",
    id: "Asia", ir: "Asia", iq: "Asia", il: "Asia", jp: "Asia", jo: "Asia",
    kz: "Asia", kp: "Asia", kr: "Asia", kw: "Asia", kg: "Asia", la: "Asia",
    lb: "Asia", mo: "Asia", my: "Asia", mv: "Asia", mn: "Asia", mm: "Asia",
    np: "Asia", om: "Asia", pk: "Asia", ps: "Asia", ph: "Asia", qa: "Asia",
    sa: "Asia", sg: "Asia", lk: "Asia", sy: "Asia", tw: "Asia", tj: "Asia",
    th: "Asia", tl: "Asia", tr: "Asia", tm: "Asia", ae: "Asia", uz: "Asia",
    vn: "Asia", ye: "Asia",

    // Africa
    dz: "Africa", ao: "Africa", bj: "Africa", bw: "Africa", bf: "Africa", bi: "Africa",
    cv: "Africa", cm: "Africa", cf: "Africa", td: "Africa", km: "Africa", cg: "Africa",
    cd: "Africa", ci: "Africa", dj: "Africa", eg: "Africa", gq: "Africa", er: "Africa",
    sz: "Africa", et: "Africa", ga: "Africa", gm: "Africa", gh: "Africa", gn: "Africa",
    gw: "Africa", ke: "Africa", ls: "Africa", lr: "Africa", ly: "Africa", mg: "Africa",
    mw: "Africa", ml: "Africa", mr: "Africa", mu: "Africa", yt: "Africa", ma: "Africa",
    mz: "Africa", na: "Africa", ne: "Africa", ng: "Africa", re: "Africa", rw: "Africa",
    sh: "Africa", st: "Africa", sn: "Africa", sc: "Africa", sl: "Africa", so: "Africa",
    za: "Africa", ss: "Africa", sd: "Africa", tz: "Africa", tg: "Africa", tn: "Africa",
    ug: "Africa", eh: "Africa", zm: "Africa", zw: "Africa",

    // North America
    ag: "North America", bs: "North America", bb: "North America", bz: "North America",
    bm: "North America", ca: "North America", cr: "North America", cu: "North America",
    cw: "North America", dm: "North America", do: "North America", sv: "North America",
    gl: "North America", gd: "North America", gp: "North America", gt: "North America",
    ht: "North America", hn: "North America", jm: "North America", mq: "North America",
    mx: "North America", ms: "North America", ni: "North America", pa: "North America",
    pr: "North America", bl: "North America", kn: "North America", lc: "North America",
    mf: "North America", pm: "North America", vc: "North America", sx: "North America",
    tt: "North America", tc: "North America", us: "North America", vg: "North America",
    vi: "North America", ky: "North America", bq: "North America", ai: "North America",

    // South America
    ar: "South America", bo: "South America", br: "South America", cl: "South America",
    co: "South America", ec: "South America", fk: "South America", gf: "South America",
    gy: "South America", py: "South America", pe: "South America", sr: "South America",
    uy: "South America", ve: "South America",

    // Oceania
    as: "Oceania", au: "Oceania", ck: "Oceania", cx: "Oceania", cc: "Oceania",
    fj: "Oceania", pf: "Oceania", gu: "Oceania", hm: "Oceania", ki: "Oceania",
    mh: "Oceania", fm: "Oceania", nr: "Oceania", nc: "Oceania", nz: "Oceania",
    nu: "Oceania", nf: "Oceania", mp: "Oceania", pw: "Oceania", pg: "Oceania",
    pn: "Oceania", ws: "Oceania", sb: "Oceania", tk: "Oceania", to: "Oceania",
    tv: "Oceania", um: "Oceania", vu: "Oceania", wf: "Oceania",

    // Antarctica
    aq: "Antarctica", bv: "Antarctica", gs: "Antarctica", tf: "Antarctica",
};

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

/**
 * Computes unique visited continents from country ISO codes.
 */
export function getVisitedContinents(countryCodes: string[]): {
    visitedCount: number;
    totalContinents: number;
    continentsList: string[];
} {
    const visitedSet = new Set<string>();

    for (const rawCode of countryCodes) {
        const code = (rawCode || "").toLowerCase().trim();
        const continent = COUNTRY_TO_CONTINENT[code];
        if (continent) {
            visitedSet.add(continent);
        }
    }

    return {
        visitedCount: visitedSet.size,
        totalContinents: TOTAL_CONTINENTS,
        continentsList: Array.from(visitedSet).sort(),
    };
}

/**
 * Calculates total days traveled across all trips based on start and end dates.
 */
export function calculateTotalDaysTraveled(trips: TripRecord[]): number {
    let totalDays = 0;

    for (const trip of trips) {
        if (!trip.startDate) continue;

        // Parse YYYY-MM-DD cleanly
        const startParts = trip.startDate.split("-").map(Number);
        if (startParts.length !== 3 || startParts.some(isNaN)) continue;
        const startDate = new Date(Date.UTC(startParts[0], startParts[1] - 1, startParts[2]));
        if (isNaN(startDate.getTime())) continue;

        if (trip.endDate) {
            const endParts = trip.endDate.split("-").map(Number);
            if (endParts.length === 3 && !endParts.some(isNaN)) {
                const endDate = new Date(Date.UTC(endParts[0], endParts[1] - 1, endParts[2]));
                if (!isNaN(endDate.getTime()) && endDate >= startDate) {
                    const diffTime = endDate.getTime() - startDate.getTime();
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive of start and end date
                    totalDays += diffDays;
                    continue;
                }
            }
        }

        // Single day trip if no valid endDate
        totalDays += 1;
    }

    return totalDays;
}

/**
 * Computes comprehensive summary stats for a user's journeys.
 */
export function calculateTravelerSummary(trips: TripRecord[]): TravelerStatsSummary {
    const visitedCountries = aggregateVisitedCountries(trips);
    const countryCodes = visitedCountries.map((c) => c.code);
    const continentStats = getVisitedContinents(countryCodes);

    return {
        visitedCountriesCount: visitedCountries.length,
        worldExploredPercentage: calculateWorldExploredPercentage(visitedCountries.length),
        totalTripsCount: trips.length,
        visitedContinentsCount: continentStats.visitedCount,
        totalContinentsCount: continentStats.totalContinents,
        visitedContinentsList: continentStats.continentsList,
        totalDaysTraveled: calculateTotalDaysTraveled(trips),
    };
}
