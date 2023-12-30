import type { ArtistGroup, ReleaseGroup, PublishableItem } from '@/lib/types';

export interface StorePage extends PublishableItem<{
	groups: ReleaseGroup[];
	inactive: ArtistGroup;
}> { }
