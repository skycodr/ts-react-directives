import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig,
    defineConfig({
      test: {
        exclude: ["src/__storybook__/**"],
        include: ["src/__tests__/**"],
      },
    })
  )
);
