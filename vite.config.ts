import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';

const libraryName = 'ts-react-directives';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      insertTypesEntry: true,
      // pointing to the tsconfig.json doesn't work as it doesn't have the paths and
      // will not load the configurations correctly.
      tsconfigPath: './tsconfig.json',
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: libraryName,
      formats: ['es', 'umd'],
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
    alias: {
      // Since assets doesn't have an index file, need to specify the path to the folder
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  preview: {
    port: 3000,
    open: true,
  },
});
