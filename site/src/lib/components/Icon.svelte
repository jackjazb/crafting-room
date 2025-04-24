<script lang="ts">
    import type { IconType } from "$lib/utils";

    let { type }: { type: IconType } = $props();
</script>

{#if type === "more"}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="42px"
        viewBox="0 -960 960 960"
        width="42px"
        fill="currentColor"
        stroke="currentColor"
    >
        <path
            d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"
        />
    </svg>
{:else if type === "open"}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
        stroke="currentColor"
    >
        <path
            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"
        />
    </svg>
{:else if type === "left"}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="42px"
        viewBox="0 -960 960 960"
        width="42px"
        fill="#e3e3e3"
    >
        <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
    </svg>
{:else if type === "right"}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="42px"
        viewBox="0 -960 960 960"
        width="42px"
        fill="#e3e3e3"
    >
        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
    </svg>
{/if}
