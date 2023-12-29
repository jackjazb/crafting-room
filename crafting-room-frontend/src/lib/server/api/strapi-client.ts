import { merge } from 'lodash';
import { HttpClient, HttpClientOptions } from '@/lib/server/api/http-client';
import { AboutPage, Article, Artist, ArtistsPage, Event, HomePage, StorePage } from '@/types/strapi-responses';
import { Collection, ImageData, ImageFormat, ImageFormatData, SingleType, StrapiResponse } from '@/types/strapi-types';
import { OptionalProps } from '@/types/utils';
import { throwExp } from '@/lib/utils';

/**
 * Options for a Strapi API client.
 */
export type StrapiClientOptions = HttpClientOptions & {
	/**
	 * Set the default fallback image with the provided image URL.
	 */
	fallbackImageURL: string;
	/**
	 * The hostname for the media provider. Will be prepended to all Strapi media URLs.
	 * @defaultValue Strapi hostname
	 */
	mediaProviderHostname?: string;
	/**
	 * Whether to always use the fallback image for every image.
	 * @defaultValue false
	 */
	alwaysUseFallbackImage?: boolean;
	/**
	 * Whether to enable or disable caching of images.
	 *
	 * If enabled, a random querystring parameter is appended to the image URL to
	 * prevent the browser from caching it.
	 * @defaultValue false
	 */
	disableImageCaching?: boolean;
};

/**
 * A Strapi API client.
 */
export class StrapiClient extends HttpClient<StrapiResponse> {
	/**
	 * The default options for any instance.
	 */
	static override readonly defaultOptions: Required<OptionalProps<StrapiClientOptions>> = merge(
		HttpClient.defaultOptions,
		{
			mediaProviderHostname: '', //default set in constructor
			alwaysUseFallbackImage: false,
			disableImageCaching: false,
			baseParams: { populate: 'deep' }
		}
	);

	/**
	 * The options set for this instance.
	 */
	protected override readonly options: Required<StrapiClientOptions>;

	/**
	 * @param options - Target Strapi API client options
	 */
	constructor(options: StrapiClientOptions) {
		const resolvedOptions = merge({},
			StrapiClient.defaultOptions,
			{ mediaProviderHostname: options.hostname },
			options);

		super(resolvedOptions);
		this.options = resolvedOptions;
	}

	/**
	 * Resolve and return a Strapi image's data.
	 *
	 * If the provided image was `null` or `undefined`, the fallback image's data will
	 * be returned.
	 *
	 * If `options.alwaysUseFallbackImage` is `true`, then the fallback image will
	 * always be returned.
	 *
	 * **This will fix the image's URL for you!**
	 * @param image - Target image data
	 * @returns Resolved image data
	 */
	resolveImage(image: ImageData | null | undefined) {
		let resolvedImage;

		//if no image, or always using fallback images
		if (!image || this.options.alwaysUseFallbackImage) {
			resolvedImage = this.generateFallbackImage(this.options.fallbackImageURL);

		} else {
			resolvedImage = image;

			//fix all the image urls
			resolvedImage.attributes.url = this.resolveMediaURL(resolvedImage.attributes.url);
			for (const data of Object.values(resolvedImage.attributes.formats))
				data.url = this.resolveMediaURL(data.url);
		}

		//if image caching is disabled, add random parameter to url
		if (this.options.disableImageCaching) {
			const randomParam = `?random=${Math.random()}`;

			//append random parameter to all urls
			resolvedImage.attributes.url += randomParam;
			for (const data of Object.values(resolvedImage.attributes.formats))
				data.url += randomParam;
		}

		return resolvedImage;
	}

	/**
	 * Resolve and return a Strapi image's data with a format.
	 *
	 * If the provided image was `null` or `undefined`, the fallback image's data and format will
	 * be returned.
	 *
	 * If `options.alwaysUseFallbackImage` is `true`, then the fallback image will
	 * always be returned.
	 *
	 * If the target format does not exist on the resolved image, the next largest format
	 * will be returned.
	 *
	 * **This will fix the image's URL for you!**
	 * @param image - Target image data
	 * @param format - Target image format
	 * @returns Array with resolved image data and format
	 */
	resolveImageWithFormat(image: ImageData | null | undefined, format: ImageFormat) {
		const resolvedImage = this.resolveImage(image);

		//if the requested format doesn't exist, find the next largest one
		const resolvedFormat = resolvedImage.attributes.formats[format]
			?? Object.values(resolvedImage.attributes.formats)
				.sort((a, b) => b.width - a.width)[0]!;

		return [resolvedImage, resolvedFormat] as [ImageData, ImageFormatData];
	}

	/**
	 * Resolves a Strapi media item's URL by prepending the media provider's hostname
	 * if necessary.
	 * @param url - Target media URL
	 * @returns Resolved media URL
	 */
	resolveMediaURL(url: string) {
		return url.startsWith('/')
			? this.options.mediaProviderHostname + url
			: url;
	}

	/**
	 * Generate a fallback set of `ImageData` using a URL.
	 * @param url - Target URL
	 * @returns Generated image data
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
		return (await this.get<SingleType<HomePage>>('homepage')).data;
	}

	async getAboutPage() {
		return (await this.get<SingleType<AboutPage>>('about-page')).data;
	}

	async getArtistsPage() {
		return (await this.get<SingleType<ArtistsPage>>('artists-page')).data;
	}

	async getStorePage() {
		return (await this.get<SingleType<StorePage>>('store-page')).data;
	}

	async getArticles() {
		return (await this.get<Collection<Article>>(
			'articles',
			{ sort: ['createdAt:desc'] }
		)).data;
	}

	async getEvents() {
		return (await this.get<Collection<Event>>(
			'events',
			{ sort: ['date:desc'] }
		)).data;
	}

	async getArtist(identifier: { id: string; } | { slug: string; }) {
		if ('id' in identifier)
			return (await this.get<SingleType<Artist>>(`artists/${identifier.id}`)).data;

		else if ('slug' in identifier)
			return (await this.get<Collection<Artist>>(
				'artists',
				{ filters: { slug: { $eq: identifier.slug } } }
			)).data[0] ?? throwExp('Query yielded no results');

		else
			throw new Error('Unknown identifier');
	}

	async getEvent(identifier: { id: string; } | { slug: string; }) {
		if ('id' in identifier)
			return (await this.get<SingleType<Event>>(`events/${identifier.id}`)).data;

		else if ('slug' in identifier)
			return (await this.get<Collection<Event>>(
				'events',
				{ filters: { slug: { $eq: identifier.slug } } }
			)).data[0] ?? throwExp('Query yielded no results');

		else
			throw new Error('Unknown identifier');
	}

	async getArticle(identifier: { id: string; } | { slug: string; }) {
		if ('id' in identifier)
			return (await this.get<SingleType<Article>>(`articles/${identifier.id}`)).data;

		else if ('slug' in identifier)
			return (await this.get<Collection<Article>>(
				'articles',
				{ filters: { slug: { $eq: identifier.slug } } }
			)).data[0] ?? throwExp('Query yielded no results');

		else
			throw new Error('Unknown identifier');
	}
}