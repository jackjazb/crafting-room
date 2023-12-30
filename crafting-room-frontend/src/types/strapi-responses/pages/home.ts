import { Article } from '@/types/strapi-responses/shared/collection-items/article';
import { Release } from '@/types/strapi-responses/shared/collection-items/release';
import { CollectionItem, PublishableItemData } from '@/types/strapi';

export type HomePage = PublishableItemData<{
	features: CollectionItem<Article>;
	releases: CollectionItem<Release>;
}>;