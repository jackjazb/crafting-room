/**
 * Produce a HTML element `className` using the provided individual class names.
 * @param classNames - Target individual class names
 * @returns Complete `className`
 */
export const makeClass = (...classNames: (string | null | undefined)[]) =>
	classNames
		.filter(cls => typeof cls === 'string')
		.join(' ');