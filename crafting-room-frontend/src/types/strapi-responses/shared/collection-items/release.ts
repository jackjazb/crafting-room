import { Artist } from '@/types/strapi-responses/shared/collection-items/artist';
import { Image, Item, PublishableItemData } from '@/types/strapi';

export type Release = PublishableItemData<{
	title: string;
	slug: string;
	date: string;
	link: string;
	artist: Item<Artist>;
	artwork: Item<Image>;
}>;