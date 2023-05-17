import { Artist } from "@/lib/strapi-client";
import styles from './ArtistBio.module.css';
import { ReleaseGrid } from "../release/ReleaseGrid";
/**
 * The bio page for a single artist.
 * @param artist an artist 
 * @returns 
 */
export function ArtistBio(props: { artist: Artist }) {
    const { artist } = props;
    const imageUrl = process.env.STRAPI_URL + artist.attributes.images.data[0].attributes.url;

    return (
        <div className={styles.artistBio}>
            <img className={styles.artistImage} src={imageUrl} alt={artist.attributes.name} />
            <div className={styles.artistInfo}>
                <h1>{artist.attributes.name}</h1>
                <p>{artist.attributes.bio}</p>
            </div>

            <div className={styles.artistReleases}>
                <h2>Releases</h2>
                <ReleaseGrid columns={4} releases={artist.attributes.releases.data} />
            </div>
        </div>
    )
}