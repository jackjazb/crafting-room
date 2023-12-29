/**
 * Get the ordinal indicator for a number.
 * @param num - Target number
 * @returns ordinal indicator
 */
export const ordinalIndicator = (num: number) => {
	//dont forget about the hundreds!
	if (num % 100 > 3 && num % 100 < 21)
		return 'th';
	switch (num % 10) {
		case 1: return 'st';
		case 2: return 'nd';
		case 3: return 'rd';
		default: return 'th';
	}
};

/**
 * Shorthand to throw an error as an expression.
 * @param error - Target error message or instance
 */
export const throwExp = (error?: string | Error) => {
	if (error instanceof Error)
		throw error;
	else
		throw new Error(error);
};

/**
 * Formats a date string in the format `[weekday-name], [day-of-month] [month-name] [year-if-not-current]`.
 * @param dateStr - Target date string
 * @returns Formatted date
 */
export const formatDate = (dateStr: string) => {
	const date = new Date(dateStr);
	let dayOfMonth = date.toLocaleString('en-uk', { day: 'numeric' });
	dayOfMonth = dayOfMonth + ordinalIndicator(parseInt(dayOfMonth));
	const weekday = date.toLocaleString('en-uk', { weekday: 'short' });
	const month = date.toLocaleString('en-uk', { month: 'short' });
	const year = date.toLocaleString('en-uk', { year: 'numeric' });

	const currentDate = new Date();
	const showYear = date.getFullYear() !== currentDate.getFullYear();

	return `${weekday}, ${dayOfMonth} ${month}${showYear ? ` ${year}` : ''}`;
};