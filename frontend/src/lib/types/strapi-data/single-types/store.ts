import type { ArtistGroup, ReleaseGroup, PublishableItem, RepeatedComponent, SingleComponent, Meta } from '@/lib/types';

export interface StorePage extends PublishableItem<{
	meta: Meta;
	groups: RepeatedComponent<ReleaseGroup>;
	inactive: SingleComponent<ArtistGroup>;
}> { }
