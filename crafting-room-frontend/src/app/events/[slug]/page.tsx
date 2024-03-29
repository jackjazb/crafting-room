import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './Event.module.scss';
import { cms } from '@/lib/server/services';
import { md, mdi } from '@/lib/utils/markdown';
import { formatDate, createClass } from '@/lib/utils';
import { ArtistGrid } from '@/components/artist/ArtistGrid';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';

interface ServerProps {
    params: { slug: string; };
}

const EventPage: NextPage<ServerProps> = async props => {
    const { slug } = props.params;

    const event = await cms.getEvent({ slug })
        .catch(notFound);

    //TODO: get current date in uk time
    const currentDate = new Date();
    const eventDate = new Date(event.attributes.date);
    const eventIsInFuture = eventDate > currentDate;

    return (
        <main className='container'>
            <section className='split-section'>
                <StrapiImage
                    className='split-section__image'
                    image={event.attributes.image.data}
                    format='xlarge'
                    priority
                />

                <div className='split-section__content'>
                    <hgroup>
                        <h1 dangerouslySetInnerHTML={mdi(event.attributes.title)} />
                        <p className={styles.subtitle}>
                            <span
                                className={styles.venue}
                                dangerouslySetInnerHTML={mdi(event.attributes.venue)}
                            />
                            {' '}
                            ▸
                            {' '}
                            <span className={styles.date}>
                                {formatDate(event.attributes.date, 'numeric')}
                            </span>
                        </p>
                    </hgroup>

                    {event.attributes.description && (
                        <div dangerouslySetInnerHTML={md(event.attributes.description)} />
                    )}

                    {event.attributes.link && eventIsInFuture && (
                        <Link
                            className={createClass(
                                styles.book,
                                'button',
                                'button-primary'
                            )}
                            href={event.attributes.link}
                            target='_blank'
                            rel='external'
                            aria-label='Book tickets for the event (external)'
                        >
                            Book Tickets
                        </Link>
                    )}
                </div>
            </section>

            {event.attributes.artists && event.attributes.artists.data.length > 0 && (
                <section>
                    <h1>
                        Artists
                    </h1>
                    <ArtistGrid artists={event.attributes.artists.data} />
                </section>
            )}
        </main>
    );
};

export default EventPage;
