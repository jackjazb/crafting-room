import { Collection, Single } from './type';
import { Item } from './item';

/**
 * A response from the Strapi API.
 *
 * There are two types of responses from the Strapi API (as far as I'm
 * aware) - the 'single type' and the 'collection' response.
 */
export type StrapiResponse = SingleResponse | CollectionResponse;

/**
 * Response received when querying a single item from the Strapi API.
 */
export interface SingleResponse<T extends Item = Item> extends Single<T> {
	meta: Record<string, unknown>;
}

/**
 * Response received when querying a collection from the Strapi API.
 */
export interface CollectionResponse<T extends Item = Item> extends Collection<T> {
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}