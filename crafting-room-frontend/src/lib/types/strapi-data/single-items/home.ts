import { Article } from '@/lib/types/strapi-data/collection-items/article';
import { Release } from '@/lib/types/strapi-data/collection-items/release';
import { Collection, Item } from '@/lib/types/strapi';

export interface HomePage extends Item<{
	features: Collection<Article>;
	releases: Collection<Release>;
}> { }