import 'dotenv/config'

export const NETLIFY_BUILD = Boolean(process.env.NETLIFY || process.env.NETLIFY_DEPLOYMENT_ID);
export const CLOUDFLARE_BUILD = Boolean(process.env.CF_PAGES || process.env.CLOUDFLARE_ACCOUNT_ID);
export const VERCEL_BUILD = Boolean(process.env.VERCEL_DEPLOYMENT_ID);
export const LOCAL_BUILD = Boolean(!NETLIFY_BUILD && !CLOUDFLARE_BUILD && !VERCEL_BUILD);
// VERCEL
export const VERCEL_GIT_REPO_OWNER = process.env.VERCEL_GIT_REPO_OWNER || process.env.PUBLIC_VERCEL_GIT_REPO_OWNER;
export const VERCEL_GIT_REPO_SLUG = process.env.VERCEL_GIT_REPO_SLUG || process.env.PUBLIC_VERCEL_GIT_REPO_SLUG;
// NETLIFY
export const REPOSITORY_URL = process.env.REPOSITORY_URL;
const repoUrlParts = REPOSITORY_URL?.split(':')?.pop()?.split('/');
export const NETLIFY_REPO_NAME = repoUrlParts?.pop();
export const NETLIFY_REPO_OWNER = repoUrlParts?.pop();
export const NETLIFY_REPO = NETLIFY_REPO_OWNER && NETLIFY_REPO_NAME && `${NETLIFY_REPO_OWNER}/${NETLIFY_REPO_NAME}`;
// TODO: remove this
console.log({ REPOSITORY_URL, NETLIFY_REPO_NAME, NETLIFY_REPO_OWNER, NETLIFY_REPO });
// CLOUDFLARE
// NOTE: Doesn't look like Cloudflare export these env variables...?

// REPO
export const REPO_OWNER = process.env.REPO_OWNER || VERCEL_GIT_REPO_OWNER || NETLIFY_REPO_OWNER;
export const REPO_NAME = process.env.REPO_NAME || VERCEL_GIT_REPO_SLUG || NETLIFY_REPO_NAME;
export const REPO = process.env.REPO || (REPO_OWNER && REPO_NAME && `${REPO_OWNER}/${REPO_NAME}`);
console.log({ "process.env.REPO": process.env.REPO, REPO });

// Fallback hosting service
export const PREFERRED_HOSTING = process.env.PREFERRED_HOSTING || 'netlify';

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

