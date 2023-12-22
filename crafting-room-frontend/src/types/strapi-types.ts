// Request types

/**
 * Request parameters used when querying the API.
 */
export type StrapiRequestParams<TResponse extends StrapiResponse> = Partial<{
	/** Specify the nested fields that need to be populated. */
	populate: unknown;
	/** Filter the results of a collection. */
	filters: TResponse extends Collection ? Record<string, unknown> : never;
	/** Sort the results of a collecton. */
	sort: TResponse extends Collection ? string[] : never;
}>;





// Response types

/**
 * A response from the Strapi API.
 *
 * There are two main types of REST API responses from Strapi (as far as I'm
 * aware) - the 'single type' response and the 'collection' response.
 */
export type StrapiResponse = SingleType | Collection;

/**
 * Strapi response received when querying a single type, or a single collection item, using
 * the REST API.
 */
export type SingleType<T extends ItemData = ItemData> = Item<T>; //standard item

/**
 * Strapi response received when querying a collection using the REST API.
 */
export type Collection<T extends ItemData = ItemData> = { //collection item
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
} & CollectionItem<T>;





// Item types

/**
 * A base item. Contains item data within it.
 */
export type Item<T extends ItemData = ItemData> = {
	data: T;
	meta: object;
};

/**
 * A base collection item. Contains item data within it.
 */
export type CollectionItem<T extends ItemData = ItemData> = {
	data: T[];
};





// Item data types

/**
 * Base item data. Only contains an ID alongside any custom properties.
 *
 * Used for repeated components.
 */
export type ItemData<T extends object = object> = {
	id: number;
} & T;

/**
 * Standard item data.
 *
 * Extends `BaseItemData` with attributes.
 */
export type StandardItemData<T extends object = object> = ItemData<{
	attributes: {
		createdAt: string;
		updatedAt: string;
	} & T;
}>;

/**
 * Publishable item data.
 *
 * Extends `StandardItemData` with the `publishedAt` property.
 */
export type PublishableItemData<T extends object = object> = StandardItemData<{
	publishedAt: string;
} & T>;





// Specific/common item data types

/**
 * Properties for a media item.
 */
export type MediaData<T extends object = object> = StandardItemData<{ //standard, not a publishable item
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
export type ImageData = MediaData<{
	formats: {
		thumbnail: ImageFormatData;
		small: ImageFormatData & { width: 500; };
		medium?: ImageFormatData & { width: 750; };
		large?: ImageFormatData & { width: 1000; };
	};
}>;

/**
 * An image size format.
 */
export type ImageFormat = keyof ImageData['attributes']['formats'];

/**
 * An image size format's data.
 */
export type ImageFormatData = {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: number;
	height: number;
	size: number;
	url: string;
};