import { Image, Single, Item } from '@/lib/types/strapi';

export interface AboutPage extends Item<{
	header: string;
	content: string;
	contact?: string;
	image: Single<Image>;
}> { }