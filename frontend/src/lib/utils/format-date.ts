import { getOrdinalIndicator } from "@/lib/utils";

type DateFormat =
    "abbreviated" |
    "full" |
    "numeric";

/**
 * Formats a date string into the specified format.
 * @param dateStr - Date string
 * @returns Formatted date
 */
export const formatDate = (dateStr: string, format: DateFormat): string => {
    const date = new Date(dateStr);
    const currentDate = new Date();
    const isCurrentYear = date.getFullYear() !== currentDate.getFullYear();

    const part = (formatOptions: Intl.DateTimeFormatOptions) =>
        date.toLocaleString("en-uk", formatOptions);

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
