import { FC } from 'react';
import { ReleaseGrid } from '../release/ReleaseGrid';
import styles from './ArtistBio.module.css';
import { SocialLinks } from './SocialLinks';
import { Artist } from '@/types/strapi-responses';
import { StrapiImage } from '@/components/strapi-image/strapi-image';
import { markdown, markdownInline } from '@/lib/utils';

/**
 * The bio page for a single artist.
 */
export const ArtistBio: FC<{ artist: Artist; }> = ({ artist }) => {
    return (
        <div className={styles.artistBio}>
            <StrapiImage
                className={styles.artistImage}
                image={artist.attributes.images.data[0]}
                format='medium'
                alt={artist.attributes.name}
                priority
            />

            <div className={styles.artistInfo}>
                <h1 dangerouslySetInnerHTML={markdownInline(artist.attributes.name)} />

                <div dangerouslySetInnerHTML={markdown(artist.attributes.bio)} />

                {artist.attributes.links.length > 0 &&
                    <SocialLinks links={artist.attributes.links} />
                }
            </div>

            {artist.attributes.releases.data.length > 0 && (
                <div className={styles.artistReleases}>
                    <h2>
                        Releases
                    </h2>
                    <ReleaseGrid
                        columns={4}
                        releases={artist.attributes.releases.data}
                        dateOrder={true}
                    />
                </div>
            )}
        </div>
    );
};