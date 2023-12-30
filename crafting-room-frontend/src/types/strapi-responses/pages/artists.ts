import { ArtistGroup } from '@/types/strapi-responses/shared/items/artist-group';
import { PublishableItemData } from '@/types/strapi';

export type ArtistsPage = PublishableItemData<{
	groups: ArtistGroup[];
	inactive: ArtistGroup;
}>;