import { Event } from "@/lib/strapi-client";
import { nth } from "@/lib/utils";
import styles from './EventDetails.module.css';
import { ArtistTile } from "@/components/artist/ArtistTile";

export function EventDetails(props: { event: Event; }) {
    const { event } = props;

    const date = new Date(event.attributes.date);
    let day = date.toLocaleString('en-uk', { day: 'numeric' });
    day = day + nth(parseInt(day));
    const weekday = date.toLocaleString('en-uk', { weekday: 'short' });
    const month = date.toLocaleString('en-uk', { month: 'short' });

    const imageUrl = process.env.STRAPI_URL + event.attributes.image.data.attributes.url;

    let artists;
    if (event.attributes.artists && event.attributes.artists.data.length > 0) {
        artists =
            (<div>
                <h1>Artists</h1>
                <div className={styles.eventArtists}>
                    {event.attributes.artists.data.map(artist =>
                        <ArtistTile key={artist.id} artist={artist} />
                    )}
                </div>
            </div>);
    }
    return (
        <>
            <div className={styles.eventDetails}>
                <img className={styles.eventImage} src={imageUrl} alt='' />

                <div className={styles.eventInfo}>
                    <h2 className={styles.eventTitle}>{event.attributes.title}</h2>
                    <div className={styles.eventDate}>
                        {event.attributes.venue} ~ {`${weekday}, ${day} ${month}`}
                    </div >
                    <div className={styles.eventDescription}>
                        {event.attributes.description}
                    </div>
                    {
                        event.attributes.link ?
                            <a className={styles.bookEvent} href={event.attributes.link}>
                                <button className="button-primary">Book Tickets</button></a>
                            : undefined
                    }
                </div>
            </div >
            {artists}
        </>
    );
}