import { StandardItemData } from './item-data';

/**
 * Properties for a media item.
 */
export type MediaItem<T extends object = object> = StandardItemData<{
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
} & T>;

/**
 * Properties for an image.
 *
 * Contains several properties about an image, including it's formats.
 *
 * An image may or may not have larger formats available: it depends on its original size.
 */
export type Image = MediaItem<{
	formats: {
		thumbnail?: ImageFormat; //no predetermined width for thumbnails
		small?: ImageFormat<500>;
		medium?: ImageFormat<750>;
		large?: ImageFormat<1000>;
		xlarge?: ImageFormat<1920>;
	};
}>;

/**
 * An image size format name.
 */
export type ImageFormatName = keyof Image['attributes']['formats'];

/**
 * An image size format.
 */
export type ImageFormat<TWidth extends number = number> = {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: TWidth;
	height: number;
	size: number;
	url: string;
};