import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const libraryName = 'ts-react-directives';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      insertTypesEntry: true,
      // pointing to the tsconfig.json doesn't work as it doesn't have the paths and
      // will not load the configurations correctly.
      tsconfigPath: './tsconfig.json',
      rollupTypes: true,
    }),
    tailwindcss(),
  ],
  build: {
    emptyOutDir: true,
    lib: {
      entry: path.resolve(import.meta.dirname, 'src/index.ts'),
      name: libraryName,
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `${libraryName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
        exports: 'named',
      },
    },
  },
  resolve: {
    // Vite resolves the @* aliases declared in tsconfig.json natively; '@assets'
    // still needs an explicit folder alias because it has no index file.
    tsconfigPaths: true,
    alias: {
      '@assets': path.resolve(import.meta.dirname, 'src/assets'),
    },
  },
  preview: {
    port: 3000,
    open: true,
  },
});
