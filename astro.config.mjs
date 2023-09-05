import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true
  },
  output: "server",
  adapter: vercel({
    "imageService": true,
    "imagesConfig": {
      "sizes": [1500],
      "minimumCacheTTL": 300,
      "formats": ["image/webp"],
      "remotePatterns": [{
        "protocol": "https",
        "hostname": "backend.superherome.sg",
        "pathname": "/wp-content/**"
      }]
    }
  }),
  integrations: [tailwind({
    config: {
      path: './tailwind.config.cjs',
      applyBaseStyles: false
    }
  }), alpinejs()]
});