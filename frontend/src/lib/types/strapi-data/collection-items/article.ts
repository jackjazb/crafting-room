import type { Image, PublishableItem, RequiredCollection } from "@/lib/types";

export type Article = { } & PublishableItem<{
    title: string;
    slug: string;
    content: string;
    createdAt: string;
    author: string;
    images: RequiredCollection<Image>;
}>;
