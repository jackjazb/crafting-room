import { ImageData, Item, PublishableItemData } from '@/types/strapi-types';

export type AboutPage = PublishableItemData<{
	header: string;
	content: string;
	contact?: string;
	image: Item<ImageData>;
}>;