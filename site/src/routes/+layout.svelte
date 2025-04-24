<script lang="ts">
    import Footer from "$lib/components/Footer.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import "../app.css";

    let { children } = $props();
</script>

<svelte:head>
    <title>Crafting Room Recordings</title>
</svelte:head>
<Navbar />
<main>
    {@render children()}
</main>
<Footer />
