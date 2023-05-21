import { Artist, resolveImageUrl } from "@/lib/strapi-client";
import styles from './ArtistBio.module.css';
import { ReleaseGrid } from "../release/ReleaseGrid";
import { SocialLinks } from "./SocialLinks";
/**
 * The bio page for a single artist.
 * @param artist an artist 
 * @returns 
 */
export function ArtistBio(props: { artist: Artist }) {
    const { artist } = props;
    const imageUrl = resolveImageUrl(artist.attributes.images.data[0]);

    return (
        <div className={styles.artistBio}>
            <img className={styles.artistImage} src={imageUrl} alt={artist.attributes.name} />
            <div className={styles.artistInfo}>
                <h1>{artist.attributes.name}</h1>

                <p>{artist.attributes.bio}</p>
                {artist.attributes.links.length > 0 ?
                    <SocialLinks links={artist.attributes.links} />
                    : undefined
                }
            </div>
            {artist.attributes.releases.data.length > 0 ?
                <div className={styles.artistReleases}>
                    <h2>Releases</h2>
                    <ReleaseGrid columns={4} releases={artist.attributes.releases.data} dateOrder={true} />
                </div> : undefined
            }
        </div>
    )
}