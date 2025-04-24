export type IconType = "more" | "open" | "left" | "right";

type DateFormat =
    "abbreviated" |
    "full" |
    "numeric";

/**
 * Formats a date string into the specified format.
 * @param dateStr - Date string
 * @returns Formatted date
 */

export function formatDate(dateStr: string, format: DateFormat): string {
    const date = new Date(dateStr);
    const currentDate = new Date();
    const isCurrentYear = date.getFullYear() !== currentDate.getFullYear();

    const part = (formatOptions: Intl.DateTimeFormatOptions) => date.toLocaleString("en-uk", formatOptions);

    switch (format) {
        case "abbreviated": {
            const weekday = part({ weekday: "short" });
            const day = part({ day: "numeric" });
            const ordinal = getOrdinalIndicator(parseInt(day));
            const month = part({ month: "short" });
            const year = part({ year: "numeric" });

            return `${weekday} ${day}${ordinal} ${month}${isCurrentYear ? ` ${year}` : ""}`;
        }
        case "full": {
            const weekday = part({ weekday: "long" });
            const day = part({ day: "numeric" });
            const ordinal = getOrdinalIndicator(parseInt(day));
            const month = part({ month: "long" });
            const year = part({ year: "numeric" });

            return `${weekday} ${day}${ordinal} ${month}${isCurrentYear ? ` ${year}` : ""}`;
        }
        case "numeric": {
            const day = part({ day: "2-digit" });
            const month = part({ month: "2-digit" });
            const year = part({ year: "numeric" });

            return `${day}/${month}/${year}`;
        }
    }
};

/**
 * Returns the ordinal indicator for a number.
 * @param num - Target number
 * @returns ordinal indicator
 */
function getOrdinalIndicator(num: number): string {
    // don't forget about the hundreds!
    if (num % 100 > 3 && num % 100 < 21)
        return "th";

    switch (num % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
};
