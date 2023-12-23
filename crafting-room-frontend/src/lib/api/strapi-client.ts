import { merge } from 'lodash';
import { CSSProperties } from 'react';
import { ApiClient, ApiOptions } from '@/lib/api/api-client';
import { required } from '@/lib/utils';
import { AboutPage, Article, Artist, ArtistsPage, Event, HomePage, StorePage } from '@/types/strapi-responses';
import { Collection, ImageData, ImageFormat, ImageFormatData, SingleType, StrapiRequestParams, StrapiResponse } from '@/types/strapi-types';
import { OptionalProps } from '@/types/utils';

/** Options for a Strapi API client. */
type StrapiClientOptions = ApiOptions & {
	/**
	 * The hostname for the media provider. Will be prepended to all Strapi media URLs.
	 * @defaultValue Strapi hostname
	 */
	mediaProviderHostname?: string;
};

/**
 * A Strapi API client.
 */
class StrapiClient extends ApiClient {
	protected static override readonly defaultOptions: Required<OptionalProps<StrapiClientOptions>> = merge(
		ApiClient.defaultOptions,
		{
			mediaProviderHostname: '' //default set in constructor
		}
	);

	protected override readonly options: Required<StrapiClientOptions>;

	/**
	 * Fallback image data.
	 *
	 * Shares the same structure as standard Strapi image data.
	 */
	private readonly fallbackImage: ImageData = {
		id: 1,
		attributes: {
			createdAt: '',
			updatedAt: '',
			name: '',
			alternativeText: 'Placeholder image',
			caption: null,
			width: 128,
			height: 128,
			formats: {
				thumbnail: {
					name: '',
					hash: '',
					ext: '',
					mime: '',
					path: null,
					width: 250,
					height: 256,
					size: 9999,
					url: '/placeholder.webp'
				},
				small: {
					name: '',
					hash: '',
					ext: '',
					mime: '',
					path: null,
					width: 500,
					height: 256,
					size: 9999,
					url: '/placeholder.webp'
				},
				medium: {
					name: '',
					hash: '',
					ext: '',
					mime: '',
					path: null,
					width: 750,
					height: 256,
					size: 9999,
					url: '/placeholder.webp'
				},
				large: {
					name: '',
					hash: '',
					ext: '',
					mime: '',
					path: null,
					width: 1000,
					height: 256,
					size: 9999,
					url: '/placeholder.webp'
				}
			},
			hash: '',
			ext: 'webp',
			mime: '',
			size: '',
			url: '/placeholder.webp',
			previewUrl: null,
			provider: '',
			provider_metadata: null
		}
	};

	constructor(options: StrapiClientOptions) {
		super(options);
		this.options = merge(
			{},
			StrapiClient.defaultOptions,
			{ mediaProviderHostname: options.hostname },
			options
		);
	}

	protected async get<TData extends StrapiResponse>(endpoint: string, params?: StrapiRequestParams<TData>) {
		const res = await this.httpClient.get<TData>(endpoint, { params });
		return res.data;
	}

	/**
	 * Resolve and return a Strapi image's data and format (if provided).
	 *
	 * If image was `null` or `undefined`, the fallback image's data will be returned.
	 *
	 * If `process.env.ALL_FALLBACK_IMAGES` is `true`, then the fallback image will always be returned.
	 *
	 * **This will fix the image's URL for you!**
	 * @param image - Target image data
	 * @param format - Target image format
	 * @returns Array with resolved Strapi image's data and format (if provided)
	 */
	image(image: ImageData | null | undefined): [ImageData, null];
	image(image: ImageData | null | undefined, format: ImageFormat): [ImageData, ImageFormatData];
	image(image: ImageData | null | undefined, format?: ImageFormat) {
		let resolvedImage;

		if (!image || process.env.ALL_FALLBACK_IMAGES) {
			resolvedImage = this.fallbackImage;
		} else {
			resolvedImage = image;

			//fix all the image urls
			resolvedImage.attributes.url = this.mediaURL(resolvedImage.attributes.url);
			for (const data of Object.values(resolvedImage.attributes.formats))
				data.url = this.mediaURL(data.url);
		}

		if (!format)
			return [resolvedImage, null];

		const resolvedFormat = resolvedImage.attributes.formats[format]
			?? resolvedImage.attributes.formats.medium!;

		return [resolvedImage, resolvedFormat];
	}

