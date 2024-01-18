/**
 * A set of Strapi item data
 */
export type Item = Component | UnpublishableItem | PublishableItem;

/**
 * A set of base Strapi item data.
 * @internal
 */
interface BaseItem {
	/** The item's integer ID. */
	id: number;
}

/**
 * A set of Strapi component item data.
 */
export interface Component extends BaseItem { }

/**
 * A set of unpublishable Strapi item data.
 *
 * **Used almost exclusively for media and internal use**. For most cases you'll want `PublishableItem`.
 */
export interface UnpublishableItem<
	TAttributes extends Record<string, unknown> = Record<string, unknown>
> extends BaseItem {
	/** The item's attributes. */
	attributes: TAttributes & {
		createdAt: string;
		updatedAt: string;
	};
}

/**
 * A set of publishable Strapi item data.
 */
export interface PublishableItem<
	TAttributes extends Record<string, unknown> = Record<string, unknown>
> extends UnpublishableItem<TAttributes & {
	publishedAt: string;
}> { }