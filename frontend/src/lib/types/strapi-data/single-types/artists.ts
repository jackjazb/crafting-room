import type { ArtistGroup, Meta, PublishableItem, RepeatedComponent, SingleComponent } from '@/lib/types';

export interface ArtistsPage extends PublishableItem<{
	meta: Meta;
	groups: RepeatedComponent<ArtistGroup>;
	inactive: SingleComponent<ArtistGroup>;
}> { }
