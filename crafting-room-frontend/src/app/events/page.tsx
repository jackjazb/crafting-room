import { NextPage } from 'next';
import styles from './EventsPage.module.css';
import { EventTile } from '@/components/event/EventTile';
import { strapi } from '@/lib/api/strapi-client';

const EventsPage: NextPage = async () => {
	const res = await strapi.getEvents();
	const events = res.data;

	const today = new Date();
	today.setDate(today.getDate() - 1);

	// Split the list of events into past and future
	const pastEvents = events.filter(event =>
		new Date(event.attributes.date) < today);

	const futureEvents = events.filter(event =>
		!pastEvents.includes(event));

	return (
		<div className='container'>
			{futureEvents.length > 0 && (
				<div className={styles.eventsGroup}>
					<h1>
						Events
					</h1>
					<div>
						{futureEvents.map(event => (
							<EventTile
								key={event.id}
								event={event}
								canBook={true}
							/>
						))}
					</div>
				</div>
			)}

			{pastEvents.length > 0 && (
				<div>
					<h1>
						Past Events
					</h1>
					<div>
						{pastEvents.map(event => (
							<EventTile
								key={event.id}
								event={event}
								canBook={false}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default EventsPage;