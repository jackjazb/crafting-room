<script lang="ts">
    import Icon from "$lib/components/Icon.svelte";
    import Image from "$lib/components/Image.svelte";
    import type { Release } from "$lib/content";

    const {
        clazz,
        releases,
        chronological,
    }: {
        clazz?: string;
        releases: Release[];
        chronological?: boolean;
    } = $props();

    if (chronological) {
        releases.sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);

            if (aDate > bDate) return -1;
            else if (aDate < bDate) return 1;
            else return 0;
        });
    }
</script>

<div
    class={[
        clazz,
        "grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    ]}
>
    {#each releases as release (release.id)}
        <div class="relative">
            <Image
                clazz="aspect-square w-full h-full"
                image={release.artwork}
                format="large"
                alt={release.title}
            />

            <div
                class="absolute inset-0 opacity-100 md:opacity-0 hover:opacity-100 transition duration-100 flex flex-col items-start gap-1 p-2.5"
            >
                <div class="overlay font-semibold text-xl">
                    {release.title}
                </div>
                {#if release.artist}
                    <div class="overlay text-md font-light py-1 px-2">
                        {release.artist.name}
                    </div>
                {/if}

                {#if release.link}
                    <a
                        class="overlay mt-auto mx-auto flex gap-2"
                        href={release.link}
                        target="_blank"
                        rel="external"
                        aria-label={`View ${release.title} on Bandcamp`}
                    >
                        <Icon type="open" />
                        Bandcamp
                    </a>
                {/if}
            </div>
        </div>
    {/each}
</div>
