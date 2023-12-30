import { Artist } from '@/types/strapi-data-types/collections/artist';
import { CollectionItem, ItemData } from '@/types/strapi-types';

export type ArtistGroup = ItemData<{
	header: string;
	artists: CollectionItem<Artist>;
}>;