<script lang="ts">
    import Image from "$lib/components/Image.svelte";
    import { formatDate } from "$lib/utils";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let { articles } = data;
</script>

<section class="container flex flex-col gap-4">
    {#each articles as article, i (article.id)}
        <div>
            <a
                class="relative flex"
                href={`/news/${article.slug}`}
                aria-label={`View the article ${article.title}`}
            >
                <Image
                    clazz="w-full h-50"
                    image={article.images[0]}
                    format="large"
                    alt={article.title}
                />
                <div class="absolute top-5 left-5 flex flex-col gap-2">
                    <span class="overlay mb-0 font-bold text-xl">
                        {article.title}
                    </span>
                    <span class="overlay px-2 py-1 mr-auto font-light">
                        {article.author}
                    </span>
                </div>

                <div class="overlay absolute right-5 bottom-5">
                    <span class="sm:hidden">
                        {formatDate(article.createdAt, "abbreviated")}
                    </span>
                    <span class="hidden sm:block">
                        {formatDate(article.createdAt, "full")}
                    </span>
                </div>
            </a>
        </div>

        {#if i !== articles.length - 1}
            <hr />
        {/if}
    {/each}
</section>
