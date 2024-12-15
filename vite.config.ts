import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  base: '/',
  plugins: [vue()],
  build: {
    outDir: 'dist', 
    emptyOutDir: true,
    rollupOptions: {
      output: {
        dir: 'dist', 
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@types": resolve(__dirname, "src/types"), 
    },
  },
});

