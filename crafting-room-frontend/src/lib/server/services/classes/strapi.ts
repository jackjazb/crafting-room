import type { ApiServiceOptions } from '@/lib/server/services/classes/api';
import { ApiService } from '@/lib/server/services/classes/api';
import type { StrapiResponse, SingleResponse, CollectionResponse, StrapiRequestParams, Item, SingleRequestParams, CollectionRequestParams, RequiredOptions } from '@/lib/types';
import { throwExp } from '@/lib/utils';

/**
 * Options for a Strapi service.
 */
export interface StrapiServiceOptions extends ApiServiceOptions { }

/**
 * Service for handling and performing requests to a Strapi API.
 */
export class StrapiService extends ApiService<StrapiResponse, StrapiRequestParams> {
	static override createOptions(options: StrapiServiceOptions): RequiredOptions<StrapiServiceOptions> {
		return ApiService.createOptions(options);
	}

	protected override readonly options: RequiredOptions<StrapiServiceOptions>;

	/**
	 * Creates a new Strapi service instance.
	 * @param options - Options
	 */
	constructor(options: StrapiServiceOptions) {
		const _options = StrapiService.createOptions(options);
		super(_options);
		this.options = _options;
	}

	/**
	 * Retrieves a single item from the Strapi API.
	 * @param endpoint - Target endpoint
	 * @param params - Request parameters
	 * @param options - Fetch request options
	 * @returns Single type
	 * @throws Error if request failed, took too long, or reached max attempts
	 */
	protected async getSingle<
		TItem extends Item = Item,
		TResponse extends SingleResponse<TItem> = SingleResponse<TItem>,
		TParams extends SingleRequestParams = SingleRequestParams
	>(endpoint: string, params?: TParams, options?: RequestInit) {
		return (
			await this.get<TResponse, TParams>(endpoint, params, options)
		).data;
	}

	/**
	 * Retrieves a collection of items from the Strapi API.
	 * @param endpoint - Target endpoint
	 * @param params - Request parameters
	 * @param options - Fetch request options
	 * @returns Collection
	 * @throws Error if request failed, took too long, or reached max attempts
	 */
	protected async getCollection<
		TItem extends Item = Item,
		TResponse extends CollectionResponse<TItem> = CollectionResponse<TItem>,
		TParams extends CollectionRequestParams = CollectionRequestParams
	>(endpoint: string, params?: TParams, options?: RequestInit) {
		return (
			await this.get<TResponse, TParams>(endpoint, params, options)
		).data;
	}

	/**
	 * Retrieves the first item within a collection of items from the Strapi API.
	 * @param endpoint - Target endpoint
	 * @param params - Request parameters
	 * @param options - Fetch request options
	 * @returns First item within collection
	 * @throws Error if request failed, took too long, or reached max attempts, or if collection is empty
	 */
	protected async getCollectionFirstItem<
		TItem extends Item = Item,
		TResponse extends CollectionResponse<TItem> = CollectionResponse<TItem>,
		TParams extends CollectionRequestParams = CollectionRequestParams
	>(endpoint: string, params?: TParams, options?: RequestInit) {
		return (
			await this.get<TResponse, TParams>(endpoint, params, options)
		).data[0]
			?? throwExp('No result found');
	}
}
