import Image from 'next/image';
import { FC } from 'react';
import { strapi, fallbackBackgroundColorCSS } from '@/lib/server/utils';
import { ImageData, ImageFormat } from '@/types/strapi-types';

type StrapiImageProps = {
	className?: string;
	/**
	 * The target image data.
	 *
	 * If `undefined`, a sequence of fallbacks occurs to return the next
	 * available image format.
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
	const [image, format] = strapi.resolveImageWithFormat(props.image, props.format);

	return (
		<Image
			className={props.className}
			style={fallbackBackgroundColorCSS(props.fallbackColor)}
			src={format.url}
			width={format.width}
			height={format.height}
			alt={props.alt ?? image.attributes.alternativeText ?? 'CRR Image'}
			loading={props.eager ? 'eager' : undefined}
			priority={props.priority}
		/>
	);
};