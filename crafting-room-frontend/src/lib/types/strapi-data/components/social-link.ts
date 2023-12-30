import type { Component } from '@/lib/types';

export interface SocialLink extends Component {
	link: string;
	linktype: LinkType;
}

export type LinkType = 'spotify' | 'instagram' | 'facebook' | 'twitter' | 'website' | 'linktree';
