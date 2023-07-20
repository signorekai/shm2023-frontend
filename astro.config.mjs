import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  output: "server",
  adapter: vercel(),
  integrations: [tailwind({
    config: {
      path: './tailwind.config.cjs',
      applyBaseStyles: false
    }
  }), alpinejs()]
});