/**
 * Returns the ordinal indicator for a number.
 * @param num - Target number
 * @returns ordinal indicator
 */
export const getOrdinalIndicator = (num: number): string => {
	//don't forget about the hundreds!
	if (num % 100 > 3 && num % 100 < 21)
		return 'th';
	switch (num % 10) {
		case 1: return 'st';
		case 2: return 'nd';
		case 3: return 'rd';
		default: return 'th';
	}
};
