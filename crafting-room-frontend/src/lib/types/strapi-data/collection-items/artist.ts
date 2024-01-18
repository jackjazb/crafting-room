import { Event } from '@/lib/types/strapi-data/collection-items/event';
import { Release } from '@/lib/types/strapi-data/collection-items/release';
import { Collection, Image, PublishableItem, RepeatedComponent, RequiredCollection } from '@/lib/types/strapi';
import { SocialLink } from '@/lib/types/strapi-data/components';

export interface Artist extends PublishableItem<{
	name: string;
	slug: string;
	bio: string;
	links: RepeatedComponent<SocialLink>;
	images: RequiredCollection<Image>;
	releases: Collection<Release>;
	events: Collection<Event>;
}> { }