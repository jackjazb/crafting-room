import type { Schema, Struct } from "@strapi/strapi";

export type ArtistArtistGroup = {
    collectionName: "components_artists_artist_groups";
    info: {
        description: "";
        displayName: "Artist Group";
    };
    attributes: {
        artists: Schema.Attribute.Relation<"oneToMany", "api::artist.artist">;
        header: Schema.Attribute.String & Schema.Attribute.Required;
    };
} & Struct.ComponentSchema;

export type ArtistSocialLink = {
    collectionName: "components_artists_social_links";
    info: {
        description: "";
        displayName: "Social Link";
    };
    attributes: {
        link: Schema.Attribute.String;
        linktype: Schema.Attribute.Enumeration<
            ["spotify", "instagram", "facebook", "twitter", "website", "linktree"]
        >;
    };
} & Struct.ComponentSchema;

export type ReleaseReleaseGroup = {
    collectionName: "components_release_release_groups";
    info: {
        description: "";
        displayName: "Release Group";
    };
    attributes: {
        header: Schema.Attribute.String & Schema.Attribute.Required;
        releases: Schema.Attribute.Relation<"oneToMany", "api::release.release">;
    };
} & Struct.ComponentSchema;

declare module "@strapi/strapi" {
    export namespace Public {
        export type ComponentSchemas = {
            "artist.artist-group": ArtistArtistGroup;
            "artist.social-link": ArtistSocialLink;
            "release.release-group": ReleaseReleaseGroup;
        };
    }
}
