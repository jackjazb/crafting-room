/**
 * Capitalizes the first character of a string.
 * @param str - Target string
 * @returns Capitalized string
 */
export const capitalize = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1);
