import type { Image, PublishableItem, Single } from "@/lib/types";

export type AboutPage = { } & PublishableItem<{
    header: string;
    content: string;
    contact?: string;
    image: Single<Image>;
}>;