	/**
	 * Resolve a Strapi image's data and return a `React.CSSProperties` object with
	 * the `backgroundImage` property set.
	 *
	 * If image was `null` or `undefined`, the fallback image's data will be used.
	 *
	 * **This will fix the image's URL for you!**
	 * @param image - Target image data
	 * @param format - Target image format
	 * @returns `React.CSSProperties` with `backgroundImage` set
	 */
	backgroundImageCSS(image: ImageData | null | undefined, format?: ImageFormat | null) {
		const resolvedUrl = !format
			? this.image(image)[0].attributes.url
			: this.image(image, format)[1].url;
		const cssProps: CSSProperties = { backgroundImage: `url('${resolvedUrl}')` };
		return cssProps;
	}

	/**
	 * Resolves a Strapi media item's URL by prepending it the media provider's hostname if necessary.
	 * @param url - Target media URL
	 * @returns Resolved media URL
	 */
	mediaURL(url: string) {
		return url.startsWith('/')
			? this.options.mediaProviderHostname + url
			: url;
	}

	async getHomePage() {
		return this.get<SingleType<HomePage>>('homepage', {
			populate: {
				features: {
					populate: '*'
				},
				releases: {
					populate: '*'
				}
			}
		});
	}

	async getAboutPage() {
		return this.get<SingleType<AboutPage>>('about-page', {
			populate: {
				image: {
					populate: '*'
				}
			}
		});
	}

	async getArtistsPage() {
		return this.get<SingleType<ArtistsPage>>('artists-page', {
			populate: {
				groups: {
					populate: {
						artists: {
							populate: '*'
						}
					}
				},
				inactive: {
					populate: {
						artists: {
							populate: '*'
						}
					}
				}
			}
		});
	}

	async getArtist(name: string) {
		return (await this.get<Collection<Artist>>('artists', {
			filters: {
				name: {
					$eqi: name
				}
			},
			populate: {
				images: {
					populate: '*'
				},
				releases: {
					populate: '*'
				},
				links: {
					populate: '*'
				}
			}
		})).data[0] ?? null;
	}

	async getEvents() {
		return this.get<Collection<Event>>('events', {
			populate: {
				image: {
					populate: '*'
				}
			},
			sort: ['date:desc']
		});
	}

	async getEvent(id: string) {
		return (await this.get<SingleType<Event>>(`events/${id}`, {
			populate: {
				image: {
					populate: '*'
				},
				artists: {
					populate: '*'
				}
			}
		})).data;
	}

	async getArticles() {
		return this.get<Collection<Article>>('articles', {
			populate: {
				images: {
					populate: '*'
				}
			},
			sort: ['createdAt:desc']
		});
	}

	async getArticle(name: string) {
		return (await this.get<Collection<Article>>('articles', {
			filters: {
				title: {
					$eqi: name
				}
			},
			populate: {
				images: {
					populate: '*'
				}
			}
		})).data[0] ?? null;
	}

	async getStorePage() {
		return this.get<SingleType<StorePage>>('store-page', {
			populate: {
				groups: {
					populate: {
						releases: {
							populate: '*'
						}
					}
				}
			}
		});
	}
}

/**
 * Instance of the Strapi API client.
 */
export const strapi = new StrapiClient({
	hostname: required(
		process.env.STRAPI_HOST,
		'Missing `STRAPI_HOST` environment variable'
	),
	baseEndpoint: '/api',
	mediaProviderHostname: required(
		process.env.STRAPI_MEDIA_PROVIDER_HOST,
		'Missing `STRAPI_MEDIA_PROVIDER_HOST` environment variable'
	)
	//params: { populate: "deep" } install `strapi-populate-deep` npm plugin perhaps?
});