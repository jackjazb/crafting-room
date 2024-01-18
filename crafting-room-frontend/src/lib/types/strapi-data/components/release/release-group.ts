import { Release } from '@/lib/types/strapi-data/collection-items/release';
import { Collection, Component } from '@/lib/types/strapi';

export interface ReleaseGroup extends Component {
	header: string;
	releases: Collection<Release>;
}