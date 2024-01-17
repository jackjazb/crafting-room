import { Artist } from '@/lib/types/strapi-data/collection-items/artist';
import { Collection, Component } from '@/lib/types/strapi';

export interface ArtistGroup extends Component {
	header: string;
	artists: Collection<Artist>;
}