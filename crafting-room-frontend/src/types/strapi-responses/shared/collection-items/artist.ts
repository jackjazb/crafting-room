import { Event } from '@/types/strapi-responses/shared/collection-items/event';
import { Release } from '@/types/strapi-responses/shared/collection-items/release';
import { CollectionItem, Image, ItemData, PublishableItemData, RequiredCollectionItem } from '@/types/strapi';

export type Artist = PublishableItemData<{
	name: string;
	slug: string;
	bio: string;
	links: SocialLink[];
	images: RequiredCollectionItem<Image>;
	releases: CollectionItem<Release>;
	events: CollectionItem<Event>;
}>;

export type SocialLink = ItemData<{
	link: string;
	linktype: LinkType;
}>;

export type LinkType = 'spotify' | 'instagram' | 'facebook' | 'twitter' | 'website' | 'linktree';