import type { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';
import { EventTile } from '@/components/event/EventTile';
import { cms } from '@/lib/server/services';

export const generateMetadata = async (): Promise<Metadata> => {
	const data = await cms.getEventsPage()
		.catch(notFound);

	return {
		title: 'Crafting Room Recordings • Events',
		description: data.attributes.meta.description
	};
};

const EventsPage: NextPage = async () => {
	const data = await cms.getEvents()
		.catch(notFound);

	//TODO: get current date in uk time
	const currentDate = new Date();

	// Split the list of events into past and future
	const pastEvents = data.filter(event =>
		new Date(event.attributes.date) < currentDate);

	const futureEvents = data.filter(event =>
		!pastEvents.includes(event));

	return (
		<main>
			{futureEvents.length > 0 && (
				<section className='container'>
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
				<section className='container'>
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
