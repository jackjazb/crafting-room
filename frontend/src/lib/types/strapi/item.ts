/**
 * A set of Strapi item data
 */
export type Item = Component | UnpublishableItem | PublishableItem;

/**
 * A set of base Strapi item data.
 * @internal
 */
type BaseItem = {
    /** Item integer ID. */
    id: number;
};

/**
 * A set of Strapi component item data.
 */
export type Component = { } & BaseItem;

/**
 * A set of unpublishable Strapi item data.
 *
 * **Used almost exclusively for media and internal use**. For most cases you'll want `PublishableItem`.
 */
export type UnpublishableItem<
    TAttributes extends Record<string, unknown> = Record<string, unknown>,
> = {
    /** Item attributes. */
    attributes: TAttributes & {
        createdAt: string;
        updatedAt: string;
    };
} & BaseItem;

/**
 * A set of publishable Strapi item data.
 */
export type PublishableItem<
    TAttributes extends Record<string, unknown> = Record<string, unknown>,
> = { } & UnpublishableItem<TAttributes & {
    publishedAt: string;
}>;
