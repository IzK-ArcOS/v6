import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { plugin as markdown } from "vite-plugin-markdown";
import { resolve } from "path";

const chunks = {
  node_modules: "Dependencies",
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), markdown()],
  base: "",
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          for (const [key, value] of Object.entries(chunks)) {
            if (id.includes(key)) return value;
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      $stores: resolve(__dirname, "./src/stores"),
      $ts: resolve(__dirname, "./src/ts"),
      $types: resolve(__dirname, "./src/types"),
      $assets: resolve(__dirname, "./src/assets"),
      $state: resolve(__dirname, "./src/state"),
      $lib: resolve(__dirname, "./src/lib"),
      $css: resolve(__dirname, "./src/css"),
      $apps: resolve(__dirname, "./src/apps"),
    },
  },
});
