import { STRAPI_HOST } from '$env/static/private';

export const config = {
    strapiHost: STRAPI_HOST ?? "http://localhost:1337",
};
