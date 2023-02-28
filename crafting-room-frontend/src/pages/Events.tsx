import { useEffect, useState } from "react";
import { Event, strapiFetch } from "../utils/api";
import { Loading } from "../components/Loading";
import { EventTile } from "../components/EventTile";

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

export function Events() {
	const [events, setEvents]: [Array<Event>, any] = useState([]);

	useEffect(() => {
		getEvents().then(setEvents);
	}, []);

	if (!events) {
		return (<Loading />);
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