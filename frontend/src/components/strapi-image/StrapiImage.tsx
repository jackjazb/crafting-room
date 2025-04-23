import { Image as CmsImage, defaultFallbackColor, ImageFormatName } from "@/lib/server/content";
import { media } from "@/lib/server/media";
import Image from "next/image";

type Props = {
    className?: string | undefined;
    /**
     * The image data.
     */
    image: CmsImage | undefined;
    /**
     * The target image format.
     *
     * If the target format does not exist on the image, the next largest format
     * will be used.
     */
    format: ImageFormatName | "source";
    /**
     * Override or disable the default image fallback color.
     */
    fallbackColor?: string | false;
    /**
     * Override the image's default alternate text.
     */
    alt?: string;
    /**
     * Whether the image needs to be prioritized.
     *
     * This automatically disables lazy loading.
     * @defaultValue
     * ```typescript
     *    false
     * ```
     */
    priority?: boolean;
};

/**
 * A Strapi image wrapped in a Next.js `<Image>` tag.
 */
export const StrapiImage = (props: Props) => {
    if (!props.image) {
        return null;
    }
    const format = props.format === "source"
        ? props.image
        : media.getMediaFormat(props.image, props.format);

    const url = media.getMediaUrl(format.url);

    return (
        <Image
            className={props.className}
            style={{
                backgroundColor: props.fallbackColor === false
                    ? undefined
                    : props.fallbackColor ?? defaultFallbackColor,
            }}
            src={url}
            width={format.width}
            height={format.height}
            alt={props?.alt ?? props.image.alternativeText ?? "CRR Image"}
            loading={props.priority ? "eager" : "lazy"}
            priority={props.priority ?? false}
        />
    );
};
