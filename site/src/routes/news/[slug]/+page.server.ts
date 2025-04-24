import { content } from '$lib/content';
import { markdown } from '$lib/markdown';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const article = await content.article(params.slug);
    if (!article) {
        error(404);
    }
    article.content = await markdown(article.content);
    return {
        article
    };
};