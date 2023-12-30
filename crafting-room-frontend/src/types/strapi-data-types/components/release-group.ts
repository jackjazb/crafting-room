import { Release } from '@/types/strapi-data-types/collections/release';
import { CollectionItem, ItemData } from '@/types/strapi-types';

export type ReleaseGroup = ItemData<{
	header: string;
	releases: CollectionItem<Release>;
}>;