import type { Collection, Single } from './type';
import type { Item } from './item';

/**
 * Response data received from the Strapi API.
 *
 * There are two types of responses from the Strapi API (as far as I'm
 * aware) - the 'single type' and the 'collection' response.
 */
export type ResponseData = SingleResponseData | CollectionResponseData;

/**
 * Response data received when querying a single item from the Strapi API.
 */
export interface SingleResponseData<T extends Item = Item> extends Single<T> {
	meta: Record<string, unknown>;
}

/**
 * Response data received when querying a collection from the Strapi API.
 */
export interface CollectionResponseData<T extends Item = Item> extends Collection<T> {
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}
