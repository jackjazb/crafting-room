import { Artist } from '@/types/strapi-data-types/collections/artist';
import { CollectionItem, Image, Item, PublishableItemData } from '@/types/strapi-types';

export type Event = PublishableItemData<{
	title: string;
	slug: string;
	date: string;
	venue: string;
	description?: string;
	link?: string;
	image: Item<Image>;
	artists?: CollectionItem<Artist>;
}>;