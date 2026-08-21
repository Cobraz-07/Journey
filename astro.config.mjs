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
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      cssMinify: true,
    },
  },
});