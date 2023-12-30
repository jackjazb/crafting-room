import { Collection, StrapiResponse } from './response';

/**
 * Request parameters used when querying the API.
 */
export type StrapiRequestParams<TRes extends StrapiResponse = StrapiResponse> = Partial<{
	/** Specify the nested fields that need to be populated. */
	populate: unknown;
	/** Filter the results of a collection. */
	filters: TRes extends Collection ? Record<string, unknown> : never;
	/** Sort the results of a collecton. */
	sort: TRes extends Collection ? string[] : never;
}>;