import { FC } from 'react';
import styles from './EventDetails.module.css';
import { formatDate, markdown, markdownInline } from '@/lib/utils';
import { ArtistTile } from '@/components/artist/ArtistTile';
import { Event } from '@/types/strapi-responses';
import { StrapiImage } from '@/components/strapi-image/strapi-image';

/**
 * Details of an event on an event page.
 */
export const EventDetails: FC<{ event: Event; }> = ({ event }) => {
    return (
        <>
            <div className={styles.eventDetails}>
                <StrapiImage
                    className={styles.eventImage}
                    image={event.attributes.image.data}
                    format='medium'
                    priority
                />

                <div className={styles.eventInfo}>
                    <h2
                        className={styles.eventTitle}
                        dangerouslySetInnerHTML={markdownInline(event.attributes.title)}
                    />

                    <div className={styles.eventDate}>
                        <span dangerouslySetInnerHTML={markdownInline(event.attributes.venue)} />
                        {' '}
                        ~
                        {' '}
                        {formatDate(event.attributes.date)}
                    </div>

                    {event.attributes.description && (
                        <div
                            className={styles.eventDescription}
                            dangerouslySetInnerHTML={markdown(event.attributes.description)}
                        />
                    )}

                    {event.attributes.link && (
                        <a
                            className={styles.bookEvent}
                            href={event.attributes.link}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <button className='button-primary'>
                                Book Tickets
                            </button>
                        </a>
                    )}
                </div>
            </div>

            {/* if at least one artist */}
            {event.attributes.artists && event.attributes.artists.data.length > 0 && (
                <div>
                    <h1>
                        Artists
                    </h1>
                    <div className={styles.eventArtists}>
                        {event.attributes.artists.data.map(artist => (
                            <ArtistTile
                                key={artist.id}
                                artist={artist}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};