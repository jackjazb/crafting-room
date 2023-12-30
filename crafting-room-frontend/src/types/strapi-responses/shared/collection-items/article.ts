import { CollectionItem, ImageData, PublishableItemData } from '@/types/strapi';

export type Article = PublishableItemData<{
	title: string;
	slug: string;
	content: string;
	createdAt: string;
	author: string;
	images: CollectionItem<ImageData>;
}>;