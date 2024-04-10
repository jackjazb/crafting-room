import type { UnpublishableItem } from './item';

/**
 * Strapi asset data.
 */
export interface Asset<
	TAttributes extends Record<string, unknown> = Record<string, unknown>
> extends UnpublishableItem<TAttributes & {
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: object | null;
	hash: string;
	ext: string;
	mime: string;
	size: string;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: string | null;
}> { }

/**
 * A Strapi image size format name.
 */
export type ImageFormatName =
	'thumbnail' |
	'small' | //500
	'medium' | //750
	'large' | //1000
	'xlarge'; //1500 -> not builtin, defined in cms/config/plugins.ts

/**
 * A set of Strapi image data.
 *
 * Contains several properties about an image, including it's formats.
 *
 * An image may or may not have larger formats available: it depends on its original size.
 */
export interface Image extends Asset<{
	formats: Partial<Record<ImageFormatName, ImageFormat>>;
}> { }

/**
 * A Strapi image size format.
 */
export interface ImageFormat {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: number;
	height: number;
	size: number;
	url: string;
}
