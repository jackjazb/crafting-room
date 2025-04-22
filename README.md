# Crafting Room Recordings website

This is Crafting Room Recordings' updated website. It uses a Strapi CMS and a Next.js frontend.

## Project Setup

1. Clone the repository
2. This project uses `pnpm run` - install it using `npm i -g pnpm run`
3. Run `pnpm run install` at the project root

For both the `cms` and `frontend` directories, you'll need to create a `.env` file directly within them using the provided `.env.example` templates. For development purposes you don't need to set the variables marked as required.

Run `pnpm run cms` to launch the CMS, **wait for the CMS to fully start**, and then run `pnpm run frontend` to launch the frontend app in a separate command line.

## Navigating the Frontend Project

The frontend uses Next.js with the app directory. It's structured as follows:

- Routes are in `src/app`
- Components are in `src/components`
- Library and utility code is in `src/lib`

## Creating and Running Production Builds

If you want to generate and run a production build locally on your machine:

1. Ensure that you have all the correct environment variables set with the correct paths
2. Run `deploy.sh` (Linux, MacOS) or `deploy.ps1` (Windows) from the command line

Please note that [pm2](https://pm2.keymetrics.io/) is installed and used when running this script, so you should understand what it does and how to use it beforehand.

## Deployment

The following assumes you are using a Linux server.

Nginx is used as a reverse proxy and to provide TLS.

1. Clone the repository to the deployment machine's home directory
2. Install `certbot` and generate certificates for the desired domains:
    - Run `sudo snap install --classic certbot`
    - Run `sudo ln -s /snap/bin/certbot /usr/bin/certbot`
    - Run `sudo certbot certonly --nginx`
3. Install Nginx:
    - Add `include /root/crafting-room/nginx/default.conf;` to `/etc/nginx/nginx.conf`
    - Run Nginx with `nginx`
4. Deploy the site:
    - Run `deploy.sh`
5. Add the following cron jobs:
    - Out of repo DB backup: `0 0 * * * cp ~/crafting-room/cms/data/data.db ~/backup/$(date +\%Y-\%m-\%d).db`
    - Old backup clearing: `0 0 * * * find ~/backups/ -mtime +30 -delete`
    - Auto-renew certificates: `0 12 * * * /usr/bin/certbot renew --quiet`
