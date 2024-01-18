import { merge } from 'lodash';
import { ApiService, ApiServiceOptions } from '@/lib/classes/api-service';
import { AboutPage, Article, Artist, ArtistsPage, Event, HomePage, StorePage } from '@/lib/types/strapi-data';
import { StrapiResponse, SingleResponse, CollectionResponse, StrapiRequestParams, Item, SingleRequestParams, CollectionRequestParams } from '@/lib/types/strapi';
import { OptionalProps } from '@/lib/types/utils';
import { throwExp } from '@/lib/utils';

/**
 * Options for a Strapi service.
 */
export interface StrapiServiceOptions extends ApiServiceOptions { }

/**
 * A Strapi service.
 *
 * Handles performing requests to the Strapi API.
 */
export class StrapiService extends ApiService<StrapiResponse, StrapiRequestParams> {
	/**
	 * The default options for any Strapi service instance.
	 */
	static override readonly defaultOptions: Required<OptionalProps<StrapiServiceOptions>> =
		merge({}, ApiService.defaultOptions);

	/**
	 * The options set for this Strapi service instance.
	 */
	protected override readonly options: Required<StrapiServiceOptions>;

	/**
	 * A Strapi service.
	 * @param options - Strapi service options
	 */
	constructor(options: StrapiServiceOptions) {
		const _options = merge({}, StrapiService.defaultOptions, options);
		super(_options);
		this.options = _options;
	}

	/**
	 * Retrieve a single item from the Strapi API.
	 * @param endpoint - Target endpoint
	 * @param params - Request parameters
	 * @param options - Fetch request options
	 * @returns Single type
	 * @throws Error if request failed, took too long, or reached max attempts
	 */
	private async getSingle<
		TItem extends Item = Item,
		TResponse extends SingleResponse<TItem> = SingleResponse<TItem>,
		TParams extends SingleRequestParams = SingleRequestParams
	>(endpoint: string, params?: TParams, options?: RequestInit) {
		return (
			await this.get<TResponse, TParams>(endpoint, params, options)
		).data;
	}

	/**
	 * Retrieve a collection of items from the Strapi API.
	 * @param endpoint - Target endpoint
	 * @param params - Request parameters
	 * @param options - Fetch request options
	 * @returns Collection
	 * @throws Error if request failed, took too long, or reached max attempts
	 */
	private async getCollection<
		TItem extends Item = Item,
		TResponse extends CollectionResponse<TItem> = CollectionResponse<TItem>,
		TParams extends CollectionRequestParams = CollectionRequestParams
	>(endpoint: string, params?: TParams, options?: RequestInit) {
		return (
			await this.get<TResponse, TParams>(endpoint, params, options)
		).data;
	}

	/**
	 * Retrieve the first item within a collection of items from the Strapi API.
	 * @param endpoint - Target endpoint
	 * @param params - Request parameters
	 * @param options - Fetch request options
	 * @returns First item within collection
	 * @throws Error if request failed, took too long, or reached max attempts, or if collection is empty
	 */
	private async getCollectionFirstItem<
		TItem extends Item = Item,
		TResponse extends CollectionResponse<TItem> = CollectionResponse<TItem>,
		TParams extends CollectionRequestParams = CollectionRequestParams
	>(endpoint: string, params?: TParams, options?: RequestInit) {
		return (
			await this.get<TResponse, TParams>(endpoint, params, options)
		).data[0] ?? throwExp('No result found');
	}

	async getHomePage() {
		return this.getSingle<HomePage>('homepage');
	}

	async getAboutPage() {
		return this.getSingle<AboutPage>('about-page');
	}

	async getArtistsPage() {
		return this.getSingle<ArtistsPage>('artists-page');
	}

	async getStorePage() {
		return this.getSingle<StorePage>('store-page');
	}

	async getArticles() {
		return this.getCollection<Article>('articles', {
			sort: ['createdAt:desc']
		});
	}

	async getEvents() {
		return this.getCollection<Event>('events', {
			sort: ['date:desc']
		});
	}

	async getArtist(key: { id: string | number; } | { slug: string; }) {
		if ('id' in key)
			return this.getSingle<Artist>(`artists/${key.id}`);
		else if ('slug' in key)
			return this.getCollectionFirstItem<Artist>('artists', {
				filters: { slug: { $eq: key.slug } }
			});
		else
			throw new Error('Unknown key');
	}

	async getEvent(key: { id: string | number; } | { slug: string; }) {
		if ('id' in key)
			return this.getSingle<Event>(`events/${key.id}`);
		else if ('slug' in key)
			return this.getCollectionFirstItem<Event>('events', {
				filters: { slug: { $eq: key.slug } }
			});
		else
			throw new Error('Unknown key');
	}

	async getArticle(key: { id: string | number; } | { slug: string; }) {
		if ('id' in key)
			return this.getSingle<Article>(`articles/${key.id}`);
		else if ('slug' in key)
			return this.getCollectionFirstItem<Article>('articles', {
				filters: { slug: { $eq: key.slug } }
			});
		else
			throw new Error('Unknown key');
	}
}