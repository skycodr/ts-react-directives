import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig((_configEnv) =>
  mergeConfig(
    viteConfig,
    defineConfig({
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./setupTest.ts'],
        include: ['src/__tests__/**.test.{ts,tsx}'],
        reporters: ['html'],
        outputFile: './reports/test-report.html',
        coverage: {
          reportsDirectory: './reports/coverage',
          include: ['src/**/*.{ts,tsx}'],
          exclude: ['src/__tests__/**', '**/*.d.ts', 'src/index.ts', 'src/main.tsx', 'src/examples/**'],
        },
      },
    }),
  ),
);
