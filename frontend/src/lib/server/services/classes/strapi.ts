import type { ApiServiceOptions } from '@/lib/server/services/classes/api';
import { ApiService } from '@/lib/server/services/classes/api';
import type { ResponseData, SingleResponseData, CollectionResponseData, RequestParams, SingleRequestParams, CollectionRequestParams, Item, RequiredOptions } from '@/lib/types';
import { throwExp } from '@/lib/utils';

/**
 * Options for a Strapi service.
 */
export interface StrapiServiceOptions extends ApiServiceOptions { }

/**
 * Service for handling and performing requests to a Strapi API.
 */
export class StrapiService extends ApiService<ResponseData, RequestParams> {
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
		TParams extends SingleRequestParams = SingleRequestParams,
		TResponseData extends SingleResponseData<TItem> = SingleResponseData<TItem>
	>(endpoint: string, params?: TParams, options?: RequestInit) {
		return (
			await this.get<TParams, TResponseData>(endpoint, params, options)
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
		TParams extends CollectionRequestParams = CollectionRequestParams,
		TResponseData extends CollectionResponseData<TItem> = CollectionResponseData<TItem>
	>(endpoint: string, params?: TParams, options?: RequestInit) {
		return (
			await this.get<TParams, TResponseData>(endpoint, params, options)
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
		TParams extends CollectionRequestParams = CollectionRequestParams,
		TResponseData extends CollectionResponseData<TItem> = CollectionResponseData<TItem>
	>(endpoint: string, params?: TParams, options?: RequestInit) {
		return (
			await this.get<TParams, TResponseData>(endpoint, params, options)
		).data[0]
			?? throwExp('No result found');
	}
}
