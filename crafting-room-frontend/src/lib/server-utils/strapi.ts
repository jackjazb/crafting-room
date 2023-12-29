import { StrapiClient, StrapiClientOptions } from '@/lib/api/strapi-client';
import { throwExp } from '@/lib/utils';

const options: StrapiClientOptions = {
	hostname: process.env.STRAPI_HOST
		? process.env.STRAPI_HOST
		: throwExp('Missing `STRAPI_HOST` environment variable'),

	fallbackImageURL: process.env.FALLBACK_IMAGE_URL
		? process.env.FALLBACK_IMAGE_URL
		: '/fallback.png',

	baseEndpoint: '/api'
};

if (process.env.STRAPI_MEDIA_PROVIDER_HOST)
	options.mediaProviderHostname = process.env.STRAPI_MEDIA_PROVIDER_HOST;

if (process.env.ALWAYS_USE_FALLBACK_IMAGE === 'true')
	options.alwaysUseFallbackImage = true;

if (process.env.DISABLE_IMAGE_CACHING === 'true')
	options.disableImageCaching = true;

if (
	process.env.CACHE_REVALIDATION_INTERVAL
	&& process.env.CACHE_REVALIDATION_INTERVAL !== 'false'
) {
	const interval = parseFloat(process.env.CACHE_REVALIDATION_INTERVAL);
	if (isNaN(interval))
		throw new Error('Environment variable CACHE_REVALIDATION_INTERVAL is not a valid number');

	options.cacheRevalidationInterval = interval;
}

/**
 * Instance of the Strapi API client for use on the server.
 */
export const strapi = new StrapiClient(options);