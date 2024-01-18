import { Image, Single, PublishableItem } from '@/lib/types/strapi';

export interface AboutPage extends PublishableItem<{
	header: string;
	content: string;
	contact?: string;
	image: Single<Image>;
}> { }