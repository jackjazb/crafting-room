import type { DeepRequired } from 'ts-essentials';

/**
 * Get only the optional properties from an object.
 */
export type OptionalProps<T> = Pick<T,
	{ [K in keyof T]-?: object extends Pick<T, K> ? K : never }[keyof T]
>;

export type RequiredOptions<T> = DeepRequired<T>;
