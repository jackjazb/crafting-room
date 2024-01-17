import { CollectionResponse, StrapiResponse } from './response';

/**
 * Request parameters used when querying the Strapi API.
 */
export interface StrapiRequestParams<
	TRes extends StrapiResponse = StrapiResponse
> extends Partial<{
	/** Specify the nested fields that need to be populated. */
	populate: unknown;
	/** Filter the results of a collection. */
	filters: TRes extends CollectionResponse ? Record<string, unknown> : never;
	/** Sort the results of a collecton. */
	sort: TRes extends CollectionResponse ? string[] : never;
}> { }