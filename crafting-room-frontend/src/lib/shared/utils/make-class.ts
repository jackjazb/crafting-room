/**
 * Produce a HTML className using the provided individual class names.
 * @param classNames - Target class names
 * @returns Complete `className`
 */
export const makeClass = (...classNames: (string | null | undefined)[]) =>
	classNames
		.filter(cls => typeof cls === 'string')
		.join(' ');