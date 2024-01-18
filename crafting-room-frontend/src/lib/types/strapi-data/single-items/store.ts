import { ReleaseGroup } from '@/lib/types/strapi-data/components/release/release-group';
import { PublishableItem, RepeatedComponent } from '@/lib/types/strapi';

export interface StorePage extends PublishableItem<{
	groups: RepeatedComponent<ReleaseGroup>;
}> { }