import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { testTimeout: 250 },
  plugins: [tsconfigPaths()],
});
