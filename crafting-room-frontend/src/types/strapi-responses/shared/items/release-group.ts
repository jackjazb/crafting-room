import { Release } from '@/types/strapi-responses/shared/collection-items/release';
import { CollectionItem, ItemData } from '@/types/strapi';

export type ReleaseGroup = ItemData<{
	header: string;
	releases: CollectionItem<Release>;
}>;