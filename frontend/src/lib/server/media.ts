import { config } from "@/lib/server/config";
import { Image, ImageFormat, ImageFormatName, defaultFallbackColor } from "@/lib/server/content";
import { CSSProperties } from "react";

/**
 * Provides image and media related functionality.
 */
class MediaProvider {
    private hostname = config.strapiHost;

    public getMediaUrl(url: string) {
        return `${this.hostname}${url}`;
    }

    public getMediaFormat(image: Image, targetFormat: ImageFormatName): ImageFormat {
        if (image.formats[targetFormat]) {
            return image.formats[targetFormat];
        }

        // If this is empty for whatever reason, just return the passed image.
        const largest = Object.values(image.formats)
            .sort((a, b) => b.width - a.width)[0];
        if (!largest) {
            return image;
        }

        return largest;
    }

    createBackground(
        image: Image,
        targetFormat: ImageFormatName | "source",
        fallbackColor?: string | false,

    ): CSSProperties {
        const format = targetFormat === "source"
            ? image
            : this.getMediaFormat(image, targetFormat);

        const url = this.getMediaUrl(format.url);

        const color = fallbackColor === false
            ? undefined
            : fallbackColor ?? defaultFallbackColor ?? undefined;

        return {
            backgroundImage: `url('${url}')`,
            backgroundColor: color,
        };
    }
}

export const media = new MediaProvider();
