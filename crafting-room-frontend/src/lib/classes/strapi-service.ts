import { merge } from 'lodash';
import { ApiService, ApiServiceOptions } from '@/lib/classes/api-service';
import { AboutPage, Article, Artist, ArtistsPage, Event, HomePage, StorePage } from '@/lib/types/strapi-data';
import { StrapiResponse, SingleResponse, CollectionResponse } from '@/lib/types/strapi';
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
export class StrapiService extends ApiService<StrapiResponse> {
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

	async getHomePage() {
		return (
			await this.get<SingleResponse<HomePage>>('homepage')
		).data;
	}

	async getAboutPage() {
		return (
			await this.get<SingleResponse<AboutPage>>('about-page')
		).data;
	}

	async getArtistsPage() {
		return (
			await this.get<SingleResponse<ArtistsPage>>('artists-page')
		).data;
	}

	async getStorePage() {
		return (
			await this.get<SingleResponse<StorePage>>('store-page')
		).data;
	}

	async getArticles() {
		return (
			await this.get<CollectionResponse<Article>>('articles', {
				sort: ['createdAt:desc']
			})
		).data;
	}

	async getEvents() {
		return (
			await this.get<CollectionResponse<Event>>('events', {
				sort: ['date:desc']
			})
		).data;
	}

	async getArtist(key: { id: string; } | { slug: string; }) {
		if ('id' in key)
			return (
				await this.get<SingleResponse<Artist>>(`artists/${key.id}`)
			).data;

		else if ('slug' in key)
			return (
				await this.get<CollectionResponse<Artist>>('artists', {
					filters: { slug: { $eq: key.slug } }
				})
			).data[0] ?? throwExp('No result found');

		else
			throw new Error('Unknown key');
	}

	async getEvent(key: { id: string; } | { slug: string; }) {
		if ('id' in key)
			return (
				await this.get<SingleResponse<Event>>(`events/${key.id}`)
			).data;

		else if ('slug' in key)
			return (
				await this.get<CollectionResponse<Event>>('events', {
					filters: { slug: { $eq: key.slug } }
				})
			).data[0] ?? throwExp('No result found');

		else
			throw new Error('Unknown key');
	}

	async getArticle(key: { id: string; } | { slug: string; }) {
		if ('id' in key)
			return (
				await this.get<SingleResponse<Article>>(`articles/${key.id}`)
			).data;

		else if ('slug' in key)
			return (
				await this.get<CollectionResponse<Article>>('articles', {
					filters: { slug: { $eq: key.slug } }
				})
			).data[0] ?? throwExp('No result found');

		else
			throw new Error('Unknown key');
	}
}