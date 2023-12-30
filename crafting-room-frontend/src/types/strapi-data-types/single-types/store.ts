import { ArtistGroup } from '@/types/strapi-data-types/components/artist-group';
import { ReleaseGroup } from '@/types/strapi-data-types/components/release-group';
import { PublishableItemData } from '@/types/strapi-types';

export type StorePage = PublishableItemData<{
	groups: ReleaseGroup[];
	inactive: ArtistGroup;
}>;