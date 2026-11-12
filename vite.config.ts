import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// Relative base keeps the built site free of root-absolute asset URLs.
export default defineConfig({
  base: "./",
  plugins: [vue()],
  build: {
    cssCodeSplit: false,
  },
});
