import { ArtistGroup } from '@/lib/types/strapi-data/components/artist/artist-group';
import { PublishableItem, RepeatedComponent, SingleComponent } from '@/lib/types/strapi';

export interface ArtistsPage extends PublishableItem<{
	groups: RepeatedComponent<ArtistGroup>;
	inactive: SingleComponent<ArtistGroup>;
}> { }