import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  compressHTML: true,
  integrations: [icon()],
  adapter: vercel(),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      cssMinify: true,
    },
  },
});