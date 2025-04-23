<script lang="ts">
    import Image from "$lib/components/Image.svelte";
    import { mdi } from "$lib/markdown";
    import emblaCarouselSvelte from "embla-carousel-svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let { homePage } = data;
</script>

<div class="embla" use:emblaCarouselSvelte>
    <div class="embla__container">
        {#each homePage.features as article (article.id)}
            <a
                href={`/news/${article.slug}`}
                aria-label={`View the article '${article.title}'`}
            >
                <Image image={article.images[0]} format="source" />
                {mdi(article.title)}
            </a>
        {/each}
        <div class="embla__slide">Slide 1</div>
        <div class="embla__slide">Slide 2</div>
        <div class="embla__slide">Slide 3</div>
    </div>
</div>
