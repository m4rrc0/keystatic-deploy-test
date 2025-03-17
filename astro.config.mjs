import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import cloudflare from "@astrojs/cloudflare";
import netlify from "@astrojs/netlify";
import vercel from "@astrojs/vercel";

const adapter =
  (Boolean(process.env.NETLIFY) && netlify()) ||
  (Boolean(process.env.CF_PAGES) && cloudflare({ platformProxy: { enabled: true, configPath: 'wrangler.jsonc', experimentalJsonConfig: true } })) ||
  (Boolean(process.env.VERCEL_DEPLOYMENT_ID) && vercel());

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
  adapter,
});
