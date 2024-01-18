import { Artist } from '@/lib/types/strapi-data/collection-items/artist';
import { Image, Single, PublishableItem } from '@/lib/types/strapi';

export interface Release extends PublishableItem<{
	title: string;
	slug: string;
	date: string;
	link: string;
	artist: Single<Artist>;
	artwork: Single<Image>;
}> { }