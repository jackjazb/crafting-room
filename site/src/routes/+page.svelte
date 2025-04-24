<script lang="ts">
    import Icon from "$lib/components/Icon.svelte";
    import Image from "$lib/components/Image.svelte";
    import ReleaseGrid from "$lib/components/ReleaseGrid.svelte";
    import type { EmblaCarouselType } from "embla-carousel";
    import emblaCarouselSvelte from "embla-carousel-svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let { homePage } = data;

    let emblaApi: EmblaCarouselType;
    function onInit(event: CustomEvent<EmblaCarouselType>) {
        emblaApi = event.detail;
    }

    let options = { loop: true };
</script>

<div
    class="embla overflow-hidden relative"
    use:emblaCarouselSvelte={{ options, plugins: [] }}
    onemblaInit={onInit}
>
    <div class="embla__container flex">
        {#each homePage.features as article (article.id)}
            <div class="embla__slide grow-0 shrink-0 basis-full">
                <a
                    class="flex relative h-[70vh] no-underline"
                    href={`/news/${article.slug}`}
                    aria-label={`View the article '${article.title}'`}
                >
                    <Image
                        clazz="w-full h-full"
                        image={article.images[0]}
                        format="source"
                    />
                    <span
                        class="absolute bottom-0 m-5 font-semibold overlay text-2xl"
                    >
                        {article.title}
                    </span>
                </a>
            </div>
        {/each}
    </div>
    <span>
        <button
            class="absolute z-10 top-1/2 -translate-y-1/2 left-0"
            onclick={() => emblaApi.scrollPrev()}
        >
            <Icon type="left" />
        </button>
        <button
            class="absolute z-10 top-1/2 -translate-y-1/2 right-0"
            onclick={() => emblaApi.scrollNext()}
        >
            <Icon type="right" />
        </button>
    </span>
</div>
<section class="pl-5 pr-5 mt-5">
    <h1>Featured Releases</h1>
    <ReleaseGrid releases={homePage.releases} />
</section>
