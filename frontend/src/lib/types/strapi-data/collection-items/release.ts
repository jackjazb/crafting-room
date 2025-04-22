import type { Artist, PublishableItem, Image, Single } from "@/lib/types";

export type Release = { } & PublishableItem<{
    title: string;
    slug: string;
    date: string;
    link: string;
    artist: Single<Artist>;
    artwork: Single<Image>;
}>;
