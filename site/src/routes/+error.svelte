<script lang="ts">
    import { page } from "$app/state";

    const codes: Record<number, string> = {
        404: "Content not found",
        500: "Internal Server Error",
    };
</script>

<div class="container">
    <h2>{page.status}: {codes[page.status] ?? "Error"}</h2>
</div>
