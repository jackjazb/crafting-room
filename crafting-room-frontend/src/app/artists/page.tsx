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
 * The directory page for all artists
 * 
 */
export default async function Artists() {
	const artistsPage: ArtistsPage = await getArtistsPage();
	return (
		<div className={`${styles.artistsPage} container`}>
			{artistsPage.attributes.groups.map(group => (
				<div>
					<h2>{group.header}</h2>
					<div className={styles.artists}>
						{group.artists.data.map(artist =>
							<ArtistTile artist={artist} key={artist.id} />
						)}
					</div>
				</div>
			))}

			{artistsPage.attributes.inactive ?
				<div>
					<h2>{artistsPage.attributes.inactive.header}</h2>
					<div className={`${styles.artists} ${styles.inactive}`}>
						{artistsPage.attributes.inactive.artists.data.map(artist =>
							<ArtistTile artist={artist} key={artist.id} />
						)}
					</div>
				</div>
				: undefined
			}
		</div >);
}