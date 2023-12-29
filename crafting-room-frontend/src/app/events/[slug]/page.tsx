import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import styles from './Event.module.scss';
import { strapi } from '@/lib/server/utils';
import { SplitContentSection } from '@/components/split-content/SplitContent';
import { md, mdi } from '@/lib/utils/markdown';
import { formatDate, makeClass } from '@/lib/utils';
import { ArtistGrid } from '@/components/artist/ArtistGrid';

type ServerProps = {
    params: { slug: string; };
};

const EventPage: NextPage<ServerProps> = async props => {
    const { slug } = props.params;
    const event = await strapi.getEvent({ slug }).catch(notFound);

    //TODO -> get current date in uk time
    const currentDate = new Date();
    const eventDate = new Date(event.attributes.date);
    const eventIsInFuture = eventDate > currentDate;

    return (
        <main className='container'>
            <SplitContentSection image={event.attributes.image.data}>
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
                        className={makeClass(
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