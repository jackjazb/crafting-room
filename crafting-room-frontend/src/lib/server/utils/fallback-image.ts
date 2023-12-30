import { CSSProperties } from 'react';
import { ImageData, ImageFormat } from '@/types/strapi';
import { strapi } from '@/lib/server/services';

/** CURRENTLY NOT IN USE */
export const FALLBACK_IMAGE_URL = '/placeholder.png';

export const FALLBACK_IMAGE_COLOR = 'var(--fallback-image-color)';

/**
 * Generate a React.CSSProperties object with background image and color set using
 * a Strapi image, a Strapi image format and a fallback color.
 * @param image - Image data
 * @param targetFormat - Target image format
 * @param fallbackColor - Fallback color (override default color, or disable)
 * @returns React.CSSProperties with background properties set
 */
export const backgroundImage = (
	image: ImageData,
	targetFormat: ImageFormat,
	fallbackColor?: string | false
) => {
	const url = strapi.mediaURL(
		strapi.imageFormat(image, targetFormat).url
	);

	const backgroundImage = `url('${url}')`;
	const backgroundColor = fallbackColor !== false
		? fallbackColor ?? FALLBACK_IMAGE_COLOR
		: undefined;

	return { backgroundImage, backgroundColor } as CSSProperties;
};