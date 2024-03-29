import type { Collection, Event, RequiredCollection, Release, Image, PublishableItem, SocialLink, RepeatedComponent } from '@/lib/types';

export interface Artist extends PublishableItem<{
	name: string;
	slug: string;
	bio: string;
	links: RepeatedComponent<SocialLink>;
	images: RequiredCollection<Image>;
	releases: Collection<Release>;
	events: Collection<Event>;
}> { }




