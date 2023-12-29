import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import styles from './Artist.module.scss';
import { strapi } from '@/lib/server/utils';
import { ReleaseGrid } from '@/components/release/ReleaseGrid';
import { SplitContentSection } from '@/components/split-content/SplitContent';
import { mdi, md } from '@/lib/utils';
import { IconLink } from '@/components/icon-link/IconLink';

type ServerProps = {
    params: { slug: string; };
};

/**
 * An individual artist's bio page
 */
const ArtistPage: NextPage<ServerProps> = async props => {
    const { slug } = props.params;
    const artist = await strapi.getArtist({ slug }).catch(notFound);

    return (
        <main className='container'>
            <SplitContentSection image={artist.attributes.images.data[0]}>
                <h1 dangerouslySetInnerHTML={mdi(artist.attributes.name)} />
                <div dangerouslySetInnerHTML={md(artist.attributes.bio)} />

                {artist.attributes.links.length > 0 && (
                    <div className={styles.socialLinks}>
                        {artist.attributes.links.map(link => (
                            <IconLink
                                key={link.link}
                                icon={link.linktype}
                                link={link.link}
                            />
                        ))}
                    </div>
                )}
            </SplitContentSection>

            {artist.attributes.releases.data.length > 0 && (
                <section>
                    <h2>
                        Releases
                    </h2>
                    <ReleaseGrid
                        releases={artist.attributes.releases.data}
                        order='date'
                    />
                </section>
            )}
        </main>
    );
};

export default ArtistPage;