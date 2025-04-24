<script lang="ts">
    import type { Image, ImageFormatName } from "$lib/content";
    import { media } from "$lib/media";

    let {
        image,
        format,
        alt,
        clazz,
    }: {
        image: Image;
        format: ImageFormatName | "source";
        alt?: string;
        clazz?: string;
    } = $props();

    const selectedFormat =
        format === "source" ? image : media.getMediaFormat(image, format);

    const url = media.getMediaUrl(selectedFormat.url);
</script>

<img
    src={url}
    class={[clazz, "w-auto"]}
    alt={alt ?? image.alternativeText ?? "CRR Image"}
/>
