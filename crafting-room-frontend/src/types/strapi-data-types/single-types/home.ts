import { Article } from '@/types/strapi-data-types/collections/article';
import { Release } from '@/types/strapi-data-types/collections/release';
import { CollectionItem, PublishableItemData } from '@/types/strapi-types';

export type HomePage = PublishableItemData<{
	features: CollectionItem<Article>;
	releases: CollectionItem<Release>;
}>;