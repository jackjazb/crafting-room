import { merge } from 'lodash';
import { CSSProperties } from 'react';
import { OptionalProps } from '@/lib/types/utils';
import { Image, ImageFormatName } from '@/lib/types/strapi';

/**
 * Options for a Strapi media service.
 */
export interface StrapiMediaServiceOptions {
	/**
	 * Hostname for the media provider.
	 *
	 * By default, this will be the same hostname as the Strapi API itself.
	 *
	 * If using an external third-party provider such as Cloudinary, specify that here.
	 */
	mediaProviderHostname: string;
	/**
	 * Default fallback image color.
	 *
	 * The default background color shown behind images while they load in.
	 * @defaultValue null
	 */
	defaultFallbackColor?: string | null;
}

/**
 * A Strapi media service.
 *
 * Handles the formatting and transforming of Strapi media items.
 */
export class StrapiMediaService {
	/**
	 * The default options for any Strapi media service instance.
	 */
	static readonly defaultOptions: Required<OptionalProps<StrapiMediaServiceOptions>> =
		merge({}, {
			defaultFallbackColor: null
		});

	/**
	 * The options set for this Strapi media service instance.
	 */
	private readonly options: Required<StrapiMediaServiceOptions>;

	/**
	 * A Strapi media service.
	 * @param options - Strapi media service options
	 */
	constructor(options: StrapiMediaServiceOptions) {
		this.options = merge({}, StrapiMediaService.defaultOptions, options);
	}

	/**
	 * The default background color shown behind images while they load in.
	 */
	get fallbackImageColor() {
		return this.options.defaultFallbackColor;
	}

	/**
	 * Resolve and return a Strapi media item's URL by prepending the media
	 * provider's hostname if necessary.
	 * @param url - Media URL
	 * @returns Resolved media URL
	 */
	getURL(url: string) {
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
	getImageFormat(image: Image, targetFormat: ImageFormatName) {
		return image.attributes.formats[targetFormat]
			?? Object.values(image.attributes.formats)
				.sort((a, b) => b.width - a.width)[0]!;
	}

	/**
	 * Create and return a React.CSSProperties object with background image and
	 * color set using a Strapi image, a Strapi image format and a fallback color.
	 * @param image - Image data
	 * @param targetFormat - Target image format
	 * @param fallbackColor - Fallback color (override default fallback color, or disable)
	 * @returns React.CSSProperties with background properties set
	 */
	createBackground(
		image: Image,
		targetFormat: ImageFormatName,
		fallbackColor?: string | false
	) {
		const format = this.getImageFormat(image, targetFormat);
		const url = this.getURL(format.url);
		const color = fallbackColor !== false
			? fallbackColor ?? this.options.defaultFallbackColor ?? undefined
			: undefined;

		const props: CSSProperties = {
			backgroundImage: `url('${url}')`,
			backgroundColor: color
		};

		return props;
	}
}