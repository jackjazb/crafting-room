# `craftingroomrecordings.co.uk`

Crafting Room Recordings' current website.

## Project Setup

This project uses `pnpm` for dependency management. Run `pnpm install` at the project root to get started. Both `cms` and `site` need a `.env` file - see their respective `.env.example` files.

`turbo` is used for monorepo management, so everything can be run from the repo root:

- `pnpm dev` starts a dev server
- `pnpm build` creates a production build.

## Deployment

Deploying a new version is done from a local machine with SSH access to craftingroomrecordings.co.uk.

1. Run `pnpm build` and ensure the contents of `dist` is updated
1. Run `node deploy.mjs` to copy `dist` to the server and restart `pm2`.

If deploying to a new server, ensure the following are installed:

- `pnpm`
- `node v22`
- `pm2`
