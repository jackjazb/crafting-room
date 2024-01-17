import { ArtistGroup } from '@/lib/types/strapi-data/components/artist/artist-group';
import { ReleaseGroup } from '@/lib/types/strapi-data/components/release/release-group';
import { Item, RepeatedComponent } from '@/lib/types/strapi';

export interface StorePage extends Item<{
	groups: RepeatedComponent<ReleaseGroup>;
	inactive: ArtistGroup;
}> { }