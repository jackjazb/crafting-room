import type { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './Event.module.scss';
import { cms, media } from '@/lib/server/services';
import { md, mdi } from '@/lib/utils/markdown';
import { formatDate, createClass, cutString } from '@/lib/utils';
import { ArtistGrid } from '@/components/artist/ArtistGrid';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';

interface Props {
    params: { slug: string; };
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { slug } = props.params;
    const data = await cms.getEvent({ slug })
        .catch(notFound);

    const description = cutString(data.attributes.description);

    return {
        title: `Crafting Room Recordings • Events • ${data.attributes.title}`,
        description,
        openGraph: {
            //TODO: url is a pain - https://github.com/vercel/next.js/discussions/50189
            type: 'profile',
            title: data.attributes.title,
            description,
            images: media.resolveUrl(
                media.getImageFormat(data.attributes.image.data, 'xlarge').url
            )
        }
    };
};

const EventPage: NextPage<Props> = async props => {
    const { slug } = props.params;
    const data = await cms.getEvent({ slug })
        .catch(notFound);

    //TODO: get current date in uk time
    const currentDate = new Date();
    const eventDate = new Date(data.attributes.date);
    const eventIsInFuture = eventDate > currentDate;

    return (
        <main className='container'>
            <section className='split-section'>
                <StrapiImage
                    className='split-section__image'
                    image={data.attributes.image.data}
                    format='large'
                    priority
                />

                <div className='split-section__content'>
                    <hgroup>
                        <h1 dangerouslySetInnerHTML={mdi(data.attributes.title)} />
                        <p className={styles.subtitle}>
                            <span
                                className={styles.venue}
                                dangerouslySetInnerHTML={mdi(data.attributes.venue)}
                            />
                            {' '}
                            ▸
                            {' '}
                            <span className={styles.date}>
                                {formatDate(data.attributes.date, 'numeric')}
                            </span>
                        </p>
                    </hgroup>

                    {data.attributes.description && (
                        <div dangerouslySetInnerHTML={md(data.attributes.description)} />
                    )}

                    {data.attributes.link && eventIsInFuture && (
                        <Link
                            className={createClass(
                                styles.book,
                                'button',
                                'button-primary'
                            )}
                            href={data.attributes.link}
                            target='_blank'
                            rel='external'
                            aria-label='Book tickets for the event (external)'
                        >
                            Book Tickets
                        </Link>
                    )}
                </div>
            </section>

            {data.attributes.artists && data.attributes.artists.data.length > 0 && (
                <section>
                    <h1>
                        Artists
                    </h1>
                    <ArtistGrid artists={data.attributes.artists.data} />
                </section>
            )}
        </main>
    );
};

export default EventPage;
