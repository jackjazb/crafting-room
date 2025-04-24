import { content } from '$lib/content';
import { markdown } from '$lib/markdown';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params }) => {
    const event = await content.event(params.slug);
    if (!event) {
        error(404);
    }
    if (event.description) {
        event.description = await markdown(event.description);
    }
    return {
        event
    };
};