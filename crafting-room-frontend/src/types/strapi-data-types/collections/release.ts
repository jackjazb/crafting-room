import { Artist } from '@/types/strapi-data-types/collections/artist';
import { Image, Item, PublishableItemData } from '@/types/strapi-types';

export type Release = PublishableItemData<{
	title: string;
	slug: string;
	date: string;
	link: string;
	artist: Item<Artist>;
	artwork: Item<Image>;
}>;