# Crafting Room Recordings

This repository contains Crafting Room Recordings' updated website. The site is based on Strapi, with a React frontend.

# Frontend Project Overview

This project contains the entire React frontend for the site. 
The main entrypoint is `index.tsx` - this file contains the navbar and footer, as well as the site's router.
Components are located in `src/components`, and CSS is located in `src/css`. CSS is mostly page specific, with certain global style
applied in `GlobalStyle.css`. Also used is `skeleton.css`, which is a lightweight CSS library designed to provide a starting point 
for a responsive site.

API queries are all handled by the `api.ts` module in `src/utils` - further info can be found in the Strapi docs.

# Backend Project Overview

The backend project contains an instance of Strapi, a CMS. It's configured with certain data types required by the site.