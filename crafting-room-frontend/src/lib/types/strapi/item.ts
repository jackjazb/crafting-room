/**
 * A set of base Strapi item data.
 *
 * **Used for internal use**. For most cases you'll want `Item`.
 * @internal
 */
export interface BaseItem {
	id: number;
}

/**
 * A set of Strapi component item data.
 */
export interface Component extends BaseItem { }

/**
 * A set of unpublishable Strapi item data.
 *
 * **Used almost exclusively for internal use**. For most cases you'll want `Item`.
 */
export interface UnpublishableItem<
	TAttributes extends Record<string, unknown> = Record<string, unknown>
> extends BaseItem {
	attributes: TAttributes & {
		createdAt: string;
		updatedAt: string;
	};
}

/**
 * A set of Strapi item data.
 */
export interface Item<
	TAttributes extends Record<string, unknown> = Record<string, unknown>
> extends UnpublishableItem<TAttributes & {
	publishedAt: string;
}> { }