import type { Image, ImageFormat, ImageFormatName } from '@/lib/types';
import merge from 'deepmerge';
import type { CSSProperties } from 'react';

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
     * Default fallback media color.
     *
     * The default background color shown behind media while it loads in.
     * @defaultValue
     * ```typescript
     *	null
     * ```
     */
    defaultFallbackColor?: string | null;
}

/**
 * A service for handling the formatting and transforming of Strapi
 * media items.
 */
export class StrapiMediaService {
    static createOptions(options: StrapiMediaServiceOptions): Required<StrapiMediaServiceOptions> {
        return merge(
            {
                defaultFallbackColor: null
            },
            options
        );
    }

    private readonly options: Required<StrapiMediaServiceOptions>;

    /**
     * Creates a new Strapi media service instance.
     * @param options - Options
     */
    constructor(options: StrapiMediaServiceOptions) {
        this.options = StrapiMediaService.createOptions(options);
    }

    /**
     * Returns the default background color shown behind media while it
     * loads in.
     */
    get fallbackColor(): string | null {
        return this.options.defaultFallbackColor;
    }

    /**
     * Resolves and returns a Strapi media item's URL.
     *
     * Prepends the Strapi media provider's hostname if necessary.
     * @param url - Media URL
     * @returns Resolved media URL
     */
    url(url: string): string {
        return url.startsWith('/')
            ? this.options.mediaProviderHostname + url
            : url;
    }

    /**
     * Resolves and returns a Strapi image's format.
     *
     * If the target format does not exist on the image, the next largest format will
     * be returned.
     * @param image - Image data
     * @param targetFormat - Target image format
     * @returns Resolved image format
     */
    getImageFormat(image: Image, targetFormat: ImageFormatName): ImageFormat {
        return image.attributes.formats[targetFormat]
            ?? Object.values(image.attributes.formats)
                .sort((a, b) => b.width - a.width)[0]!;
    }

    /**
     * Creates and returns a React.CSSProperties object with background image and
     * color set using a Strapi image, a Strapi image format and a fallback color.
     * @param image - Image data
     * @param targetFormat - Target image format
     * @param fallbackColor - Fallback color (override default fallback color, or disable)
     * @returns React.CSSProperties with background properties set
     */
    createBackground(
        image: Image,
        targetFormat: ImageFormatName | 'source',
        fallbackColor?: string | false
    ): CSSProperties {
        const format = targetFormat === 'source'
            ? image.attributes
            : this.getImageFormat(image, targetFormat);

        const url = this.url(format.url);

        const color = fallbackColor !== false
            ? fallbackColor ?? this.options.defaultFallbackColor ?? undefined
            : undefined;

        return {
            backgroundImage: `url('${url}')`,
            backgroundColor: color
        };
    }
}
