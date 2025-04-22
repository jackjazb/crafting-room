import type { Artist, Collection, Component } from "@/lib/types";

export type ArtistGroup = {
    header: string;
    artists: Collection<Artist>;
} & Component;
