import type { CMSServiceOptions } from '@/lib/server/services/classes/cms';
import { CMSService } from '@/lib/server/services/classes/cms';
import { throwExp } from '@/lib/utils';

const options: CMSServiceOptions = {
	hostname: process.env.STRAPI_HOST
		? process.env.STRAPI_HOST
		: throwExp('Missing \'STRAPI_HOST\' environment variable'),
	basePath: '/api',
	baseParams: { populate: 'deep' }
};

if (
	process.env.SSG_REVALIDATION_INTERVAL
	&& process.env.SSG_REVALIDATION_INTERVAL !== 'false'
) {
	const interval = parseFloat(process.env.SSG_REVALIDATION_INTERVAL);
	if (isNaN(interval))
		throw new Error('\'SSG_REVALIDATION_INTERVAL\' environment variable is not a valid number');

	options.ssgRevalidationInterval = interval;
}

/**
 * CMS service instance.
 */
export const cms = new CMSService(options);
