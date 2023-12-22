import Image from 'next/image';
import { FC } from 'react';
import { strapi } from '@/lib/api/strapi-client';
import { ImageData, ImageFormat } from '@/types/strapi-types';

type StrapiImageProps = {
	className?: string;
	/**
	 * The target image data.
	 *
	 * If `undefined`, a sequence of fallbacks occurs to return the next
	 * available image format.
	 */
	image: ImageData | undefined;
	/** The target image format. */
	format: ImageFormat;
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
export const StrapiImage: FC<StrapiImageProps> = ({ className, image, format, alt, lazy, priority }) => {
	const resolvedImage = strapi.image(image);
	const resolvedImageFormat = strapi.imageFormat(format, image);

	return (
		<Image
			className={className}
			src={resolvedImageFormat.url}
			width={resolvedImageFormat.width}
			height={resolvedImageFormat.height}
			alt={alt ?? resolvedImage.attributes.alternativeText ?? 'CRR Image'}
			loading={lazy ? 'lazy' : undefined}
			priority={priority}
		/>
	);
};