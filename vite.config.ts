import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow external access
    port: 5173,
    allowedHosts: ["5bfd7ddf4949.ngrok-free.app", "52.58.159.118", "*"],
    headers: {
      "X-Frame-Options": "SAMEORIGIN", // Changed from ALLOWALL which is invalid
      "Content-Security-Policy": "frame-ancestors *;",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  },
  preview: {
    host: "0.0.0.0", // Allow external access
    port: 4173,
    headers: {
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": "frame-ancestors *;",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
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
