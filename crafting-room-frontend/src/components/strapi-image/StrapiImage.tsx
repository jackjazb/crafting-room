import Image from 'next/image';
import { FC } from 'react';
import { strapi } from '@/lib/server/services';
import { Image as IImage, ImageFormatName } from '@/types/strapi';
import { FALLBACK_IMAGE_COLOR } from '@/lib/server/utils';

type StrapiImageProps = {
	className?: string;
	/**
	 * The image data.
	 */
	image: IImage;
	/**
	 * The target image format.
	 *
	 * If the target format does not exist on the image, the next largest format
	 * will be used.
	 */
	format: ImageFormatName;
	/**
	 * Override or disable the default image fallback color.
	 */
	fallbackColor?: string | false;
	/**
	 * Override the image's default alternate text.
	 */
	alt?: string;
	/**
	 * Whether the image needs to be prioritised.
	 *
	 * This automcatically disables lazy loading.
	 * @defaultValue false
	 */
	priority?: boolean;
};

/**
 * A Strapi image wrapped in a Next.js `<Image>` tag.
 */
export const StrapiImage: FC<StrapiImageProps> = props => {
	const format = strapi.imageFormat(props.image, props.format);
	const url = strapi.mediaURL(format.url);
	const backgroundColor = props.fallbackColor !== false
		? props.fallbackColor ?? FALLBACK_IMAGE_COLOR
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