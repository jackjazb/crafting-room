import { StrapiService, StrapiServiceOptions } from '@/lib/shared/classes/strapi-service';
import { throwExp } from '@/lib/shared/utils';

const options: StrapiServiceOptions = {
	hostname: process.env.STRAPI_HOST
		? process.env.STRAPI_HOST
		: throwExp('Missing `STRAPI_HOST` environment variable'),
	baseEndpoint: '/api'
};

if (process.env.STRAPI_MEDIA_PROVIDER_HOST)
	options.mediaProviderHostname = process.env.STRAPI_MEDIA_PROVIDER_HOST;

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
 * Strapi service instance on the server.
 */
export const strapi = new StrapiService(options);