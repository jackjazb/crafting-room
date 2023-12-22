import { CollectionItem, ImageData, PublishableItemData } from '@/types/strapi-types';

export type Article = PublishableItemData<{ //TODO -> check if this really is a publishable item. i.e. does it have `publishedAt` prop
	title: string;
	content: string;
	createdAt: string;
	author?: string; //TODO -> this was not optional previously, but it seems to be optional on current strapi setup
	images: CollectionItem<ImageData>;
}>;