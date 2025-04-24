<script lang="ts">
    import SocialLink from "$lib/components/SocialLink.svelte";
    import type { SocialLinkType } from "$lib/content";

    type Link = {
        icon: SocialLinkType;
        href: string;
        ariaLabel: string;
    };

    const links: Link[] = [
        {
            icon: "instagram",
            href: "https://www.instagram.com/crafting_room",
            ariaLabel: "Visit our Instagram",
        },
        {
            icon: "youtube",
            href: "https://www.youtube.com/channel/UCY_H8aUrjvI8iHobz5mi9sQ",
            ariaLabel: "Visit our YouTube",
        },
        {
            icon: "bandcamp",
            href: "https://craftingroomrecordings.bandcamp.com",
            ariaLabel: "Visit our Bandcamp",
        },
        {
            icon: "twitter",
            href: "https://twitter.com/crafting_room",
            ariaLabel: "Visit our Twitter",
        },
    ];
</script>

<footer
    class="flex text-black items-center justify-center flex-wrap mt-auto py-8 gap-8 p-5"
>
    {#each links as link (link.icon)}
        <SocialLink
            type={link.icon}
            ariaLabel={link.ariaLabel}
            href={link.href}
            external
        />
    {/each}
</footer>
