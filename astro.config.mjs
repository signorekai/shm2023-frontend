import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true
  },
  compressHTML: true,
  output: "hybrid",
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
  redirects: {
    '/firstclass': 'https://www.kickstarter.com/projects/superherome/first-class-by-superhero-me',
    '/homerun': 'https://homerun.superherome.sg',
    '/grow': 'https://grow.superherome.sg',
    '/wow': 'https://wow.superherome.sg',
  },
  integrations: [tailwind({
    config: {
      path: './tailwind.config.cjs',
      applyBaseStyles: false
    }
  }), alpinejs()]
});