import { defineConfig, loadEnv, mergeConfig } from 'vite';

import viteConfig from './vite.config.ts';

export default defineConfig(({ mode }) => {
  const devEnv = loadEnv(mode, process.cwd(), '');

  Object.assign(process.env, devEnv);

  return mergeConfig(
    viteConfig,
    defineConfig({
      plugins: [
        {
          name: 'expose-process-env',
          transformIndexHtml(_html, ctx) {
            if (!ctx.server) return;

            return [
              {
                tag: 'script',
                attrs: { type: 'text/javascript' },
                children: `globalThis.process = { env: ${JSON.stringify(devEnv)} };`,
                injectTo: 'head-prepend',
              },
            ];
          },
        },
      ],
    }),
  );
});
