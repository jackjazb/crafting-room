# Crafting Room Recordings

This repository contains Crafting Room Recordings' updated website and event booking system. The app consists of a CMS, which is an instance of Strapi, and a Next.js frontend.

## Project Setup

On first cloning the project, `npm install` will need to be run from the workspace root. The application can then be started by running the following from the workspace root:

```
$ npm run cms
```

Then in a separate terminal window:

```
$ npm run frontend
```

## Navigating the Frontend Project

The frontend for CRR uses Next.js. The project is structued as follows:
- Routes are in `src/app`
- Components are in `src/components`
- Library and utility code is in `src/lib`

## Deployment Plans

Both packages in this project need to be deployed for it to work correctly. Ideally, these would be on the same server to speed up queries, with the CMS frontend reverse proxied under `admin.craftingroomrecordings.co.uk` or something similar.
