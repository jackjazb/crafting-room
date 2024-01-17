import { Image, Item, RequiredCollection } from '@/lib/types/strapi';

export interface Article extends Item<{
	title: string;
	slug: string;
	content: string;
	createdAt: string;
	author: string;
	images: RequiredCollection<Image>;
}> { }