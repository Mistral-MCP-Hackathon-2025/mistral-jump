import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["5bfd7ddf4949.ngrok-free.app"],
    headers: {
      "X-Frame-Options": "ALLOWALL",
      "Content-Security-Policy": "frame-ancestors *;",
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Ensure consistent asset naming for iframe integration
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
  base: "./", // Use relative paths for assets
});
