import { Artist } from "@/lib/strapi-client";
import styles from './ArtistTile.module.css';
/**
 * Renders an artist portrait which reveals more detail when clicked
 * @param artist an artist 
 * @returns 
 */
export function ArtistTile(props: { key: number, artist: Artist }) {
	const artist = props.artist;

	const imageUrl = process.env.STRAPI_URL + artist.attributes.images.data[0].attributes.url;
	return (
		<a href={`artists/${artist.attributes.name.toLowerCase()}`} className={styles.artist} style={{ backgroundImage: `url(${imageUrl})` }}>
			<div className={styles.name}>{artist.attributes.name}</div>
		</a>
	)
}