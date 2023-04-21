import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    config: {
      path: './tailwind.config.cjs',
      applyBaseStyles: false
    }
  }), alpinejs()]
});