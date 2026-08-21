import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputPath = path.resolve(projectRoot, "src", "utils", "worldMapData.ts");

async function buildWorldMap() {
    console.log("Fetching @svg-maps/world vector map...");
    const res = await fetch("https://cdn.jsdelivr.net/npm/@svg-maps/world@1.0.1/world.svg");
    if (!res.ok) {
        throw new Error(`Failed to fetch map SVG: ${res.statusText}`);
    }
    const svgText = await res.text();
    const pathRegex = /<path([^>]+)\/>/gs;
    const countries = [];
    let match;
    while ((match = pathRegex.exec(svgText)) !== null) {
        const body = match[1];
        const idMatch = /id=["']([^"']+)["']/.exec(body);
        const nameMatch = /name=["']([^"']+)["']/.exec(body);
        const dMatch = /d=["']([^"']+)["']/.exec(body);
        if (idMatch && dMatch) {
            const id = idMatch[1].toLowerCase();
            const name = nameMatch ? nameMatch[1] : id.toUpperCase();
            const d = dMatch[1].replace(/\s+/g, " ").trim();
            countries.push({ id, name, d });
        }
    }

    countries.sort((a, b) => a.id.localeCompare(b.id));

    const content = `/**
 * Optimized SVG Path dataset for World Map countries (ISO 3166-1 alpha-2)
 * Standard ViewBox: 0 0 1010 666
 */
export interface WorldMapCountry {
    id: string;
    name: string;
    d: string;
}

export const WORLD_MAP_VIEWBOX = "0 0 1010 666";

export const worldMapCountries: WorldMapCountry[] = ${JSON.stringify(countries, null, 2)};
`;

    fs.writeFileSync(outputPath, content, "utf-8");
    console.log(`✓ Successfully generated ${countries.length} countries in src/utils/worldMapData.ts!`);
}

buildWorldMap().catch((err) => {
    console.error("Error building world map:", err);
    process.exit(1);
});
