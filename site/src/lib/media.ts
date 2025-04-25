import { env } from "$env/dynamic/public";
import type { Image, ImageFormat, ImageFormatName } from "$lib/content";

/**
 * Provides image and media related functionality.
 */
class MediaProvider {
    private hostname = env.PUBLIC_MEDIA_HOST ?? "http://localhost:1337";

    public getMediaUrl(url: string) {
        return `${this.hostname}${url}`;
    }

    public getMediaFormat(image: Image, targetFormat: ImageFormatName): ImageFormat {
        if (!image.formats || Object.values(image.formats).length == 0) {
            return image;
        }
        if (image.formats[targetFormat]) {
            return image.formats[targetFormat];
        }

        // If this is empty for whatever reason, just return the passed image.
        const largest = Object.values(image.formats)
            .sort((a, b) => b.width - a.width)[0];

        return largest;
    }
}

export const media = new MediaProvider();
