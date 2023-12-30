import type { Article, Release, Collection, PublishableItem } from '@/lib/types';

export interface HomePage extends PublishableItem<{
	features: Collection<Article>;
	releases: Collection<Release>;
}> { }
