import type { Artist, Collection, Image, PublishableItem, Single } from '@/lib/types';

export interface Event extends PublishableItem<{
	title: string;
	slug: string;
	date: string;
	venue: string;
	description?: string;
	link?: string;
	image: Single<Image>;
	artists?: Collection<Artist>;
}> { }
