import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jenzzly.github.io',

  // Generate static HTML files
  output: 'static',

  trailingSlash: 'ignore',

  vite: {
    ssr: {
      noExternal: [
        'leaflet',
        'leaflet-routing-machine'
      ]
    }
  }
});