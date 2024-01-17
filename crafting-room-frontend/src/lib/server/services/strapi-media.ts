import { StrapiMediaService, StrapiMediaServiceOptions } from '@/lib/classes/strapi-media-service';
import { throwExp } from '@/lib/utils';

const options: StrapiMediaServiceOptions = {
	mediaProviderHostname: process.env.STRAPI_MEDIA_PROVIDER_HOST
		?? process.env.STRAPI_HOST
		?? throwExp('Environment variable STRAPI_MEDIA_PROVIDER_HOST was missing. This is fine, but the fallback STRAPI_HOST variable was also missing'),
	defaultFallbackColor: 'var(--fallback-image-color)'
};

/**
 * Strapi media service instance on the server.
 */
export const strapiMedia = new StrapiMediaService(options);