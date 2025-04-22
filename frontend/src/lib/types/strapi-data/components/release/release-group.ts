import type { Component, Release, Collection } from "@/lib/types";

export type ReleaseGroup = {
    header: string;
    releases: Collection<Release>;
} & Component;
