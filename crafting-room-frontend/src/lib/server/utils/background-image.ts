import { CSSProperties } from 'react';
import { ImageData, ImageFormat } from '@/types/strapi';
import { strapi } from '@/lib/server/services';

export const FALLBACK_IMAGE_COLOR = 'var(--fallback-image-color)';

/**
 * Generate a React.CSSProperties object with background image and color set using
 * a Strapi image, a Strapi image format and a fallback color.
 * @param image - Target image data
 * @param format - Target image format
 * @param fallbackColor - Target fallback color (override default color, or disable)
 * @returns React.CSSProperties with background properties set
 */
export const backgroundImage = (
	image: ImageData | null | undefined,
	format: ImageFormat,
	fallbackColor?: string | false
) => {
	const _image = strapi.resolveImage(image);
	const _format = strapi.resolveImageFormat(_image, format);

	const backgroundImage = `url('${_format.url}')`;
	const backgroundColor = fallbackColor !== false
		? fallbackColor ?? FALLBACK_IMAGE_COLOR
		: undefined;

	return { backgroundImage, backgroundColor } as CSSProperties;
};