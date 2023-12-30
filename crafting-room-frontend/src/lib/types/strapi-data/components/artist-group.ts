import type { Artist, Collection, Component } from '@/lib/types';

export interface ArtistGroup extends Component {
	header: string;
	artists: Collection<Artist>;
}
