import { config, fields, collection, type LocalConfig, type GitHubConfig } from '@keystatic/core';

const VERCEL_GIT_REPO_OWNER = import.meta.env.PUBLIC_VERCEL_GIT_REPO_OWNER;
const VERCEL_GIT_REPO_SLUG = import.meta.env.PUBLIC_VERCEL_GIT_REPO_SLUG;
const VERCEL_REPO = VERCEL_GIT_REPO_OWNER && VERCEL_GIT_REPO_SLUG && `${VERCEL_GIT_REPO_OWNER}/${VERCEL_GIT_REPO_SLUG}`;
const REPO = import.meta.env.PUBLIC_REPO || VERCEL_REPO || '';
const PUBLIC_KEYSTATIC_STORAGE_LOCAL = (
  import.meta.env.PUBLIC_KEYSTATIC_STORAGE_LOCAL === true ||
  import.meta.env.PUBLIC_KEYSTATIC_STORAGE_LOCAL === 'true' ||
  (import.meta.env.PUBLIC_KEYSTATIC_STORAGE_LOCAL !== 'false' && (import.meta.env.DEV || false))
);

const localMode: LocalConfig['storage'] = {
  kind: 'local',
};

const githubMode: GitHubConfig['storage'] = {
  kind: 'github',
  repo: REPO
};

export default config({
  storage: PUBLIC_KEYSTATIC_STORAGE_LOCAL ? localMode : githubMode,
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/images/posts',
              publicPath: '../../assets/images/posts/',
            },
          },
        }),
      },
    }),
  },
});
