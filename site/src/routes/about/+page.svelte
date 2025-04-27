<script lang="ts">
    import Image from "$lib/components/Image.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let { aboutPage } = data;
</script>

<div class="container">
    <section>
        <Image
            clazz="mx-auto h-50"
            image={aboutPage.image}
            format="xlarge"
            placeholder={false}
        />
    </section>

    <section>
        <h1>{aboutPage.header}</h1>
        <div>{@html aboutPage.content}</div>
    </section>

    {#if aboutPage.contact}
        <section>
            <h1>Contact</h1>
            <div>{@html aboutPage.contact}</div>
        </section>
    {/if}
</div>
