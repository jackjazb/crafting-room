import NextImage from 'next/image';
import { CSSProperties, FC } from 'react';
import { strapiMedia } from '@/lib/server/services';
import { Image, ImageFormatName } from '@/lib/types/strapi';

interface Props {
	className?: string;
	/**
	 * The image data.
	 */
	image: Image;
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
}

/**
 * A Strapi image wrapped in a Next.js `<Image>` tag.
 */
export const StrapiImage: FC<Props> = props => {
	const format = strapiMedia.getImageFormat(props.image, props.format);
	const url = strapiMedia.getURL(format.url);
	const style: CSSProperties = {
		backgroundColor: props.fallbackColor !== false
			? props.fallbackColor ?? strapiMedia.fallbackImageColor ?? undefined
			: undefined
	};

	return (
		<NextImage
			className={props.className}
			style={style}
			src={url}
			width={format.width}
			height={format.height}
			alt={props?.alt ?? props.image.attributes.alternativeText ?? 'CRR Image'}
			loading={props.priority ? 'eager' : 'lazy'}
			priority={props.priority}
		/>
	);
};