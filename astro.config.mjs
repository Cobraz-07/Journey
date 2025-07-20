import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [icon()],
  adapter: vercel(),
  vite: {
      plugins: [tailwindcss()],
    },
});