/**
 * Cuts off a string at the target length, and appends an ellipses if the length
 * of the string was greater than the target length.
 * @param str - Target string
 * @param length - Target length, default 200
 * @returns Cut string
 */
export const cutString = (str: string, length = 200): string =>
	str.substring(0, length) + (str.length > length ? '...' : '');
