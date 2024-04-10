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
    link: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<
      [
        'Spotify',
        'Instagram',
        'Facebook',
        'Twitter',
        'Website',
        'Linktree',
        'YouTube',
        'Bandcamp'
      ]
    > &
      Attribute.Required;
  };
}

export interface GeneralMeta extends Schema.Component {
  collectionName: 'components_general_metas';
  info: {
    displayName: 'Meta';
    icon: 'information';
    description: '';
  };
  attributes: {
    description: Attribute.Text & Attribute.Required;
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
      'general.meta': GeneralMeta;
      'release.release-group': ReleaseReleaseGroup;
    }
  }
}
