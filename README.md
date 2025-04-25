# `craftingroomrecordings.co.uk`

Crafting Room Recordings' current website.

## Development

This project uses `pnpm` for dependency management. Run `pnpm install` at the project root to get started. Both `cms` and `site` need a `.env` file - see their respective `.env.example` files.

`turbo` is used for monorepo management, so everything can be run from the repo root:

- `pnpm dev` starts a dev server
- `pnpm build` creates a production build.

Additional utility scripts are provided:

- `pnpm backup` copies the server's data directory to `cms/.tmp`, allowing it to be used for local testing.

## Deployment

Deploying a new version is done from a local machine with SSH access to craftingroomrecordings.co.uk.

1. Run `pnpm build`.
1. (Optional) Run `pnpm preview` to start up the build locally. The preview site is accessible at <http://localhost:3000>.
1. Run `pnpm backup`.
1. Run `pnpm live` to copy `dist` to the server.
1. Run the generated `ssh` command to restart `pm2` on the server.

### Caddy

Caddy is used as a reverse proxy for this site, configured in the root `Caddyfile`. This should not need frequent updates, but can be pushed to the server using:

```sh
rsync Caddyfile root@craftingroomrecordings.co.uk:/etc/caddy/Caddyfile && ssh root@craftingroomrecordings.co.uk "service caddy restart"`.
```

If deploying to a new server, ensure the following are installed:

- `caddy`
- `pnpm`
- `node` (v22+)
- `pm2`

Set up appropriate DNS records first, _then_ sync the `Caddyfile` and run the deploy script - this avoids any SSL issues.
