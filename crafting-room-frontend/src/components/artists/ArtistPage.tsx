import { useParams } from "react-router-dom";
import { strapiFetch, Artist } from "../../utils/api";
import { useEffect, useState } from "react";
import { Loading } from "../base/loading/Loading";
import { ReleaseGrid } from "../releases/ReleaseGrid";

import './Artists.css'

async function getArtist(name: string) {
	const path = 'artists';
	const params = {
		filters: {
			name: {
				$eqi: name
			}
		},
		populate: {
			images: {
				populate: "*"
			},
			releases: {
				populate: "*"
			}
		}
	};
	const response = await strapiFetch(path, params);
	return response.data[0];
}

/**
 * An individual artist's bio page
 * 
 */
export function ArtistPage() {
	const [artist, setArtist] = useState<Artist>();

	const name = useParams().name;

	useEffect(() => {
		getArtist(name ? name : '').then(setArtist);
	}, [name]);

	if (!artist) {
		return (
			<Loading />
		);
	}
	const imageUrl = process.env.REACT_APP_STRAPI_URL + artist.attributes.images.data[0].attributes.url;

	return (
		<div className="container artistPage">
			<img className="artistImage" src={imageUrl} alt={artist.attributes.name} />
			<div className="artistInfo">
				<h1>{artist.attributes.name}</h1>
				<p>{artist.attributes.bio}</p>
			</div>

			<div className="artistReleases">
				<h2>Releases</h2>
				<ReleaseGrid columns={4} releases={artist.attributes.releases.data} />
			</div>
		</div>
	);
}