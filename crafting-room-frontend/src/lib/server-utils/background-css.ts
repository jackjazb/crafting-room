import { CSSProperties } from 'react';
import { ImageData, ImageFormat } from '@/types/strapi-types';
import { strapi } from '@/lib/server-utils';

const defaultFallbackColor = 'var(--fallback-image-color)';

/**
 * Generate a `React.CSSProperties` object with background image and color set using
 * a Strapi image, a Strapi image format and a fallback color.
 * @param image - Target image data
 * @param format - Target image format
 * @param fallbackColor - Target fallback color: leave out to use default, false to disable
 * @returns `React.CSSProperties` with background properties set
 */
export const backgroundImage = (
	image: ImageData | null | undefined,
	format?: ImageFormat | null,
	fallbackColor?: string | false
) => {
	const [resolvedImage, resolvedFormat] = format
		? strapi.resolveImageWithFormat(image, format)
		: [strapi.resolveImage(image), null];

	const url = resolvedFormat?.url ?? resolvedImage.attributes.url;

	return {
		...backgroundImageColor(fallbackColor),
		backgroundImage: `url('${url}')`
	} as CSSProperties;
};

/**
 * Generate a `React.CSSProperties` object with a background color set using a fallback
 * color.
 * @param color - Target fallback color: leave out to use default, false to disable
 * @returns `React.CSSProperties` with background-color set
 */
export const backgroundImageColor = (color?: string | false) => {
	const backgroundColor = color !== false
		? color ?? defaultFallbackColor
		: undefined;

	return { backgroundColor } as CSSProperties;
};