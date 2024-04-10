/**
 * Strapi item data.
 */
export type Item = Component | UnpublishableItem | PublishableItem;

/**
 * Base Strapi item data.
 * @internal
 */
interface BaseItem {
	/** Item integer ID. */
	id: number;
}

/**
 * Strapi component item data.
 */
export interface Component extends BaseItem { }

/**
 * Unpublishable Strapi item data.
 *
 * **Used almost exclusively for media and internal use**. For most cases you'll want `PublishableItem`.
 */
export interface UnpublishableItem<
	TAttributes extends Record<string, unknown> = Record<string, unknown>
> extends BaseItem {
	/** Item attributes. */
	attributes: TAttributes & {
		createdAt: string;
		updatedAt: string;
	};
}

/**
 * Publishable Strapi item data.
 */
export interface PublishableItem<
	TAttributes extends Record<string, unknown> = Record<string, unknown>
> extends UnpublishableItem<TAttributes & {
	publishedAt: string;
}> { }
