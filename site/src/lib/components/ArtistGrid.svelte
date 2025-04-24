<script lang="ts">
    import Image from "$lib/components/Image.svelte";
    import type { Artist } from "$lib/content";

    const { artists, inactive }: { artists: Artist[]; inactive?: boolean } =
        $props();
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
    {#each artists as artist (artist.id)}
        <a
            class={[
                "relative flex",
                {
                    "opacity-60 hover:opacity-100 transition duration-100":
                        inactive,
                },
            ]}
            href={`/artists/${artist.slug}`}
            aria-label={`View the artist '${artist.name}'`}
        >
            <Image
                clazz="aspect-4/3 w-full h-full"
                image={artist.images[0]}
                format="large"
                alt={artist.name}
            />

            <div class="absolute overlay bottom-4 left-4 text-xl font-semibold">
                {artist.name}
            </div>
        </a>
    {/each}
</div>
