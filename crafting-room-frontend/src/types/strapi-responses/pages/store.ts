import { ArtistGroup } from '@/types/strapi-responses/shared/items/artist-group';
import { ReleaseGroup } from '@/types/strapi-responses/shared/items/release-group';
import { PublishableItemData } from '@/types/strapi-types';

export type StorePage = PublishableItemData<{
	groups: ReleaseGroup[];
	inactive: ArtistGroup;
}>;