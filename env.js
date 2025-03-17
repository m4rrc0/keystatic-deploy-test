import 'dotenv/config'

// TODO: Edit this if you need to run the Keystatic app locally
const repoFallback = 'm4rrc0/keystatic-deploy-test'

const processEnv = typeof process !== 'undefined' ? process.env : {};
const viteEnv = typeof import.meta !== 'undefined' ? import.meta.env : {};

const env = {
  ...processEnv,
  ...viteEnv
};

export const NETLIFY_BUILD = Boolean(env.NETLIFY || env.NETLIFY_DEPLOYMENT_ID);
export const CLOUDFLARE_BUILD = Boolean(env.CF_PAGES || env.CLOUDFLARE_ACCOUNT_ID);
export const VERCEL_BUILD = Boolean(env.VERCEL_DEPLOYMENT_ID);
export const LOCAL_BUILD = Boolean(!NETLIFY_BUILD && !CLOUDFLARE_BUILD && !VERCEL_BUILD);
// VERCEL
export const VERCEL_GIT_REPO_OWNER = env.VERCEL_GIT_REPO_OWNER || env.PUBLIC_VERCEL_GIT_REPO_OWNER;
export const VERCEL_GIT_REPO_SLUG = env.VERCEL_GIT_REPO_SLUG || env.PUBLIC_VERCEL_GIT_REPO_SLUG;
// NETLIFY
export const REPOSITORY_URL = env.REPOSITORY_URL;
const repoUrlParts = REPOSITORY_URL?.split(':')?.pop()?.split('/');
export const NETLIFY_REPO_NAME = repoUrlParts?.pop();
export const NETLIFY_REPO_OWNER = repoUrlParts?.pop();
export const NETLIFY_REPO = NETLIFY_REPO_OWNER && NETLIFY_REPO_NAME && `${NETLIFY_REPO_OWNER}/${NETLIFY_REPO_NAME}`;
// TODO: remove this
console.log({ REPOSITORY_URL, NETLIFY_REPO_NAME, NETLIFY_REPO_OWNER, NETLIFY_REPO });
// CLOUDFLARE
// NOTE: Doesn't look like Cloudflare export these env variables...?

// REPO
export const REPO_OWNER = env.REPO_OWNER || VERCEL_GIT_REPO_OWNER || NETLIFY_REPO_OWNER;
export const REPO_NAME = env.REPO_NAME || VERCEL_GIT_REPO_SLUG || NETLIFY_REPO_NAME;
export const REPO = env.REPO || (REPO_OWNER && REPO_NAME && `${REPO_OWNER}/${REPO_NAME}`) || repoFallback;
console.log({ "processEnv.REPO": processEnv.REPO, REPO });

// Fallback hosting service
export const PREFERRED_HOSTING = env.PREFERRED_HOSTING || 'netlify';

export default {
  NETLIFY_BUILD,
  CLOUDFLARE_BUILD,
  VERCEL_BUILD,
  LOCAL_BUILD,
  VERCEL_GIT_REPO_OWNER,
  VERCEL_GIT_REPO_SLUG,
  REPOSITORY_URL,
  NETLIFY_REPO_NAME,
  NETLIFY_REPO_OWNER,
  NETLIFY_REPO,
  REPO_OWNER,
  REPO_NAME,
  REPO,
  PREFERRED_HOSTING
}

