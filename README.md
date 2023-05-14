# Crafting Room Recordings

This repository contains Crafting Room Recordings' updated website. The site is based on Strapi, with a React frontend.

## Project Setup

This project requires `yarn` to run. On first cloning the project,
`yarn install` will need to be run from the workspace root. The application can then be started by running the following from the workspace root:

```
$ yarn start-backend
```

Then in a separate terminal window:

```
$ yarn start-frontend
```

## Frontend Overview

This project contains the entire React frontend for the site. 
The main entrypoint is `index.tsx` - this file contains the navbar and footer, as well as the site's router.

API queries are all handled by the `api.ts` module in `src/utils` - further info can be found in the Strapi docs.

## Backend Overview

The backend project contains an instance of Strapi, a headless CMS. It's configured with certain data types required by the frontend.
