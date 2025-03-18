import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import cloudflare from "@astrojs/cloudflare";
import netlify from "@astrojs/netlify";
import vercel from "@astrojs/vercel";
// import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { LOCAL_BUILD, PREFERRED_HOSTING, NETLIFY_BUILD, CLOUDFLARE_BUILD, VERCEL_BUILD } from "./astro.config.env";

const cloudflareOptions = {
  platformProxy: { enabled: true, configPath: 'wrangler.jsonc', experimentalJsonConfig: true }
}

const adapter = LOCAL_BUILD
  ? { netlify, cloudflare, vercel }[PREFERRED_HOSTING]()
  : (NETLIFY_BUILD && netlify()) ||
  (CLOUDFLARE_BUILD && cloudflare(cloudflareOptions)) ||
  (VERCEL_BUILD && vercel());

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
  adapter,
  // vite: {
  //   plugins: [nodePolyfills()]
  // }
});
