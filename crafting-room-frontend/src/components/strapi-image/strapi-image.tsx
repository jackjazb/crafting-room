import Image from 'next/image';
import { FC } from 'react';
import { strapi } from '@/lib/api/strapi-client';
import { ImageData, ImageFormat } from '@/types/strapi-types';
import { fallbackBackgroundColorCSS } from '@/lib/utils';

type StrapiImageProps = {
	className?: string;
	/**
	 * The target image data.
	 *
	 * If `undefined`, a sequence of fallbacks occurs to return the next
	 * available image format.
	 */
	image: ImageData | null | undefined;
	/** The target image format. */
	format: ImageFormat;
	/** Override or disable the default image fallback color. */
	fallbackColor?: string | false;
	/** Override the image's provided alt text. */
	alt?: string;
	/** Whether the image should lazy-load or not. */
	lazy?: boolean;
	/** Set to true if above the fold. */
	priority?: boolean;
};

/**
 * A Strapi image wrapped in a Next.js `<Image>` tag.
 */
export const StrapiImage: FC<StrapiImageProps> = props => {
	const [resolvedImage, resolvedFormat] = strapi.image(props.image, props.format);

	return (
		<Image
			className={props.className}
			style={fallbackBackgroundColorCSS(props.fallbackColor)}
			src={resolvedFormat.url}
			width={resolvedFormat.width}
			height={resolvedFormat.height}
			alt={props.alt ?? resolvedImage.attributes.alternativeText ?? 'CRR Image'}
			loading={props.lazy ? 'lazy' : undefined}
			priority={props.priority}
		/>
	);
};