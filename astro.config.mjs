import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jenzzly.github.io',
  base: '/',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [],
  vite: {
    ssr: {
      noExternal: ['leaflet', 'leaflet-routing-machine']
    }
  }
});