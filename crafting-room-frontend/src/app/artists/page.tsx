import { NextPage } from 'next';
import styles from './Artists.module.css';
import { ArtistTile } from '@/components/artist/ArtistTile';
import { strapi } from '@/lib/api/strapi-client';
import { Artist } from '@/types/strapi-responses';

/**
 * Generates a set of artist tiles from a list of Artists.
 */
const artistTiles = (artists: Artist[]) =>
	artists.map(artist => (
		<ArtistTile
			key={artist.id}
			artist={artist}
		/>
	));

/**
 * The directory page for all artists.
 */
export const ArtistsPage: NextPage = async () => {
	const res = await strapi.getArtistsPage();
	const artistsPage = res.data;

	const groups = artistsPage.attributes.groups;
	const inactive = artistsPage.attributes.inactive.artists.data;

	return (
		<div className={`${styles.artistsPage} container`}>
			{groups.map(group => (
				<div key={group.id}>
					<h2>
						{group.header}
					</h2>
					<div className={styles.artists}>
						{artistTiles(group.artists.data)}
					</div>
				</div>
			))}

			{inactive.length > 0 && (
				<div>
					<h2>
						{artistsPage.attributes.inactive.header}
					</h2>
					<div className={`${styles.artists} ${styles.inactive}`}>
						{artistTiles(artistsPage.attributes.inactive.artists.data)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ArtistsPage;