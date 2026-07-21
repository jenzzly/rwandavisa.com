import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://jenzzly.github.io',
  output: 'server',
  adapter: cloudflare(),

  trailingSlash: 'ignore',

  vite: {
    ssr: {
      noExternal: ['leaflet', 'leaflet-routing-machine']
    }
  }
});