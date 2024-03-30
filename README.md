# Crafting Room Recordings

This repository contains Crafting Room Recordings' updated website and event booking system. The app consists of a CMS, which is an instance of Strapi, and a Next.js frontend.

## Project Setup

This project uses `yarn`. On first cloning the project, run `yarn install` from the workspace root. The two packages in the repository can be run with `yarn cms` and `yarn dev`.

You will also need to provide some environment variables.

crafting-room-cms/.env.example:

```python
HOST=0.0.0.0
PORT=1337

# Can be whatever
APP_KEYS=""
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
JWT_SECRET=
```

crafting-room-frontend/.env.example

```python
# The host URL for Strapi.
# - Required!
STRAPI_HOST=""

# The host URL for Strapi media.
# - Optional
# - If empty or undefined: defaults to value of `STRAPI_HOST`
STRAPI_MEDIA_PROVIDER_HOST=""

# The interval between cache revalidations (in seconds), or `false` to disable.
# - In other words, 'after this period of time, ask the server for new
# data on the next request'.
# - Optional
# - If empty or undefined: defaults to `false`
CACHE_REVALIDATION_INTERVAL=false
```

## Navigating the Frontend Project

The frontend for CRR uses Next.js. The project is structued as follows:

- Routes are in `src/app`
- Components are in `src/components`
- Library and utility code is in `src/lib`

## Deployment

The deployed site consists of two containers, `cms` and `frontend`. Nginx is used as a reverse proxy and to provide TLS. This setup guide assumes DNS records for the relevant URLs have already been set up on the chosen hosting provider. To deploy from scratch:

1. Clone the site repo to the deployment machine's home directory
2. Install `certbot` and generate certificates for the desired domains:
    - Run `sudo snap install --classic certbot`
    - Run `sudo ln -s /snap/bin/certbot /usr/bin/certbot`
    - Run `sudo certbot certonly --nginx`
3. Install Nginx:
    - Add `include /root/crafting-room/nginx/default.conf;` to `/etc/nginx/nginx.conf`
    - Run Nginx with `nginx`
4. Build and run the site:
    - Run `DOCKER_BUILDKIT=0 docker compose up -d --build`. Using Docker Buildkit causes the images to build in parallel, which can cause errors when the frontend tries to fetch static site data from the CMS during build.
5. Add the following cron jobs:
    - Out of repo DB backup: `0 0 * * * cp ~/crafting-room/crafting-room-cms/data/data.db ~/backup/$(date +\%Y-\%m-\%d).db`
    - Old backup clearing: `0 0 * * * find ~/backups/ -mtime +30 -delete`
    - Auto-renew certificates: `0 12 * * * /usr/bin/certbot renew --quiet`
