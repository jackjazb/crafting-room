import { content } from '$lib/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({  }) => {
	const homePage = await content.homePage()
    return {
		homePage
	};
};