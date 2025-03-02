import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths(), libInjectCss()],
  root: '.',
  build: {
    outDir: 'dist/examples',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      // Since assets doesn't have an index file, need to specify the path to the folder
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  base: './',
});
