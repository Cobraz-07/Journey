import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("PWA Manifest & Assets Validation", () => {
    const projectRoot = path.resolve(__dirname, "..");
    const manifestPath = path.join(projectRoot, "public", "manifest.json");
    const swPath = path.join(projectRoot, "public", "sw.js");

    it("should have a valid public/manifest.json file", () => {
        expect(fs.existsSync(manifestPath)).toBe(true);
        const manifestRaw = fs.readFileSync(manifestPath, "utf-8");
        const manifest = JSON.parse(manifestRaw);

        expect(manifest.name).toBeDefined();
        expect(manifest.short_name).toBe("Journey");
        expect(manifest.display).toBe("standalone");
        expect(manifest.start_url).toBe("/");
        expect(manifest.background_color).toBe("#f2f0eb");
        expect(manifest.theme_color).toBe("#f2f0eb");
        expect(Array.isArray(manifest.icons)).toBe(true);
        expect(manifest.icons.length).toBeGreaterThanOrEqual(4);
    });

    it("should verify that all icons referenced in manifest.json physically exist", () => {
        const manifestRaw = fs.readFileSync(manifestPath, "utf-8");
        const manifest = JSON.parse(manifestRaw);

        manifest.icons.forEach((icon: { src: string; sizes: string; type: string; purpose?: string }) => {
            const iconRelativePath = icon.src.startsWith("/") ? icon.src.slice(1) : icon.src;
            const fullIconPath = path.join(projectRoot, "public", iconRelativePath);
            expect(fs.existsSync(fullIconPath), `Icon file ${fullIconPath} must exist`).toBe(true);
            const stats = fs.statSync(fullIconPath);
            expect(stats.size).toBeGreaterThan(0);
        });
    });

    it("should include a maskable icon for Android adaptive launcher icons", () => {
        const manifestRaw = fs.readFileSync(manifestPath, "utf-8");
        const manifest = JSON.parse(manifestRaw);

        const hasMaskable = manifest.icons.some(
            (icon: { purpose?: string }) => icon.purpose === "maskable"
        );
        expect(hasMaskable).toBe(true);
    });

    it("should have a valid public/sw.js file for PWA installability", () => {
        expect(fs.existsSync(swPath)).toBe(true);
        const swContent = fs.readFileSync(swPath, "utf-8");
        expect(swContent).toContain("addEventListener");
    });
});
