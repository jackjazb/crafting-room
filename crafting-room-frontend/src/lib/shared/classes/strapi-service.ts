import { merge } from 'lodash';
import { ApiService, ApiServiceOptions } from '@/lib/shared/classes/api-service';
import { AboutPage, Article, Artist, ArtistsPage, Event, HomePage, StorePage } from '@/types/strapi-responses';
import { Collection, ImageData, ImageFormat, SingleType, StrapiResponse } from '@/types/strapi';
import { OptionalProps } from '@/types/utils';
import { throwExp } from '@/lib/shared/utils';

/**
 * Options for a Strapi service.
 */
export type StrapiServiceOptions = ApiServiceOptions & {
	/**
	 * Set the default fallback image with the provided image URL.
	 */
	fallbackImageURL: string;
	/**
	 * The hostname for the media provider. Will be prepended to all Strapi media URLs.
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
	 * @param options - Target Strapi service options
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
	 * Resolve and return a Strapi image.
	 *
	 * This will fix the image's URLs.
	 *
	 * If the image is null or undefined, the fallback image will be returned.
	 * @param image - Target image data
	 * @returns Resolved image data
	 */
	resolveImage(image: ImageData | null | undefined) {
		const resolvedImage = image
			?? this.generateFallbackImage(this.options.fallbackImageURL);

		//fix all the image urls
		if (image) {
			resolvedImage.attributes.url = this.fixMediaURL(resolvedImage.attributes.url);
			for (const data of Object.values(resolvedImage.attributes.formats))
				data.url = this.fixMediaURL(data.url);
		}

		return resolvedImage;
	}

	/**
	 * Resolve and return a Strapi image's format.
	 *
	 * If the target format does not exist on the image, the next largest format will
	 * be returned.
	 * @param image - Target image data
	 * @param format - Target image format
	 * @returns Resolved image format
	 */
	resolveImageFormat(image: ImageData, format: ImageFormat) {
		return image.attributes.formats[format]
			?? Object.values(image.attributes.formats)
				.sort((a, b) => b.width - a.width)[0]!;
	}

	/**
	 * Resolves a Strapi media item's URL by prepending the media provider's hostname
	 * if necessary.
	 * @param url - Target media URL
	 * @returns Resolved media URL
	 */
	fixMediaURL(url: string) {
		return url.startsWith('/')
			? this.options.mediaProviderHostname + url
			: url;
	}

	/**
	 * Generate a fallback Strapi image using a URL.
	 * @param url - Target URL
	 * @returns Generated fallback image
	 */
	private generateFallbackImage(url: string) {
		const generateFormat = (width: number, height: number) => ({
			name: '',
			hash: '',
			ext: '',
			mime: '',
			path: null,
			width,
			height,
			size: 0,
			url
		});

		return {
			id: 1,
			attributes: {
				createdAt: '',
				updatedAt: '',
				name: '',
				alternativeText: 'Missing image',
				caption: null,
				width: 128,
				height: 128,
				formats: {
					thumbnail: generateFormat(32, 18),
					xsmall: generateFormat(64, 36),
					small: generateFormat(500, 281),
					medium: generateFormat(750, 422),
					large: generateFormat(1000, 563),
					xlarge: generateFormat(1920, 1080)
				},
				hash: '',
				ext: 'webp',
				mime: '',
				size: '',
				url,
				previewUrl: null,
				provider: '',
				provider_metadata: null
			}
		} as ImageData;
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