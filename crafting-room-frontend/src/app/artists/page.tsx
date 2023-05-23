import { Artist, ArtistsPage, strapiFetch } from "@/lib/strapi-client";
import { ArtistTile } from "@/components/artist/ArtistTile";
import styles from './Artists.module.css';
import ArtistPage from "./[name]/page";

async function getArtistsPage() {
	const path = 'artists-page';
	const params = {
		populate: {
			groups: {
				populate: {
					artists: {
						populate: "*"
					}
				}
			},
			inactive: {
				populate: {
					artists: {
						populate: "*"
					}
				}
			}
		}
	};
	const response = await strapiFetch(path, params);
	return response.data;
}

/**
 * Generates a set of artist tiles from a list of Artists
 */
const artistTiles = (artists: Array<Artist>) => {
	return artists.map(artist =>
		<ArtistTile artist={artist} key={artist.id} />
	);
}

/**
 * The directory page for all artists
 * 
 */
export default async function Artists() {
	const artistsPage: ArtistsPage = await getArtistsPage();

	const groups = artistsPage.attributes.groups
	const artistGroups = groups.map(group => (
		<div>
			<h2>{group.header}</h2>
			<div className={styles.artists}>
				{artistTiles(group.artists.data)}
			</div>
		</div>
	));

	const inactive = artistsPage.attributes.inactive.artists.data
	const inactiveGroup = inactive.length > 0 ?
		<div>
			<h2>{artistsPage.attributes.inactive.header}</h2>
			<div className={`${styles.artists} ${styles.inactive}`}>
				{artistTiles(inactive)}
			</div>
		</div>
		: undefined;

	return (
		<div className={`${styles.artistsPage} container`}>
			{artistGroups}
			{inactiveGroup}
		</div >);
}