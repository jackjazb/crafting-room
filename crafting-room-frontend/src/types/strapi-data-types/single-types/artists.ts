import { ArtistGroup } from '@/types/strapi-data-types/components/artist-group';
import { PublishableItemData } from '@/types/strapi-types';

export type ArtistsPage = PublishableItemData<{
	groups: ArtistGroup[];
	inactive: ArtistGroup;
}>;