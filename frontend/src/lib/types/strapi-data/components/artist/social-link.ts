import type { Component } from "@/lib/types";

export type SocialLink = {
    link: string;
    linktype: SocialLinkType;
} & Component;

export type SocialLinkType =
    "spotify" |
    "instagram" |
    "facebook" |
    "twitter" |
    "website" |
    "linktree" |
    "youtube" |
    "bandcamp";
