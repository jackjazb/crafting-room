import type { Collection, Event, RequiredCollection, Release, Image, PublishableItem, SocialLink } from '@/lib/types';

export interface Artist extends PublishableItem<{
	name: string;
	slug: string;
	bio: string;
	links: SocialLink[];
	images: RequiredCollection<Image>;
	releases: Collection<Release>;
	events: Collection<Event>;
}> { }




