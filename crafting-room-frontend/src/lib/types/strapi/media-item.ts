import { UnpublishableItem } from './item';

/**
 * A set of Strapi media item data.
 */
export interface MediaItem<
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
 * A set of Strapi image item data.
 *
 * Contains several properties about an image, including it's formats.
 *
 * An image may or may not have larger formats available: it depends on its original size.
 */
export interface Image extends MediaItem<{
	formats: {
		thumbnail?: ImageFormat; //no predetermined width for thumbnails
		small?: ImageFormat<500>;
		medium?: ImageFormat<750>;
		large?: ImageFormat<1000>;
		xlarge?: ImageFormat<1920>;
	};
}> { }

/**
 * A Strapi image size format name.
 */
export type ImageFormatName = keyof Image['attributes']['formats'];

/**
 * A Strapi image size format.
 */
export interface ImageFormat<TWidth extends number = number> {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: TWidth;
	height: number;
	size: number;
	url: string;
}