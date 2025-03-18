import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import cloudflare from "@astrojs/cloudflare";
import netlify from "@astrojs/netlify";
import vercel from "@astrojs/vercel";
import { LOCAL_BUILD, PREFERRED_HOSTING, NETLIFY_BUILD, CLOUDFLARE_BUILD, VERCEL_BUILD } from "./astro.config.env";

const cloudflareOptions = {
  platformProxy: { enabled: true, configPath: 'wrangler.jsonc', experimentalJsonConfig: true }
}

// NOTE: Cloudflare workaround for Error:
// `Failed to publish your Function. Got error: Uncaught ReferenceError: MessageChannel is not defined`
// https://github.com/withastro/adapters/pull/436#issuecomment-2525190557
// https://github.com/withastro/astro/issues/12824#issuecomment-2563095382
const cloudflareViteConfig = {
  resolve: {
    // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
    // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
    alias: import.meta.env.PROD && {
      "react-dom/server": "react-dom/server.edge",
    },
  },
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
  vite: {
    ...((LOCAL_BUILD && PREFERRED_HOSTING === 'cloudflare') || CLOUDFLARE_BUILD) ? cloudflareViteConfig : {}
  }
});
