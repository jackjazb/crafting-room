import { content } from '$lib/content';
import type { PageServerLoad } from './[slug]/$types';

export const load: PageServerLoad = async () => {
    const articles = await content.articles()
    return {
        articles
    };
};