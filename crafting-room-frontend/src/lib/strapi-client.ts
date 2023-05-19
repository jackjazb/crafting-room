import qs from "qs";

export type Artist = {
	id: number;
	attributes: {
		name: string;
		bio?: string;
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

export type Homepage = {
	attributes: {
		feature: {
			data: Article;
		};
		releases: {
			data: Array<Release>;
		};
	};

};

export type ArtistsPage = {
	attributes: {
		groups: Array<ArtistGroup>;
		inactive: ArtistGroup;
	};

};

export type ArtistGroup = {
	id: number;
	header: string;
	artists: {
		data: Array<Artist>;
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
		cache: "no-cache" as RequestCache	// This data could change at any time!
	};
	const queryString = qs.stringify(params);
	const requestUrl = `${process.env.STRAPI_URL}/api/${path}?${queryString ? queryString : ''}`;
	const response = await fetch(requestUrl, headers);

	if (!response.ok) {
		console.error(response.statusText);
		throw new Error(`Strapi API request failed`);
	}
	const data = await response.json();
	return data;
}

//resolve an images full URL - TODO return a placeholder if undefined
export function resolveImageUrl(image: Image | undefined) {
	if (!image) {
		return '';
	}
	return `${process.env.IMAGE_URL}${image.attributes.url}`;
}
