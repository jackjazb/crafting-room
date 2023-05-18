import styles from './EventTile.module.css';
import { Event, resolveImageUrl } from "@/lib/strapi-client";
import { nth } from "@/lib/utils";


export function EventTile(props: { key: number, event: Event; }) {
	const { event } = props;

	const date = new Date(event.attributes.date);
	let day = date.toLocaleString('en-uk', { day: 'numeric' });
	day = day + nth(parseInt(day));
	const weekday = date.toLocaleString('en-uk', { weekday: 'short' });
	const month = date.toLocaleString('en-uk', { month: 'short' });

	return (
		// use ID here!
		<a className={styles.eventTile} key={event.id} href={`events/${event.id}`}>
			<img className={styles.eventThumbnail} src={resolveImageUrl(event.attributes.image.data)} alt={event.attributes.title}></img>

			<div className={styles.eventDetails}>
				<div className={styles.eventTitle}>{event.attributes.title}</div>
				<div className={styles.eventDetails}>
					{`${weekday}, ${day} ${month}`}
				</div >

			</div >
		</a >
	);
};
