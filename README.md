# Keystatic in Astro

This repo is a barebone Keystatic setup with Astro meant to test deployment on Astro's supported static hosting providers.

This README is the guide I wish I had when first trying to integrate Keystatic to a project.

It is expected that you have a clear understanding of the [Keystatic documentation](https://keystatic.com/docs) before diving into this guide.

## Repository

https://github.com/m4rrc0/keystatic-deploy-test/

## Deploys

### Cloudflare

Deployed at: https://keystatic-deploy-test.pages.dev/

### Netlify

Deployed at: https://keystatic-deploy-test.netlify.app/

### Vercel

Deployed at: https://keystatic-deploy-test.vercel.app/

## Environment variables

Have a look at the `.env.template` file for the environment variables you need to set.

If you work locally, create a `.env` file from the template and fill in the variables.

When deploying on one of the supported hosting providers, you will need to set the environment variables in the provider's dashboard.

Look at the following [Github app creation form](#github-app-creation-form) section to know where to find the values.

## Github app (for Keystatic Github mode)

If you are confortable cloning the repo and working locally, you can follow the [Keystatic documentation](https://keystatic.com/docs/github-mode) to create the Github app.

If you don't want (or don't know how to) clone and run the repo locally, here is how you can manually create the Github app (as far as I could guess).

1. Go to https://github.com/settings/apps
2. Click on "New GitHub App" (in the top right corner)
3. Fill in the form with the following informations

### Github app creation form

#### Basic information

- GitHub App name: <whatever> -> (❗️This is your `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` environment variable)
- Homepage URL: "https://<deployed_URL>/keystatic"

#### Identifying and authorizing users

- Callback URL: "https://<deployed_URL>/api/keystatic/github/oauth/callback"
- Expire user authorization tokens: `true`
- Request user authorization (OAuth) during installation: `true`
- Enable Device flow: `false`

#### Post Installation

- Setup URL: ""
- Redirect on update: `false`

#### Webhook

- Active: `false`
- Webhook URL: ""
- Secret: ""

### Permissions and events

#### Repository permissions

- Contents: `read`, `write`
- Metadata: `read only` (mandatory: should be preselected)
- Pull requests: `read only`

### Generate a new client secret

After creating the app, you can generate a new client secret from the app's settings page.

1. Go to https://github.com/settings/apps/
2. Click on the app you just created
3. In the very first section, click on "Generate a new client secret"
4. ⚠️ Immediately copy the generated client secret and save it somewhere safe as it will not be visible later in your app settings
5. If you forget to save it, you can always create a new one later though

-> ❗️This is your `KEYSTATIC_GITHUB_CLIENT_SECRET` environment variable

### Retrieve the remaining environment variables

#### Client ID

The `Client ID` is visible in the very first section of the Github app settings.

-> ❗️This is your `KEYSTATIC_GITHUB_CLIENT_ID` environment variable

#### Keystatic secret

The Keystatic secret is a random 64 characters string that you can generate with the `generate-secret` npm script or from this little helper app for example: https://keystatic-deploy-test.netlify.app/generate-keystatic-secret/

-> ❗️This is your `KEYSTATIC_SECRET` environment variable

## Technical deployment considerations and gotchas

### Cloudflare

Cloudflare needs a special Vite config to work with React 19. You can find the config in the [astro.config.mjs](./astro.config.mjs) file.

## Roadmap and Maybes

- [ ] Find a smart way to pass env variables from the server to the Vite app
- [ ] Verify config for working locally with the different hosting providers' CLIs
- [ ] ? Add config for the Keystatic Cloud storage mode
