# Crafting Room Recordings website

Crafting Room Recordings' current website.

## Project Setup

This project uses `pnpm` for dependency management. Run `pnpm install` at the project root to get started. Both `cms` and `site` need a `.env` file - see their respective `.env.example` files.

`turbo` is used for monorepo management, so everything can be run from the repo root:

- `pnpm dev` starts a dev server
- `pnpm build` creates a production build.
