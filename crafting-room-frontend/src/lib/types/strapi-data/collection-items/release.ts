import { Artist } from '@/lib/types/strapi-data/collection-items/artist';
import { Image, Single, Item } from '@/lib/types/strapi';

export interface Release extends Item<{
	title: string;
	slug: string;
	date: string;
	link: string;
	artist: Single<Artist>;
	artwork: Single<Image>;
}> { }