import type { Image, PublishableItem, Single } from '@/lib/types';

export interface AboutPage extends PublishableItem<{
	header: string;
	content: string;
	contact?: string;
	image: Single<Image>;
}> { }
