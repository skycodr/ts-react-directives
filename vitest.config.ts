import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';
import { loadEnv } from 'vite';
import fs from 'fs';
import path from 'path';

// Ensure .vitest directory exists
const vitestDir = path.join(process.cwd(), '.vitest');
if (!fs.existsSync(vitestDir)) {
  fs.mkdirSync(vitestDir, { recursive: true });
}

export default defineConfig(({ mode }) =>
  mergeConfig(
    viteConfig,
    defineConfig({
      test: {
        env: loadEnv(mode, process.cwd(), ''),
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./setupTest.ts'],
        include: ['src/__tests__/**.test.{ts,tsx}'],
        reporters: ['default', 'html'],
        outputFile: './.vitest/test-report.html',
        coverage: {
          reportsDirectory: './.vitest/coverage',
          include: ['src/**/*.{ts,tsx}'],
          exclude: ['src/__tests__/**', '**/*.d.ts', 'src/index.ts', 'src/main.tsx', 'src/examples/**'],
        },
      },
    }),
  ),
);
