import { ArtistGroup } from '@/lib/types/strapi-data/components/artist/artist-group';
import { Item, RepeatedComponent } from '@/lib/types/strapi';

export interface ArtistsPage extends Item<{
	groups: RepeatedComponent<ArtistGroup>;
	inactive: ArtistGroup;
}> { }