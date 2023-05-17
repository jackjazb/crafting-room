import { Artist, strapiFetch } from "@/lib/strapi-client";
import { ArtistTile } from "@/components/artist/ArtistTile";
import styles from './Artists.module.css';

async function getArtists() {
	const path = 'artists';
	const params = {
		populate: {
			images: {
				populate: "*"
			}
		}
	};
	const response = await strapiFetch(path, params);
	return response.data;
}

/**
 * The directory page for all artists
 * 
 */
export default async function Artists() {
	const artists: Array<Artist> = await getArtists();

	return (
		<div className={`${styles.artists} container`}>
			{
				artists.map(artist => (
					<ArtistTile key={artist.id} artist={artist} />
				))
			}
		</div >);
}