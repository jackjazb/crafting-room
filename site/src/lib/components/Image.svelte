<script lang="ts">
    import type { Image, ImageFormatName } from "$lib/content";
    import { media } from "$lib/media";

    let {
        image,
        format,
        alt,
        clazz,
        priority,
        placeholder = true,
    }: {
        image: Image;
        format: ImageFormatName | "source";
        alt?: string;
        clazz?: string;
        priority?: boolean;
        placeholder?: boolean;
    } = $props();

    const selectedFormat =
        format === "source" ? image : media.getMediaFormat(image, format);

    const url = media.getMediaUrl(selectedFormat.url);

    let placeholderDiv: HTMLDivElement;
</script>

<div
    bind:this={placeholderDiv}
    class={[clazz, { "bg-black transition duration-100": placeholder }]}
>
    <img
        src={url}
        class={[clazz, "opacity-0 transition duration-100 l"]}
        onload={(e) => {
            (e.target as HTMLImageElement).style.opacity = "1";
            placeholderDiv.style.backgroundColor = "transparent";
        }}
        alt={alt ?? image.alternativeText ?? "CRR Image"}
        fetchpriority={priority ? "high" : "auto"}
    />
</div>
