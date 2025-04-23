import { stringify } from "qs";
import { config } from "./config";

export type OneOrMore<TItem> = [TItem, ...TItem[]];

export type Pagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
};

export type CollectionResponse<TItem> = {
    data: TItem[];
    meta: {
        pagination: Pagination;
    };
};
export type SingleResponse<TItem> = {
    data: TItem;
};

export type Image = ImageFormat & {
    alternativeText: string | null;
    caption: string | null;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    formats: Partial<Record<ImageFormatName, ImageFormat>>;
};

export type ImageFormatName =
    "thumbnail" |
    "small" |
    "medium" |
    "large" |
    "xlarge";

export type ImageFormat = Item & {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    url: string;
};

export type Item = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    documentId: string;
};

export type Group = {
    id: number;
    header: string;
};

export type SocialLink = {
    link: string;
    linktype: SocialLinkType;
};

export type SocialLinkType =
    "spotify" |
    "instagram" |
    "facebook" |
    "twitter" |
    "website" |
    "linktree" |
    "youtube" |
    "bandcamp";

// Entities.

export type Article = Item & {
    title: string;
    slug: string;
    content: string;
    createdAt: string;
    author: string;
    images: OneOrMore<Image>;
};

export type Artist = Item & {
    name: string;
    slug: string;
    bio: string;
    links: SocialLink[];
    images: Image[];
    releases: Release[];
    events: Event[];
};
export type Release = Item & {
    title: string;
    slug: string;
    date: string;
    link: string;
    artist: Artist;
    artwork: Image;
};

export type Event = Item & {
    title: string;
    slug: string;
    date: string;
    venue: string;
    description?: string;
    link?: string;
    image: Image;
    artists?: Artist[];
};

export type Homepage = {
    features: Article[];
    releases: Release[];
};

// Groups.

export type ArtistGroup = Group & {
    artists: Artist[];
};

export type ReleaseGroup = Group & {
    releases: Release[];
};

export type ArtistsPage = {
    groups: ArtistGroup[];
    inactive: ArtistGroup;
};

export type StorePage = {
    groups: ReleaseGroup[];
};

export type AboutPage = {
    header: string;
    content: string;
    contact?: string;
    image: Image;
};

/**
 * Provides CMS access for pages.
 */
class ContentService {
    private hostname = config.strapiHost;

    // Pages.

    public async homePage() {
        return await this.get<Homepage>("homepage");
    }

    public async artistsPage() {
        return await this.get<ArtistsPage>("artists-page");
    }

    public async storePage() {
        return await this.get<StorePage>("store-page");
    }

    public async aboutPage() {
        return await this.get<AboutPage>("about-page");
    }

    // Entities.

    public async artist(slug: string) {
        return await this.getFirstWithSlug<Artist>("artists", slug);
    }

    public async articles() {
        return await this.get<Article[]>("articles", {
            sort: ["createdAt:desc"],
        });
    }

    public async article(slug: string) {
        return await this.getFirstWithSlug<Article>("articles", slug);
    }

    public async events() {
        return this.get<Event[]>("events", {
            sort: ["date:desc"],
        });
    }

    public async event(slug: string) {
        return await this.getFirstWithSlug<Event>("events", slug);
    }

    // Utility functions.

    /**
     * Performs a request for `endpoint`.
     */
    private async get<TResponse>(endpoint: string, params?: object): Promise<TResponse> {
        let encodedParams = "pLevel";
        if (params) {
            encodedParams = `${encodedParams}&${stringify(params)}`;
        }
        const url = new URL(`${this.hostname}/api/${endpoint}`);
        url.search = encodedParams;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                const cause = await response.text();
                console.log("Error response from API", cause);
                throw new Error("CMS returned an error");
            }
            const json: { data: unknown; } = await response.json();
            return json.data as TResponse;
        }
        catch (e) {
            console.log(e);
            throw new Error("Failed to reach CMS");
        }
    }

    /**
     * Performs a request for `endpoint` filtered by `slug` and extracts the first result.
     */
    private async getFirstWithSlug<TResponse>(endpoint: string, slug: string): Promise<TResponse> {
        const results = await this.get<TResponse[]>(endpoint, {
            filters: { slug: { $eq: slug } },
        });
        if (results.length === 0) {
            throw new Error(`Nothing found at /${endpoint} for slug ${slug}`);
        }
        return results[0] as TResponse;
    }
}

export const content = new ContentService();
