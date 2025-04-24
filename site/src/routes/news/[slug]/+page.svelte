<script lang="ts">
    import Image from "$lib/components/Image.svelte";
    import { formatDate } from "$lib/utils";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let { article } = data;
</script>

<Image clazz="h-80 w-full" image={article.images[0]} format="source" />

<section class="container">
    <hgroup>
        <h1 class="mb-0">
            {article.title}
        </h1>
        <span class="flex gap-2 items-center">
            <span>
                {formatDate(article.createdAt, "numeric")}
            </span>
            ▸
            <span>{article.author}</span>
        </span>
    </hgroup>
    <div>
        {@html article.content}
    </div>
</section>
