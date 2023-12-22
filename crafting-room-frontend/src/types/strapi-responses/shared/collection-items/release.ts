import { Artist } from '@/types/strapi-responses/shared/collection-items/artist';
import { ImageData, Item, PublishableItemData } from '@/types/strapi-types';

export type Release = PublishableItemData<{ //TODO -> check if this really is a publishable item. i.e. does it have `publishedAt` prop
	title: string;
	date: string;
	link: string;
	artist: Item<Artist>;
	artwork: Item<ImageData>;
}>;