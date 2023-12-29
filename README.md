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

# Whether to use the fallback image for every image on the site.
# - Ideal for development with no media.
# - Primarily for development
# - Optional
# - If empty or undefined: defaults to `false`
ALWAYS_USE_FALLBACK_IMAGE=false

# Override the default fallback image with the provided image URL.
# - This could be from a random image generator such as https://picsum.photos
# - If you do you a random image generator, please note `DISABLE_IMAGE_CACHING` below
# - Primarily for development
# - Optional
# - If empty or undefined: defaults to `/fallback.png`
FALLBACK_IMAGE_URL=""

# Whether to enable or disable caching of images.
# - If enabled, a random querystring parameter is appended to the image URL.
# - This prevents the browser from caching the image.
# - Primarily intended for use with `FALLBACK_IMAGE_URL` with a random image generator
# - Primarily for development
# - Optional
# - If empty or undefined: defaults to `false`
DISABLE_IMAGE_CACHING=false

# The interval between cache revalidations (in seconds), or `false` to disable.
# - In other words, 'after this period of time, ask the server for new data on the next request'.
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
The deployed site consists of three containers, `cms`, `frontend` and `nginx`. 

To deploy a fresh instance, 
1. Clone the site repo to the deployment machine's home directory
2. Install SSL certificates
Use `certbot` to install certificates for these subdomains.
  - `craftingroomrecordings.co.uk`
  - `www.craftingroomrecordings.co.uk`
  - `api.craftingroomrecordings.co.uk`
 
These also need to be set up in the hosting provider's DNS config.

3. Spin up the site's docker container
```
$ DOCKER_BUILDKIT=0 docker compose up -d --build
```

Using Docker Buildkit causes the images to build in parallel, which can cause errors when the frontend tries to fetch static site data from the CMS during build. It might be worth setting this value permanently on the server machine.

4. Add a database backup job to the crontab
```
# Make a copy of the database outside the active repo
0 0 * * * cp ~/crafting-room/crafting-room-cms/data/data.db ~/backup/$(date +\%d-\%m-\%Y).db

# Delete backups older than 30 days
0 0 * * * find ~/backups/ -mtime +30 -delete
```

## Creating a New Release
This repository has a GitHub action set up to automatically deploy new releases to the server. The steps are roughly:
- Login to the server over SSH
- Pull the latest changes
- Rebuild the site with `DOCKER_BUILDKIT=0 docker compose up -d --build
