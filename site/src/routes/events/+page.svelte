<script lang="ts">
    import Image from "$lib/components/Image.svelte";
    import type { Event } from "$lib/content";
    import { formatDate } from "$lib/utils";
    import type { PageProps } from "./$types";
    let { data }: PageProps = $props();
    let { events } = data;

    const currentDate = new Date();

    const pastEvents = events.filter(
        (event) => new Date(event.date) < currentDate,
    );

    const futureEvents = events.filter((event) => !pastEvents.includes(event));
</script>

{#snippet eventTile(event: Event, canBook: boolean)}
    <div>
        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex flex-row gap-5">
                <div class="">
                    <Image
                        clazz="h-24 w-24 min-w-24 aspect-square"
                        image={event.image}
                        format="medium"
                        alt={event.title}
                    />
                </div>
                <div class="grow flex flex-col items-start">
                    <h3>{event.title}</h3>
                    <div>
                        {formatDate(event.date, "full")}
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2 sm:ml-auto">
                <a
                    class="btn text-nowrap"
                    href={`/events/${event.slug}`}
                    aria-label={`View the event '${event.title}'`}
                >
                    More Info
                </a>

                {#if canBook && event.link}
                    <a
                        class="btn"
                        href={event.link}
                        target="_blank"
                        rel="external"
                        aria-label="Book tickets for the event (external)"
                    >
                        Book
                    </a>
                {/if}
            </div>
        </div>
    </div>
{/snippet}

<main class="container flex flex-col gap-5">
    {#if futureEvents.length !== 0}
        <h2>Events</h2>
        <div class="mb-5">
            {#each futureEvents as event, i (event.id)}
                {@render eventTile(event, true)}

                {#if i !== futureEvents.length - 1}
                    <hr />
                {/if}
            {/each}
        </div>
    {/if}

    {#if pastEvents.length !== 0}
        <h2>Past Events</h2>
        <div class="flex flex-col gap-4">
            {#each pastEvents as event, i (event.id)}
                {@render eventTile(event, false)}
                {#if i !== pastEvents.length - 1}
                    <hr />
                {/if}
            {/each}
        </div>
    {/if}
</main>
