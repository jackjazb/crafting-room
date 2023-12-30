import { CollectionItem, Item } from './item';
import { ItemData } from './item-data';

/**
 * A response from the Strapi API.
 *
 * There are two main types of REST API responses from Strapi (as far as I'm
 * aware) - the 'single type' response and the 'collection' response.
 */
export type StrapiResponse = SingleType | Collection;

/**
 * Strapi response received when querying a single type, or a single collection
 * item, using the REST API.
 */
export type SingleType<T extends ItemData = ItemData> = Item<T>;

/**
 * Strapi response received when querying a collection using the REST API.
 */
export type Collection<T extends ItemData = ItemData> = { //collection item
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
} & CollectionItem<T>;