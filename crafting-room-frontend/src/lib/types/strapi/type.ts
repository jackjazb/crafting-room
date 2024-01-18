import { Item, Component } from './item';

/**
 * A single Strapi component.
 *
 * Contains a single component within.
 */
export type SingleComponent<TItem extends Component = Component> = TItem;

/**
 * A repeated Strapi component.
 *
 * Contains multiple (**zero or more**) components within.
 */
export type RepeatedComponent<TItem extends Component = Component> =
	TItem[];

/**
 * A required repeated Strapi component.
 *
 * Contains multiple (**one or more**) components within.
 */
export type RequiredRepeatedComponent<TItem extends Component = Component> =
	[TItem, ...TItem[]];

/**
 * A Strapi single-type.
 *
 * Contains a single item within.
 */
export interface Single<
	TItem extends Item = Item
> {
	data: TItem;
	meta: {
		[key: string]: unknown;
	};
}

/**
 * A Strapi collection.
 *
 * Contains multiple (**zero or more**) items within.
 */
export interface Collection<TItem extends Item = Item> {
	data: TItem[];
}

/**
 * A required Strapi collection.
 *
 * Contains multiple (**one or more**) items within.
 */
export interface RequiredCollection<TItem extends Item = Item> {
	data: [TItem, ...TItem[]];
}