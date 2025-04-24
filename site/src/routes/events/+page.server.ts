import { content } from '$lib/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const events = await content.events()
    return {
        events
    };
};