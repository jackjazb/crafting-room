import { BaseItem, Component } from './item';

/**
 * A single Strapi component.
 *
 * Contains a single component within it.
 */
export interface SingleComponent extends Component { }

/**
 * A repeated Strapi component.
 *
 * Contains multiple (**zero or more**) component within it.
 */
export type RepeatedComponent<
	TItem extends Component = Component
> = TItem[];

/**
 * A required repeated Strapi component.
 *
 * Contains multiple (**one or more**) component within it.
 */
export type RequiredRepeatedComponent<
	TItem extends Component = Component
> = [TItem, ...TItem[]];

/**
 * A Strapi single-type.
 *
 * Contains a single item within.
 */
export interface Single<
	TItem extends BaseItem = BaseItem
> {
	data: TItem;
	meta: {
		[key: string]: unknown;
	};
}

/**
 * A Strapi collection.
 *
 * Contains multiple (**zero or more**) items within it.
 */
export interface Collection<TItem extends BaseItem = BaseItem> {
	data: TItem[];
}

/**
 * A required Strapi collection.
 *
 * Contains multiple (**one or more**) items within it.
 */
export interface RequiredCollection<TItem extends BaseItem = BaseItem> {
	data: [TItem, ...TItem[]];
}