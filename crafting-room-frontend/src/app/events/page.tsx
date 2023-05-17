import { EventTile } from "@/components/event/EventTile";
import { Spinner } from "@/components/loading/Spinner";
import { Event, strapiFetch } from "@/lib/strapi-client";

async function getEvents() {
	const path = 'events';
	const params = {
		populate: {
			image: {
				populate: "*"
			}
		},
		sort: ['date']
	};
	const response = await strapiFetch(path, params);
	return response.data;
}

export default async function Events() {
	const events: Array<Event> = await getEvents();

	if (!events) {
		return (<Spinner />);
	}

	return (
		<div className="events container">
			<h1>Events</h1>
			<div className="eventTiles">
				{events.map(event => (
					<EventTile key={event.id} event={event} />
				))}
			</div>
		</div>);
}