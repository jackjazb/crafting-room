<script lang="ts">
    import ArtistGrid from "$lib/components/ArtistGrid.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let { artistsPage } = data;

    const activeGroups = artistsPage.groups;
    const inactive = artistsPage.inactive;
</script>

<div class="container flex flex-col gap-5">
    {#each activeGroups as group (group.id)}
        <h2>{group.header}</h2>
        <ArtistGrid artists={group.artists} />
    {/each}
    <h2>{inactive.header}</h2>
    <ArtistGrid artists={inactive.artists} inactive />
</div>
