/**
 * Request parameters used when querying the Strapi API.
 */
export type StrapiRequestParams = SingleRequestParams | CollectionRequestParams;

/**
 * Base request parameters used when querying the Strapi API.
 * @internal
 */
interface BaseRequestParams {
	/** Specify the nested fields that need to be populated. */
	populate?: unknown;
}

/**
 * Request parameters used when querying a single type from the Strapi API.
 */
export interface SingleRequestParams extends BaseRequestParams { }

/**
 * Request parameters used when querying a collection from the Strapi API.
 */
export interface CollectionRequestParams extends BaseRequestParams {
	/** Filter the results of a collection. */
	filters?: Record<string, unknown>;
	/** Sort the results of a collection. */
	sort?: string[];
}