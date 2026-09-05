import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom", // matches official Next guide + vercel with-vitest example
    setupFiles: ["./tests/setup.tsx"],
    include: ["**/*.test.{ts,tsx}"],
  },
});
