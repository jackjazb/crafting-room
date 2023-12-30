import type { ArtistGroup, PublishableItem } from '@/lib/types';

export interface ArtistsPage extends PublishableItem<{
	groups: ArtistGroup[];
	inactive: ArtistGroup;
}> { }
