<script lang="ts">
    import ReleaseGrid from "$lib/components/ReleaseGrid.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let { storePage } = data;
</script>

<main class="container flex flex-col gap-5">
    <span class="text-xl font-medium">
        More available on
        <a
            href="https://craftingroomrecordings.bandcamp.com/"
            target="_blank"
            rel="external"
            aria-label="Visit our Bandcamp"
        >
            Bandcamp
        </a>
    </span>

    {#each storePage.groups as group (group.id)}
        <h2>{group.header}</h2>
        <ReleaseGrid releases={group.releases} />
    {/each}
</main>
