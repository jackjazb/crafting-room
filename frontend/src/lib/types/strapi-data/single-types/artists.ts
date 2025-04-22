import type { ArtistGroup, PublishableItem, RepeatedComponent, SingleComponent } from "@/lib/types";

export type ArtistsPage = { } & PublishableItem<{
    groups: RepeatedComponent<ArtistGroup>;
    inactive: SingleComponent<ArtistGroup>;
}>;
