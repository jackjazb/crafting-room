import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { EventTile } from '@/components/event/EventTile';
import { cms } from '@/lib/server/services';

const EventsPage: NextPage = async () => {
	const events = await cms.getEvents().catch(notFound);

	//TODO: get current date in uk time
	const currentDate = new Date();

	// Split the list of events into past and future
	const pastEvents = events.filter(event =>
		new Date(event.attributes.date) < currentDate);

	const futureEvents = events.filter(event =>
		!pastEvents.includes(event));

	return (
		<main className='container'>
			{futureEvents.length > 0 && (
				<section>
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
				</section>
			)}

			{pastEvents.length > 0 && (
				<section>
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
				</section>
			)}
		</main>
	);
};

export default EventsPage;
