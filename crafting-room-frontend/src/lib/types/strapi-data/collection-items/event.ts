import { Artist } from '@/lib/types/strapi-data/collection-items/artist';
import { Collection, Image, Single, Item } from '@/lib/types/strapi';

export interface Event extends Item<{
	title: string;
	slug: string;
	date: string;
	venue: string;
	description?: string;
	link?: string;
	image: Single<Image>;
	artists?: Collection<Artist>;
}> { }