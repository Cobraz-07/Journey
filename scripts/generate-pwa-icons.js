import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const iconsDir = path.resolve(projectRoot, "public", "icons");

if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

// Crisp modern SVG markup for Journey app icon
function createSvgIcon(size, isMaskable = false) {
    const padding = isMaskable ? size * 0.22 : size * 0.12;
    const innerSize = size - padding * 2;
    const borderRadius = isMaskable ? 0 : size * 0.22;

    return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#2d372c" />
                <stop offset="100%" stop-color="#1b221a" />
            </linearGradient>
            <linearGradient id="pinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#7fb577" />
                <stop offset="100%" stop-color="#557a50" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="${size * 0.03}" stdDeviation="${size * 0.03}" flood-color="#000000" flood-opacity="0.35"/>
            </filter>
        </defs>

        <!-- Background -->
        <rect width="${size}" height="${size}" rx="${borderRadius}" fill="url(#bgGrad)" />

        <!-- Accent subtle inner ring -->
        <rect x="${size * 0.04}" y="${size * 0.04}" width="${size * 0.92}" height="${size * 0.92}" rx="${Math.max(0, borderRadius - size * 0.04)}" fill="none" stroke="#7fb577" stroke-width="${size * 0.008}" stroke-opacity="0.3" />

        <!-- Pin Icon Center Group -->
        <g transform="translate(${padding}, ${padding}) scale(${innerSize / 384})" filter="url(#shadow)">
            <path fill="url(#pinGrad)" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
            <!-- Inner Dot Highlight -->
            <circle cx="192" cy="192" r="36" fill="#ffffff" opacity="0.95" />
        </g>
    </svg>
    `;
}

async function generateIcons() {
    console.log("Generating PWA icons...");

    // 1. Standard 192x192
    const svg192 = createSvgIcon(192, false);
    await sharp(Buffer.from(svg192)).png().toFile(path.join(iconsDir, "icon-192.png"));
    console.log("✓ Created icon-192.png");

    // 2. Standard 512x512
    const svg512 = createSvgIcon(512, false);
    await sharp(Buffer.from(svg512)).png().toFile(path.join(iconsDir, "icon-512.png"));
    console.log("✓ Created icon-512.png");

    // 3. Maskable 512x512 (Safe zone padding)
    const svgMaskable = createSvgIcon(512, true);
    await sharp(Buffer.from(svgMaskable)).png().toFile(path.join(iconsDir, "icon-maskable-512.png"));
    console.log("✓ Created icon-maskable-512.png");

    // 4. Apple Touch Icon 180x180 (iOS standard)
    const svgApple = createSvgIcon(180, false);
    await sharp(Buffer.from(svgApple)).png().toFile(path.join(iconsDir, "apple-touch-icon.png"));
    console.log("✓ Created apple-touch-icon.png");

    // 5. Favicon 32x32 & 64x64
    const svg32 = createSvgIcon(32, false);
    await sharp(Buffer.from(svg32)).png().toFile(path.join(iconsDir, "favicon-32x32.png"));
    console.log("✓ Created favicon-32x32.png");

    // Copy svg to public/icons/icon.svg and public/icon.svg
    fs.writeFileSync(path.join(iconsDir, "icon.svg"), svg512.trim());
    fs.writeFileSync(path.resolve(projectRoot, "public", "icon.svg"), svg512.trim());
    console.log("✓ Updated public/icon.svg & public/icons/icon.svg");

    console.log("All PWA icons generated successfully!");
}

generateIcons().catch((err) => {
    console.error("Error generating icons:", err);
    process.exit(1);
});
