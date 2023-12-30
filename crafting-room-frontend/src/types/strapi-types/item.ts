import { ItemData } from './item-data';

/**
 * A Strapi item.
 *
 * Contains a single item's data within it.
 */
export type Item<T extends ItemData = ItemData> = {
	data: T;
	meta: object;
};

/**
 * A Strapi collection item.
 *
 * Contains multiple (**zero or more**) items' data within it.
 */
export type CollectionItem<T extends ItemData = ItemData> = {
	data: T[];
};

/**
 * A required Strapi collection item.
 *
 * Contains multiple (**one or more**) items' data within it.
 */
export type RequiredCollectionItem<T extends ItemData = ItemData> = {
	data: [T, ...T[]];
};