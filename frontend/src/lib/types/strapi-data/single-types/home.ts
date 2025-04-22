import type { Article, Release, Collection, PublishableItem } from "@/lib/types";

export type HomePage = { } & PublishableItem<{
    features: Collection<Article>;
    releases: Collection<Release>;
}>;
