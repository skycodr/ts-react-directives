import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: '.',
  build: {
    outDir: 'dist/examples',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    // Vite resolves the @* aliases declared in tsconfig.json natively; '@assets'
    // still needs an explicit folder alias because it has no index file.
    tsconfigPaths: true,
    alias: {
      '@assets': path.resolve(import.meta.dirname, 'src/assets'),
    },
  },
  base: './',
});
