import type { ArtistGroup, PublishableItem, RepeatedComponent, SingleComponent } from '@/lib/types';

export interface ArtistsPage extends PublishableItem<{
	groups: RepeatedComponent<ArtistGroup>;
	inactive: SingleComponent<ArtistGroup>;
}> { }
