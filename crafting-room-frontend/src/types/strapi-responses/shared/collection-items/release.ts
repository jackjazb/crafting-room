import { Artist } from '@/types/strapi-responses/shared/collection-items/artist';
import { ImageData, Item, PublishableItemData } from '@/types/strapi';

export type Release = PublishableItemData<{
	title: string;
	slug: string;
	date: string;
	link: string;
	artist: Item<Artist>;
	artwork: Item<ImageData>;
}>;