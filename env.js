import 'dotenv/config'

// TODO: Edit this if you need to run the Keystatic app locally
const repoFallback = 'm4rrc0/keystatic-deploy-test'

const processEnv = typeof process !== 'undefined' ? process.env : {};
// const viteEnv = typeof import.meta !== 'undefined' ? import.meta.env : {};

export const NETLIFY_BUILD = Boolean(processEnv.NETLIFY || processEnv.NETLIFY_DEPLOYMENT_ID);
export const CLOUDFLARE_BUILD = Boolean(processEnv.CF_PAGES || processEnv.CLOUDFLARE_ACCOUNT_ID);
export const VERCEL_BUILD = Boolean(processEnv.VERCEL_DEPLOYMENT_ID);
export const LOCAL_BUILD = Boolean(!NETLIFY_BUILD && !CLOUDFLARE_BUILD && !VERCEL_BUILD);
// VERCEL
export const VERCEL_GIT_REPO_OWNER = processEnv.VERCEL_GIT_REPO_OWNER || processEnv.PUBLIC_VERCEL_GIT_REPO_OWNER;
export const VERCEL_GIT_REPO_SLUG = processEnv.VERCEL_GIT_REPO_SLUG || processEnv.PUBLIC_VERCEL_GIT_REPO_SLUG;
// NETLIFY
export const REPOSITORY_URL = processEnv.REPOSITORY_URL;
const repoUrlParts = REPOSITORY_URL?.split(':')?.pop()?.split('/');
export const NETLIFY_REPO_NAME = repoUrlParts?.pop();
export const NETLIFY_REPO_OWNER = repoUrlParts?.pop();
export const NETLIFY_REPO = NETLIFY_REPO_OWNER && NETLIFY_REPO_NAME && `${NETLIFY_REPO_OWNER}/${NETLIFY_REPO_NAME}`;
// TODO: remove this
console.log({ REPOSITORY_URL, NETLIFY_REPO_NAME, NETLIFY_REPO_OWNER, NETLIFY_REPO });
// CLOUDFLARE
// NOTE: Doesn't look like Cloudflare export these env variables...?

// REPO
export const REPO_OWNER = processEnv.REPO_OWNER || VERCEL_GIT_REPO_OWNER || NETLIFY_REPO_OWNER;
export const REPO_NAME = processEnv.REPO_NAME || VERCEL_GIT_REPO_SLUG || NETLIFY_REPO_NAME;
export const REPO = processEnv.REPO || (REPO_OWNER && REPO_NAME && `${REPO_OWNER}/${REPO_NAME}`) || repoFallback;
console.log({ "processEnv.REPO": processEnv.REPO, REPO });

// Fallback hosting service
export const PREFERRED_HOSTING = processEnv.PREFERRED_HOSTING || 'netlify';

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

