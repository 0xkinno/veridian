import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    exclude: ["node_modules", "research", "Internal_docs", ".next"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
