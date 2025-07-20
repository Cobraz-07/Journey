import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from 'astro/config';

import icon from "astro-icon";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",

  vite: {
      plugins: [tailwindcss()],
      resolve: {
      alias: {
        '@': '/src'
      }
    }
    },

  integrations: [icon()],
  adapter: vercel(),
});