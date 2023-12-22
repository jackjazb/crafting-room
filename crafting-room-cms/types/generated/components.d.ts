import type { Schema, Attribute } from '@strapi/strapi';

export interface ArtistArtistGroup extends Schema.Component {
  collectionName: 'components_artists_artist_groups';
  info: {
    displayName: 'Artist Group';
    description: '';
  };
  attributes: {
    header: Attribute.String & Attribute.Required;
    artists: Attribute.Relation<
      'artist.artist-group',
      'oneToMany',
      'api::artist.artist'
    >;
  };
}

export interface ArtistSocialLink extends Schema.Component {
  collectionName: 'components_artists_social_links';
  info: {
    displayName: 'Social Link';
    description: '';
  };
  attributes: {
    link: Attribute.String;
    linktype: Attribute.Enumeration<
      ['spotify', 'instagram', 'facebook', 'twitter', 'website', 'linktree']
    >;
  };
}

export interface ReleaseReleaseGroup extends Schema.Component {
  collectionName: 'components_release_release_groups';
  info: {
    displayName: 'Release Group';
    description: '';
  };
  attributes: {
    header: Attribute.String & Attribute.Required;
    releases: Attribute.Relation<
      'release.release-group',
      'oneToMany',
      'api::release.release'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'artist.artist-group': ArtistArtistGroup;
      'artist.social-link': ArtistSocialLink;
      'release.release-group': ReleaseReleaseGroup;
    }
  }
}
