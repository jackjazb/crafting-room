import type { CMSServiceOptions } from '@/lib/server/services/classes/cms';
import { CMSService } from '@/lib/server/services/classes/cms';
import { throwExp } from '@/lib/utils';

const options: CMSServiceOptions = {
	hostname: process.env.STRAPI_HOST
		? process.env.STRAPI_HOST
		: throwExp('Missing `STRAPI_HOST` environment variable'),
	basePath: '/api',
	baseParams: { populate: 'deep' }
};

if (
	process.env.CACHE_REVALIDATION_INTERVAL
	&& process.env.CACHE_REVALIDATION_INTERVAL !== 'false'
) {
	const interval = parseFloat(process.env.CACHE_REVALIDATION_INTERVAL);
	if (isNaN(interval))
		throw new Error('Environment variable CACHE_REVALIDATION_INTERVAL is not a valid number');

	options.baseParams!.next = { revalidate: interval };
}

/**
 * CMS service instance.
 */
export const cms = new CMSService(options);
