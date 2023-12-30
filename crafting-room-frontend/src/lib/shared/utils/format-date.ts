import { ordinalIndicator } from '@/lib/shared/utils';

/**
 * Formats a date string in the following format:
 *
 * `[weekday-name], [day-of-month] [month-name] [year-if-not-current]`
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