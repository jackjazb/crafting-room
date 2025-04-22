import type { ArtistGroup, ReleaseGroup, PublishableItem, RepeatedComponent, SingleComponent } from "@/lib/types";

export type StorePage = { } & PublishableItem<{
    groups: RepeatedComponent<ReleaseGroup>;
    inactive: SingleComponent<ArtistGroup>;
}>;
