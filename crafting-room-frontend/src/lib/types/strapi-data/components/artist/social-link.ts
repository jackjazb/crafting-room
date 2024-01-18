import { Component } from '@/lib/types/strapi';

export interface SocialLink extends Component {
	link: string;
	linktype: SocialLinkType;
}

export type SocialLinkType =
	'spotify' |
	'instagram' |
	'facebook' |
	'twitter' |
	'website' |
	'linktree' |
	'youtube' |
	'bandcamp';