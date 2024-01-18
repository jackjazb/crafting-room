import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import styles from './Event.module.scss';
import { strapi } from '@/lib/server/services';
import { SplitContentSection } from '@/components/split-content/SplitContent';
import { md, mdi } from '@/lib/utils/markdown';
import { formatDate, createClass } from '@/lib/utils';
import { ArtistGrid } from '@/components/artist/ArtistGrid';

interface ServerProps {
    params: { slug: string; };
}

const EventPage: NextPage<ServerProps> = async props => {
    const event = await strapi.getEvent({ slug: props.params.slug })
        .catch(notFound);

    //TODO -> get current date in uk time
    const currentDate = new Date();
    const eventDate = new Date(event.attributes.date);
    const eventIsInFuture = eventDate > currentDate;

    return (
        <main>
            <SplitContentSection
                className='container'
                image={event.attributes.image.data}
            >
                <h1 dangerouslySetInnerHTML={mdi(event.attributes.title)} />

                <div className={styles.eventDate}>
                    <span
                        className={styles.eventVenue}
                        dangerouslySetInnerHTML={mdi(event.attributes.venue)}
                    />
                    {' '}
                    ~
                    {' '}
                    {formatDate(event.attributes.date)}
                </div>

                {event.attributes.description && (
                    <div dangerouslySetInnerHTML={md(event.attributes.description)} />
                )}

                {event.attributes.link && eventIsInFuture && (
                    <a
                        className={createClass(
                            styles.bookEvent,
                            'button',
                            'button-primary'
                        )}
                        href={event.attributes.link}
                        target='_blank'
                        rel='noreferrer'
                    >
                        Book Tickets
                    </a>
                )}
            </SplitContentSection>

            {event.attributes.artists && event.attributes.artists.data.length > 0 && (
                <section className='container'>
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