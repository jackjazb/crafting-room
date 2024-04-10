import type { Article, Release, Collection, PublishableItem, Meta } from '@/lib/types';

export interface HomePage extends PublishableItem<{
	meta: Meta;
	features: Collection<Article>;
	releases: Collection<Release>;
}> { }
