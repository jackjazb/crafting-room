import qs from "qs";
import { notFound } from 'next/navigation';

export type LinkType = 'spotify' | 'instagram' | 'facebook' | 'twitter' | 'website' | 'linktree';

/** 
 * Artists
 */
export type Artist = {
	id: number;
	attributes: {
		name: string;
		bio: string;
		links: Array<SocialLink>;
		images: {
			data: Array<Image>;
		};
		releases: {
			data: Array<Release>;
		};
		events: {
			data: Array<Event>;
		};
	};
};

export type SocialLink = {
	id: number,
	link: string,
	linktype: LinkType
}

export type ArtistGroup = {
	id: number;
	header: string;
	artists: {
		data: Array<Artist>;
	}
}

export type ArtistsPage = {
	attributes: {
		groups: Array<ArtistGroup>;
		inactive: ArtistGroup;
	};

};

/** 
 * Releases
 */
export type Release = {
	id: number;
	attributes: {
		title: string;
		date: string;
		link: string;
		artist: {
			data: Artist;
		};
		artwork: {
			data: Image;
		};
	};
};

export type ReleaseGroup = {
	id: number;
	header: string;
	releases: {
		data: Array<Release>;
	}
}

export type StorePage = {
	attributes: {
		groups: Array<ReleaseGroup>;
		inactive: ArtistGroup;
	};

};

/** 
 * News
 */
export type Article = {
	id: number;
	attributes: {
		title: string;
		content: string;
		createdAt: string;
		author: string;
		images: {
			data: Array<Image>;
		};
	};
};

/** 
 * Events
 */
export type Event = {
	id: number;
	attributes: {
		title: string;
		date: string;
		venue: string;
		description?: string;
		link?: string;
		image: {
			data: Image;
		};
		artists?: {
			data: Array<Artist>;
		};
	};
};

/**
 * Other Page types
 */
export type Homepage = {
	attributes: {
		features: {
			data: Array<Article>;
		};
		releases: {
			data: Array<Release>;
		};
	};

};

export type AboutPage = {
	attributes: {
		header: string;
		content: string;
		image: {
			data: Image;
		}
	}

}

export type Image = {
	attributes: {
		url: string;
	};
};

export async function strapiFetch(path: string, params: any = {}) {
	const headers = {
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-store" as RequestCache	// This data could change at any time!
	};

	const requestUrl = buildServerRequestUrl(path, params);

	const response = await fetch(requestUrl, headers);

	if (!response.ok) {
		console.error(response.statusText);
		notFound();
	}
	const data = await response.json();
	return data;
}

export function buildServerRequestUrl(path: string, params: {}) {
	const queryString = qs.stringify(params);
	return `${process.env.STRAPI_URL}/api/${path}?${queryString ? queryString : ''}`;
}

export function buildClientRequestUrl(path: string, params: {}) {
	const queryString = qs.stringify(params);
	return `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${path}?${queryString ? queryString : ''}`;
}

//resolve an images full URL - TODO return a placeholder if undefined
export function resolveImageUrl(image: Image | undefined) {
	if (!image) {
		return '';
	}
	return `${process.env.NEXT_PUBLIC_IMAGE_URL}${image.attributes.url}`;
}
