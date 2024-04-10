import type { Component } from '@/lib/types';

export interface SocialLink extends Component {
	link: string;
	type: SocialLinkType;
}

export type SocialLinkType =
	'Spotify' |
	'Instagram' |
	'Facebook' |
	'Twitter' |
	'Website' |
	'Linktree' |
	'YouTube' |
	'Bandcamp';
