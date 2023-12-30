/**
 * Creates a HTML className using the provided individual class names.
 * @param classNames - Individual class names
 * @returns Complete `className`
 */
export const makeClass = (...classNames: (string | null | undefined)[]): string =>
	classNames
		.filter(cls => typeof cls === 'string')
		.join(' ');
