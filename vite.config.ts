import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: true, // ensures it listens on 0.0.0.0
    port: 8080,
    allowedHosts: [
      "collegealumnimanagemet.onrender.com", // ✅ main Render domain
      ".onrender.com", // ✅ allows all Render subdomains (safe shortcut)
    ],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
