import type { Image, Meta, PublishableItem, Single } from '@/lib/types';

export interface AboutPage extends PublishableItem<{
	meta: Meta;
	header: string;
	content: string;
	contact: string | null;
	image: Single<Image>;
}> { }
