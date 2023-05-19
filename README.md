# Crafting Room Recordings

This repository contains Crafting Room Recordings' updated website and event booking system. The app consists of a CMS, which is an instance of Strapi, and a Next.js frontend.

## Project Setup

On first cloning the project, `npm install` will need to be run from the workspace root. The application can then be started by running the following from the workspace root:

```
$ pnpm cms
```

Then in a separate terminal window:

```
$ pnpm build
$ pnpm start
```

To run the frontend in development mode:

```
$ pnpm dev
```

## Navigating the Frontend Project

The frontend for CRR uses Next.js. The project is structued as follows:
- Routes are in `src/app`
- Components are in `src/components`
- Library and utility code is in `src/lib`

## Deployment 

- Spin up the CMS Docker image first by running `docker compose up -d cms`
- Spin up the frontend by running `docker compose up -d frontend`
- To restart the whole stack, run `docker compose down` then `docker compose up`.
- To rebuild the frontend, run `docker compose up --build -d frontend`