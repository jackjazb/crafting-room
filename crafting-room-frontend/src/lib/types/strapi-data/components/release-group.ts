import type { Component, Release, Collection } from '@/lib/types';

export interface ReleaseGroup extends Component {
	header: string;
	releases: Collection<Release>;
}
