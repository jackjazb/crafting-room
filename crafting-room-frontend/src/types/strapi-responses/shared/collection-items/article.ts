import { Image, PublishableItemData, RequiredCollectionItem } from '@/types/strapi';

export type Article = PublishableItemData<{
	title: string;
	slug: string;
	content: string;
	createdAt: string;
	author: string;
	images: RequiredCollectionItem<Image>;
}>;