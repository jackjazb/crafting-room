import markdownit from 'markdown-it';

export function nth(d: number) {
    if (d > 3 && d < 21)
        return 'th';
    switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

/**
 * Parse this content as markdown.
 * @param content - Target content
 * @returns Transformed content.
 */
export const md = markdownit();

/**
 * Shorthand to throw if an item is `undefined`.
 * @param item - Target item
 * @param errorMsg - Target error message
 * @returns item if defined
 * @throws if item is undefined
 */
export const required = <T>(item: T, errorMsg?: string) => {
    if (item === undefined)
        throw new Error(errorMsg ?? 'Missing item is required');

    return item;
};

/**
 * Get the parts of a date using a date string.
 * @returns Date parts
 */
export const getDateParts = (dateStr: string) => {
    const date = new Date(dateStr);
    let day = date.toLocaleString('en-uk', { day: 'numeric' });
    day = day + nth(parseInt(day));
    const weekday = date.toLocaleString('en-uk', { weekday: 'short' });
    const month = date.toLocaleString('en-uk', { month: 'short' });

    return { day, weekday, month };
};