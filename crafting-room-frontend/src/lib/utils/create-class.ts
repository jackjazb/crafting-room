/**
 * Produce a HTML className using the provided individual class names.
 * @param classNames - Individual class names
 * @returns Complete `className`
 */
export const createClass = (...classNames: unknown[]) =>
	classNames
		.filter(className => typeof className === 'string')
		.join(' ');