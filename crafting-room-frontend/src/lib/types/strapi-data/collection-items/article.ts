import { Image, PublishableItem, RequiredCollection } from '@/lib/types/strapi';

export interface Article extends PublishableItem<{
	title: string;
	slug: string;
	content: string;
	createdAt: string;
	author: string;
	images: RequiredCollection<Image>;
}> { }