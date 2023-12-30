/**
 * A set of item data.
 *
 * Contains an `id` alongside any custom properties.
 *
 * Used **almost exclusively for components**. For most cases you'll want `PublishableItemData`.
 */
export type ItemData<T extends object = object> = {
	id: number;
} & T;

/**
 * A set of standard item data.
 *
 * Extends `BaseItemData` with attributes.
 *
 * This is primarily used for media. For most cases you'll want `PublishableItemData`.
 */
export type StandardItemData<T extends object = object> = ItemData<{
	attributes: {
		createdAt: string;
		updatedAt: string;
	} & T;
}>;

/**
 * A set of publishable item data.
 *
 * Extends `StandardItemData` with the 'publishedAt' property.
 */
export type PublishableItemData<T extends object = object> = StandardItemData<{
	publishedAt: string;
} & T>;