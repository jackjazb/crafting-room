<script lang="ts">
    import CRRLogo from "$lib/components/CRRLogo.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import { expoInOut } from "svelte/easing";
    import { fly } from "svelte/transition";

    let menuOpen = $state(false);
    const openMenu = () => {
        document.body.style.overflow = "hidden";
        menuOpen = true;
    };

    const closeMenu = () => {
        document.body.style.overflow = "";
        menuOpen = false;
    };

    const toggleMenu = () => {
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    const navigation = [
        {
            href: "/artists",
            ariaLabel: "View the artists page",
            name: "Artists",
        },
        { href: "/news", ariaLabel: "View the news page", name: "News" },
        { href: "/store", ariaLabel: "View the store page", name: "Store" },
        { href: "/events", ariaLabel: "View the events page", name: "Events" },
        { href: "/about", ariaLabel: "View the about page", name: "About" },
    ];
</script>

{#snippet sharedLinks()}
    {#each navigation as link, i (i)}
        <a
            class="text-white hover:text-blue-400 hover:no-underline"
            href={link.href}
            aria-label={link.ariaLabel}
            onclick={closeMenu}
        >
            {link.name}
        </a>
    {/each}
{/snippet}
<nav
    class="sticky z-99 top-0 h-16 flex flex-row bg-black text-white font-semibold text-xl"
>
    <!--Mobile menu-->
    <button
        onclick={toggleMenu}
        class={[
            { "rotate-0": menuOpen },
            { "-rotate-90": !menuOpen },
            "sm:hidden w-16 h-16 ml-1 items-center flex justify-center transition duration-75",
        ]}
        aria-label="Toggle the navigation menu"
    >
        <Icon type="more" />
    </button>

    {#if menuOpen}
        <div
            transition:fly={{
                opacity: 1,
                duration: 150,
                x: -window.innerWidth,
                easing: expoInOut,
            }}
            class="fixed z-99 h-full min-w-full top-16 px-5 flex flex-col text-2xl font-semibold gap-6 bg-black"
        >
            <a
                class="text-white hover:text-blue-400"
                href="/"
                aria-label="View the home page"
                onclick={closeMenu}
            >
                Home
            </a>
            {@render sharedLinks()}
        </div>
    {/if}

    <!--Desktop menu-->
    <menu class="hidden sm:flex items-center gap-6 flex-col sm:flex-row">
        <a
            href="/"
            class="w-11 h-11 text-white hover:text-blue-400 mx-2.5 cursor-pointer"
            aria-label="View the home page"
            onclick={closeMenu}
        >
            <CRRLogo />
        </a>
        {@render sharedLinks()}
    </menu>
</nav>
