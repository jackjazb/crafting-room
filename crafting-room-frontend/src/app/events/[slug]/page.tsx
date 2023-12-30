import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './Event.module.scss';
import { cms } from '@/lib/server/services';
import { SplitContentSection } from '@/components/split-content/SplitContent';
import { md, mdi } from '@/lib/utils/markdown';
import { formatDate, makeClass } from '@/lib/utils';
import { ArtistGrid } from '@/components/artist/ArtistGrid';

type ServerProps = {
    params: { slug: string; };
};

const EventPage: NextPage<ServerProps> = async props => {
    const { slug } = props.params;
    const event = await cms.getEvent({ slug }).catch(notFound);

    //TODO: get current date in uk time
    const currentDate = new Date();
    const eventDate = new Date(event.attributes.date);
    const eventIsInFuture = eventDate > currentDate;

    return (
        <main className='container'>
            <SplitContentSection image={event.attributes.image.data}>
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
                        className={makeClass(
                            styles.book,
                            'button',
                            'button-primary'
                        )}
                        href={event.attributes.link}
                        target='_blank'
                        rel='external'
                    >
                        Book Tickets
                    </Link>
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
