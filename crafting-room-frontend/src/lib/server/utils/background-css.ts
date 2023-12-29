import { CSSProperties } from 'react';
import { merge } from 'lodash';
import { ImageData, ImageFormat } from '@/types/strapi-types';
import { strapi } from '@/lib/server/utils';

/** The fallback background image color that appears behind images/while images are loading. */
const fallbackImageColor = 'var(--fallback-image-color)';

/**
 * Generate a `React.CSSProperties` object with the `backgroundColor` property set.
 *
 * If an override fallback color was not provided, unless set to `false`, the default fallback color will be used.
 * @param overrideColor - Target fallback override color
 * @returns `React.CSSProperties` with `backgroundColor` set
 */
export const fallbackBackgroundColorCSS = (overrideColor?: string | false) => ({
	backgroundColor: overrideColor !== false
		? overrideColor ?? fallbackImageColor
		: undefined
} as CSSProperties);

/**
 * Generate a `React.CSSProperties` object with the properties `backgroundImage`
 * (and `backgroundColor` if provided) set.
 *
 * If the provided image was `null` or `undefined`, the fallback image's data will
 * be used.
 *
 * If the target format does not exist on the resolved image, the next largest format
 * will be used.
 *
 * If an override fallback color was not provided, unless set to `false`, the default fallback color will be used.
 * @param image - Target image data
 * @param format - Target image format
 * @param fallbackColor - Target fallback override color
 * @returns `React.CSSProperties` with `backgroundImage` and `backgroundColor` (if not `false`) set
 */
export const backgroundCSS = (
	image: ImageData | null | undefined,
	format?: ImageFormat | null,
	fallbackColor?: string | false
) => {
	const [resolvedImage, resolvedFormat] = format
		? strapi.resolveImageWithFormat(image, format)
		: [strapi.resolveImage(image), null];
	const url = resolvedFormat?.url ?? resolvedImage.attributes.url;

	return merge({},
		{ backgroundImage: `url('${url}')`, test: 1 },
		fallbackBackgroundColorCSS(fallbackColor)) as CSSProperties;
};