import type { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';
import styles from './Artist.module.scss';
import { cms, media } from '@/lib/server/services';
import { ReleaseGrid } from '@/components/release/ReleaseGrid';
import { mdi, md, cutString } from '@/lib/utils';
import { IconLink } from '@/components/icon-link/IconLink';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';

interface Props {
    params: { slug: string; };
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { slug } = props.params;
    const data = await cms.getArtist({ slug })
        .catch(notFound);

    const description = cutString(data.attributes.bio);

    return {
        title: `Crafting Room Recordings • Artists • ${data.attributes.name}`,
        description,
        openGraph: {
            //TODO: url is a pain - https://github.com/vercel/next.js/discussions/50189
            type: 'profile',
            title: data.attributes.name,
            description,
            images: media.resolveUrl(
                media.getImageFormat(data.attributes.images.data[0], 'xlarge').url
            )
        }
    };
};

const ArtistPage: NextPage<Props> = async props => {
    const { slug } = props.params;
    const data = await cms.getArtist({ slug })
        .catch(notFound);

    return (
        <main className='container'>
            <section className='split-section'>
                <StrapiImage
                    className='split-section__image'
                    image={data.attributes.images.data[0]}
                    format='large'
                    priority
                />

                <div className='split-section__content'>
                    <h1 dangerouslySetInnerHTML={mdi(data.attributes.name)} />
                    <div dangerouslySetInnerHTML={md(data.attributes.bio)} />

                    {data.attributes.links.length > 0 && (
                        <div className={styles.socialLinks}>
                            {data.attributes.links.map(link => (
                                <IconLink
                                    key={link.link}
                                    href={link.link}
                                    icon={link.type}
                                    aria-label={`Visit the artist's ${link.type}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {data.attributes.releases.data.length > 0 && (
                <section>
                    <h2>
                        Releases
                    </h2>
                    <ReleaseGrid
                        releases={data.attributes.releases.data}
                        order='date'
                    />
                </section>
            )}
        </main>
    );
};

export default ArtistPage;
