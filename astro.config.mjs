// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://seg247.github.io',
  base: '/shoppingwithnoya-site-v3',
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    ssr: {
      noExternal: [],
    },
  },
});
