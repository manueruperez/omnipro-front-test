import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  build: {
    outDir: "dist",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
