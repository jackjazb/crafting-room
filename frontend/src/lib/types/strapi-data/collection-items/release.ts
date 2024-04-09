import type { Artist, PublishableItem, Image, Single } from '@/lib/types';

export interface Release extends PublishableItem<{
	title: string;
	slug: string;
	date: string;
	link: string;
	artist: Single<Artist>;
	artwork: Single<Image>;
}> { }
