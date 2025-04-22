import type { Collection, Single } from "./type";
import type { Item } from "./item";

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
export type SingleResponse<T extends Item = Item> = {
    meta: Record<string, unknown>;
} & Single<T>;

/**
 * Response received when querying a collection from the Strapi API.
 */
export type CollectionResponse<T extends Item = Item> = {
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
} & Collection<T>;
