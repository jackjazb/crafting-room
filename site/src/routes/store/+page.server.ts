import { content } from '$lib/content';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
    const storePage = await content.storePage()
    return {
        storePage
    };
};