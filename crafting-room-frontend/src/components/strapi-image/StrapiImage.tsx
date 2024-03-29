import Image from 'next/image';
import type { FC } from 'react';
import { media } from '@/lib/server/services';
import type { Image as ImageData, ImageFormatName } from '@/lib/types';

interface Props {
	className?: string;
	/**
	 * The image data.
	 */
	image: ImageData;
	/**
	 * The target image format.
	 *
	 * If the target format does not exist on the image, the next largest format
	 * will be used.
	 */
	format: ImageFormatName | 'source';
	/**
	 * Override or disable the default image fallback color.
	 */
	fallbackColor?: string | false;
	/**
	 * Override the image's default alternate text.
	 */
	alt?: string;
	/**
	 * Whether the image needs to be prioritized.
	 *
	 * This automatically disables lazy loading.
	 * @defaultValue false
	 */
	priority?: boolean;
}

/**
 * A Strapi image wrapped in a Next.js `<Image>` tag.
 */
export const StrapiImage: FC<Props> = props => {
	const format = props.format === 'source'
		? props.image.attributes
		: media.getImageFormat(props.image, props.format);

	const url = media.url(format.url);

	const backgroundColor = props.fallbackColor !== false
		? props.fallbackColor ?? media.fallbackColor ?? undefined
		: undefined;

	return (
		<Image
			className={props.className}
			style={{ backgroundColor }}
			src={url}
			width={format.width}
			height={format.height}
			alt={props?.alt ?? props.image.attributes.alternativeText ?? 'CRR Image'}
			loading={props.priority ? 'eager' : 'lazy'}
			priority={props.priority}
		/>
	);
};
