import { Artist } from '@/types/strapi-responses/shared/collection-items/artist';
import { CollectionItem } from '@/types/strapi';

export type ArtistGroup = {
	id: number;
	header: string;
	artists: CollectionItem<Artist>;
};