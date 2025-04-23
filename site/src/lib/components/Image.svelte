<script lang="ts">
    import type { Image, ImageFormatName } from "$lib/content";
    import { media } from "$lib/media";

    let {
        image,
        format,
        alt,
    }: {
        image: Image;
        format: ImageFormatName | "source";
        alt?: string;
    } = $props();

    const selectedFormat =
        format === "source" ? image : media.getMediaFormat(image, format);

    const url = media.getMediaUrl(selectedFormat.url);
</script>

<img
    src={url}
    width={selectedFormat.width}
    height={selectedFormat.height}
    alt={alt ?? image.alternativeText ?? "CRR Image"}
/>
