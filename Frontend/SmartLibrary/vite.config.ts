import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['pdfjs-dist/build/pdf.worker.min.js'],
    },
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@features": path.resolve(__dirname, "src/features"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  assetsInclude: ['**/*.worker.js'],
});
