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
STRAPI_URL="" # The URL to fetch Strapi content from (serverside, will be a Docker container in a deployed instance)
IMAGE_URL=""  # Strapi's public image URL
BASE_URL=""   # The base URL of the site
```
## Navigating the Frontend Project

The frontend for CRR uses Next.js. The project is structued as follows:
- Routes are in `src/app`
- Components are in `src/components`
- Library and utility code is in `src/lib`

## Deployment 
The deployed site consists of three containers, `cms`, `frontend` and `nginx`. 

To deploy a fresh instance, 
1. Install SSL certificates
Use `certbot` to install certificates for these subdomains.
  - `craftingroomrecordings.co.uk`
  - `www.craftingroomrecordings.co.uk`
  - `api.craftingroomrecordings.co.uk`
 
These also need to be set up in the hosting providers DNS config.

2. Spin up `cms` 
This starts up a Strapi instance. It needs to be done before `frontend`, as Next.js's build phase requires it.
```
$ docker compose up -d cms
```

3. Spin up `frontend` and `nginx`
```
$ DOCKER_BUILDKIT=0 docker compose up -d
```

Note that the `DOCKER_BUILDKIT` environment variable must be false to allow the `frontend` container to connect to the `app` bridge network during build.

4. If migrating from a different cloud provider, copy across the `crafting-room-cms/public/uploads` to the new instance.
