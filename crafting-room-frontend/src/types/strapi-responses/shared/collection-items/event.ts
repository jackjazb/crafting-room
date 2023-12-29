import { Artist } from '@/types/strapi-responses/shared/collection-items/artist';
import { CollectionItem, ImageData, Item, PublishableItemData } from '@/types/strapi-types';

export type Event = PublishableItemData<{
	title: string;
	slug: string;
	date: string;
	venue: string;
	description?: string;
	link?: string;
	image: Item<ImageData>;
	artists?: CollectionItem<Artist>;
}>;