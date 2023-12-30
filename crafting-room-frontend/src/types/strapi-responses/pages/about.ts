import { ImageData, Item, PublishableItemData } from '@/types/strapi';

export type AboutPage = PublishableItemData<{
	header: string;
	content: string;
	contact?: string;
	image: Item<ImageData>;
}>;