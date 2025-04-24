<script lang="ts">
    import Image from "$lib/components/Image.svelte";
    import ReleaseGrid from "$lib/components/ReleaseGrid.svelte";
    import SocialLink from "$lib/components/SocialLink.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let { artist } = data;
</script>

<div class="container flex flex-col gap-10">
    <section class="flex flex-col gap-y-5 gap-x-10 sm:grid sm:grid-cols-12">
        <div class="sm:col-span-4">
            <Image image={artist.images[0]} format="xlarge" />
        </div>

        <div class="sm:col-span-8">
            <h1 class="flex flex-col gap-2">
                {artist.name}
                <div class="flex gap-4">
                    {#each artist.links as link (link)}
                        <SocialLink
                            href={link.link}
                            type={link.linktype}
                            external
                        />
                    {/each}
                </div>
            </h1>

            <div>{@html artist.bio}</div>
        </div>
    </section>

    {#if artist.releases.length > 0}
        <section>
            <h2>Releases</h2>
            <ReleaseGrid releases={artist.releases} chronological />
        </section>
    {/if}
</div>
