import { merge } from 'lodash';
import { ApiService, ApiServiceOptions } from '@/lib/shared/classes/api-service';
import { AboutPage, Article, Artist, ArtistsPage, Event, HomePage, StorePage } from '@/types/strapi-responses';
import { Collection, Image, ImageFormatName, SingleType, StrapiResponse } from '@/types/strapi';
import { OptionalProps } from '@/types/utils';
import { throwExp } from '@/lib/shared/utils';

/**
 * Options for a Strapi service.
 */
export type StrapiServiceOptions = ApiServiceOptions & {
	/**
	 * Hostname for the media provider.
	 *
	 * Will be prepended to all Strapi media URLs.
	 * @defaultValue Strapi hostname
	 */
	mediaProviderHostname?: string;
};

/**
 * A Strapi service.
 */
export class StrapiService extends ApiService<StrapiResponse> {
	static override readonly defaultOptions: Required<OptionalProps<StrapiServiceOptions>> =
		merge({}, ApiService.defaultOptions, {
			mediaProviderHostname: '', //default set in constructor
			baseParams: { populate: 'deep' }
		});

	protected override readonly options: Required<StrapiServiceOptions>;

	/**
	 * A Strapi service.
	 * @param options - Strapi service options
	 */
	constructor(options: StrapiServiceOptions) {
		const _options =
			merge({}, StrapiService.defaultOptions, {
				mediaProviderHostname: options.hostname
			}, options);

		super(_options);
		this.options = _options;
	}

	/**
	 * Resolve and return a Strapi media item's URL by prepending the media
	 * provider's hostname if necessary.
	 * @param url - Media URL
	 * @returns Resolved media URL
	 */
	mediaURL(url: string) {
		return url.startsWith('/')
			? this.options.mediaProviderHostname + url
			: url;
	}

	/**
	 * Resolve and return a Strapi image's format.
	 *
	 * If the target format does not exist on the image, the next largest format will
	 * be returned.
	 * @param image - Image data
	 * @param targetFormat - Target image format
	 * @returns Resolved image format
	 */
	imageFormat(image: Image, targetFormat: ImageFormatName) {
		return image.attributes.formats[targetFormat]
			?? Object.values(image.attributes.formats)
				.sort((a, b) => b.width - a.width)[0]!;
	}

	async getHomePage() {
		return (
			await this.get<SingleType<HomePage>>('homepage')
		).data;
	}

	async getAboutPage() {
		return (
			await this.get<SingleType<AboutPage>>('about-page')
		).data;
	}

	async getArtistsPage() {
		return (
			await this.get<SingleType<ArtistsPage>>('artists-page')
		).data;
	}

	async getStorePage() {
		return (
			await this.get<SingleType<StorePage>>('store-page')
		).data;
	}

	async getArticles() {
		return (
			await this.get<Collection<Article>>('articles', {
				sort: ['createdAt:desc']
			})
		).data;
	}

	async getEvents() {
		return (
			await this.get<Collection<Event>>('events', {
				sort: ['date:desc']
			})
		).data;
	}

	async getArtist(key: { id: string; } | { slug: string; }) {
		if ('id' in key)
			return (
				await this.get<SingleType<Artist>>(`artists/${key.id}`)
			).data;

		else if ('slug' in key)
			return (
				await this.get<Collection<Artist>>('artists', {
					filters: { slug: { $eq: key.slug } }
				})
			).data[0] ?? throwExp('No result found');

		else
			throw new Error('Unknown key');
	}

	async getEvent(key: { id: string; } | { slug: string; }) {
		if ('id' in key)
			return (
				await this.get<SingleType<Event>>(`events/${key.id}`)
			).data;

		else if ('slug' in key)
			return (
				await this.get<Collection<Event>>('events', {
					filters: { slug: { $eq: key.slug } }
				})
			).data[0] ?? throwExp('No result found');

		else
			throw new Error('Unknown key');
	}

	async getArticle(key: { id: string; } | { slug: string; }) {
		if ('id' in key)
			return (
				await this.get<SingleType<Article>>(`articles/${key.id}`)
			).data;

		else if ('slug' in key)
			return (
				await this.get<Collection<Article>>('articles', {
					filters: { slug: { $eq: key.slug } }
				})
			).data[0] ?? throwExp('No result found');

		else
			throw new Error('Unknown key');
	}
}