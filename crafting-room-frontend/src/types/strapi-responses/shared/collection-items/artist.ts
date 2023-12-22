import { Event } from '@/types/strapi-responses/shared/collection-items/event';
import { Release } from '@/types/strapi-responses/shared/collection-items/release';
import { CollectionItem, ImageData, ItemData, PublishableItemData } from '@/types/strapi-types';

export type Artist = PublishableItemData<{ //TODO -> check if this really is a publishable item. i.e. does it have `publishedAt` prop
	name: string;
	bio: string;
	links: SocialLink[];
	images: CollectionItem<ImageData>;
	releases: CollectionItem<Release>;
	events: CollectionItem<Event>;
}>;

export type SocialLink = ItemData<{
	link: string;
	linktype: LinkType;
}>;

export type LinkType = 'spotify' | 'instagram' | 'facebook' | 'twitter' | 'website' | 'linktree';