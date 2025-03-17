import { config, fields, collection, type LocalConfig, type GitHubConfig } from '@keystatic/core';
import { LOCAL_BUILD, REPO, REPO_OWNER, REPO_NAME } from './env';

const localMode: LocalConfig['storage'] = {
  kind: 'local',
};

const githubMode: GitHubConfig['storage'] = {
  kind: 'github',
  repo: REPO || ''
};

export default config({
  storage: LOCAL_BUILD ? localMode : githubMode,
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
