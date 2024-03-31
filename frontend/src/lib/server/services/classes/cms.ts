import type { StrapiServiceOptions } from '@/lib/server/services/classes/strapi';
import { StrapiService } from '@/lib/server/services/classes/strapi';
import type { AboutPage, Article, Artist, ArtistsPage, Event, HomePage, StorePage, RequiredOptions } from '@/lib/types';

/**
 * Options for a CMS service.
 */
export interface CMSServiceOptions extends StrapiServiceOptions { }

/**
 * A service for handling and performing specific requests to the Strapi
 * CMS API.
 */
export class CMSService extends StrapiService {
	static override createOptions(options: CMSServiceOptions): RequiredOptions<CMSServiceOptions> {
		return StrapiService.createOptions(options);
	}

	protected override readonly options: RequiredOptions<CMSServiceOptions>;

	/**
	 * Creates a new CMS service instance.
	 * @param options - Options
	 */
	constructor(options: CMSServiceOptions) {
		const _options = CMSService.createOptions(options);
		super(_options);
		this.options = _options;
	}

	async getHomePage() {
		return this.getSingle<HomePage>('homepage');
	}

	async getAboutPage() {
		return this.getSingle<AboutPage>('about-page');
	}

	async getArtistsPage() {
		return this.getSingle<ArtistsPage>('artists-page');
	}

	async getStorePage() {
		return this.getSingle<StorePage>('store-page');
	}

	async getArticles() {
		return this.getCollection<Article>('articles', {
			sort: ['createdAt:desc']
		});
	}

	async getEvents() {
		return this.getCollection<Event>('events', {
			sort: ['date:desc']
		});
	}

	async getArtist(key: { id: string | number; } | { slug: string; }) {
		if ('id' in key)
			return this.getSingle<Artist>(`artists/${key.id}`);
		else if ('slug' in key)
			return this.getCollectionFirstItem<Artist>('artists', {
				filters: { slug: { $eq: key.slug } }
			});
		else
			throw new Error('Unknown key');
	}

	async getEvent(key: { id: string | number; } | { slug: string; }) {
		if ('id' in key)
			return this.getSingle<Event>(`events/${key.id}`);
		else if ('slug' in key)
			return this.getCollectionFirstItem<Event>('events', {
				filters: { slug: { $eq: key.slug } }
			});
		else
			throw new Error('Unknown key');
	}

	async getArticle(key: { id: string | number; } | { slug: string; }) {
		if ('id' in key)
			return this.getSingle<Article>(`articles/${key.id}`);
		else if ('slug' in key)
			return this.getCollectionFirstItem<Article>('articles', {
				filters: { slug: { $eq: key.slug } }
			});
		else
			throw new Error('Unknown key');
	}
}
