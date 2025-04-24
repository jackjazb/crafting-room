import { content } from '$lib/content';
import { markdown } from '$lib/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const aboutPage = await content.aboutPage();
    aboutPage.content = await markdown(aboutPage.content);
    if (aboutPage.contact) {
        aboutPage.contact = await markdown(aboutPage.contact);
    }
    return {
        aboutPage
    };
};