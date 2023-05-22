# Crafting Room Recordings

This repository contains Crafting Room Recordings' updated website and event booking system. The app consists of a CMS, which is an instance of Strapi, and a Next.js frontend.

## Project Setup
This project uses `yarn`. On first cloning the project, run `yarn install` from the workspace root. The two packages in the repository can be run with `yarn cms` and `yarn dev`.

You will also need to provide some environment variables.

crafting-room-cms/.env:
```
HOST=0.0.0.0
PORT=1337
# Can be whatever
APP_KEYS=""
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
JWT_SECRET=
```
crafting-room-frontend/.env
```
STRAPI_URL="" # The docker bridge network endpoint for Strapi
NEXT_PUBLIC_STRAPI_URL="" # The public endpoint for Strapi
NEXT_PUBLIC_IMAGE_URL=""  # The endpoint to fetch images from
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
 
These also need to be set up in the hosting providers DNS config.

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

## CD
In progress - will need to use `docker compose build frontend` and `docker compose up --no-deps -d frontend` to rebuild the frontend container.
