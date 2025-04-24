<script lang="ts">
    import ArtistGrid from "$lib/components/ArtistGrid.svelte";
    import Image from "$lib/components/Image.svelte";
    import { formatDate } from "$lib/utils";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let { event } = data;

    const currentDate = new Date();
    const eventDate = new Date(event.date);
    const eventIsInFuture = eventDate > currentDate;
</script>

<main class="container">
    <section class="flex flex-col gap-5 sm:grid grid-cols-12 gap-x-10">
        <Image clazz="col-span-4" image={event.image} format="xlarge" />

        <div class="col-span-8 flex flex-col">
            <div>
                <h1>{event.title}</h1>
                <div class="flex flex-col md:flex-row gap-5 items-center">
                    <span class="mr-auto">
                        <span>{event.venue}</span>
                        ▸
                        <span>
                            {formatDate(event.date, "numeric")}
                        </span>
                    </span>
                    {#if event.link && eventIsInFuture}
                        <a
                            class="btn w-full sm:w-auto sm:mr-auto md:ml-auto"
                            href={event.link}
                            target="_blank"
                            rel="external"
                            aria-label="Book tickets for the event (external)"
                        >
                            Book Tickets
                        </a>
                    {/if}
                </div>
            </div>

            {@html event.description}
        </div>
    </section>

    {#if event.artists && event.artists?.length !== 0}
        <section>
            <h1>Artists</h1>
            <ArtistGrid artists={event.artists} />
        </section>
    {/if}
</main>
