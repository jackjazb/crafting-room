import Image from 'next/image';
import { FC } from 'react';
import { strapi } from '@/lib/server/services';
import { ImageData, ImageFormat } from '@/types/strapi';
import { FALLBACK_IMAGE_COLOR } from '@/lib/server/utils';

type StrapiImageProps = {
	className?: string;
	/**
	 * The target image data.
	 *
	 * If the image is null or undefined, the fallback image will be used.
	 */
	image: ImageData | null | undefined;
	/**
	 * The target image format.
	 *
	 * If the target format does not exist on the resolved image, the next largest format
	 * will be used.
	 */
	format: ImageFormat;
	/**
	 * Override or disable the default image fallback color.
	 */
	fallbackColor?: string | false;
	/**
	 * Override the image's provided alt text.
	 */
	alt?: string;
	/**
	 * Whether the image should load eagerly or lazily.
	 * @defaultValue false
	 */
	eager?: boolean;
	/**
	 * Whether the image needs to be prioritised.
	 *
	 * Automatically sets `eager` to `true` (disables lazy-loading).
	 * @defaultValue false
	 */
	priority?: boolean;
};

/**
 * A Strapi image wrapped in a Next.js `<Image>` tag.
 */
export const StrapiImage: FC<StrapiImageProps> = props => {
	const image = strapi.resolveImage(props.image);
	const format = strapi.resolveImageFormat(image, props.format);

	const fallbackColorCSS = {
		backgroundColor: props.fallbackColor !== false
			? props.fallbackColor ?? FALLBACK_IMAGE_COLOR
			: undefined
	};

	return (
		<Image
			className={props.className}
			style={fallbackColorCSS}
			src={format.url}
			width={format.width}
			height={format.height}
			alt={props.alt ?? image.attributes.alternativeText ?? 'CRR Image'}
			loading={props.eager ? 'eager' : undefined}
			priority={props.priority}
		/>
	);
};