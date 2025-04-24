import { content } from '$lib/content';
import { markdown } from '$lib/markdown';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const artist = await content.artist(params.slug);
    if (!artist) {
        error(404);
    }
    artist.bio = await markdown(artist.bio);
    return {
        artist
    };
};