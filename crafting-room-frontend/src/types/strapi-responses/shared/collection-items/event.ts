import { Artist } from '@/types/strapi-responses/shared/collection-items/artist';
import { CollectionItem, Image, Item, PublishableItemData } from '@/types/strapi';

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