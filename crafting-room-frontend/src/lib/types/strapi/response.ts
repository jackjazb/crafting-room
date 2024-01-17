import { Collection, Single } from './type';
import { Item } from './item';

/**
 * A response from the Strapi API.
 *
 * There are two main types of REST API responses from Strapi (as far as I'm
 * aware) - the 'single type' response and the 'collection' response.
 */
export type StrapiResponse = SingleResponse | CollectionResponse;

/**
 * Strapi response received when querying a single item from the API.
 */
export interface SingleResponse<
	T extends Item = Item
> extends Single<T> {
	meta: {
		[key: string]: unknown;
	};
}

/**
 * Strapi response received when querying a collection using the REST API.
 */
export interface CollectionResponse<
	T extends Item = Item
> extends Collection<T> {
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}