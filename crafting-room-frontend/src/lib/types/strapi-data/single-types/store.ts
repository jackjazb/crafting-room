import type { ArtistGroup, ReleaseGroup, PublishableItem, RepeatedComponent, SingleComponent } from '@/lib/types';

export interface StorePage extends PublishableItem<{
	groups: RepeatedComponent<ReleaseGroup>;
	inactive: SingleComponent<ArtistGroup>;
}> { }
