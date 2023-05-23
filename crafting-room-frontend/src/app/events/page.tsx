import { EventTile } from "@/components/event/EventTile";
import { Event, strapiFetch } from "@/lib/strapi-client";
import styles from './EventsPage.module.css';

async function getEvents() {
	const path = 'events';
	const params = {
		populate: {
			image: {
				populate: "*"
			}
		},
		sort: ['date:desc']
	};
	const response = await strapiFetch(path, params);
	return response.data;
}

export default async function Events() {
	const events: Array<Event> = await getEvents();
	const today = new Date();
	today.setDate(today.getDate() - 1);

	// Split the list of events into past and future
	const pastEvents = events.filter(event => {
		const eventDate = new Date(event.attributes.date)
		return eventDate < today;
	});
	const futureEvents = events.filter(event => {
		return !pastEvents.includes(event)
	});

	const futureEventTiles = futureEvents.map(event => (
		<EventTile key={event.id} event={event} canBook={true} />
	));
	const pastEventTiles = pastEvents.map(event => (
		<EventTile key={event.id} event={event} canBook={false} />
	));

	return (
		<div className="container">
			{futureEvents.length > 0 ?
				<div className={styles.eventsGroup}>
					<h1>Events</h1>
					<div>
						{futureEventTiles}
					</div>
				</div>
				: undefined
			}
			{pastEvents.length > 0 ?
				<div>
					<h1>Past Events</h1>
					<div>
						{pastEventTiles}
					</div>
				</div> : undefined
			}
		</div>);
}