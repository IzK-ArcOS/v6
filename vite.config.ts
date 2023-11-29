import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { plugin as markdown } from "vite-plugin-markdown";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), markdown()],
  base: "",
  build: {
    minify: false,
  },
  resolve: {
    alias: {
      $stores: resolve(__dirname, "./src/stores"),
      $ts: resolve(__dirname, "./src/ts"),
      $types: resolve(__dirname, "./src/types"),
    },
  },
});
