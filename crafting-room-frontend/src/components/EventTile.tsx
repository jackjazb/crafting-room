import { useState } from "react";
import { Event, resolveImageUrl } from '../utils/api';
import '../css/EventTile.css';
import { nth } from "../utils/helpers";



export function EventTile(props: { key: number, event: Event; }) {
	const [expanded, setExpanded] = useState(false);

	const event = props.event;

	const date = new Date(event.attributes.date);
	let day = date.toLocaleString('en-uk', { day: 'numeric' });
	day = day + nth(parseInt(day));
	const weekday = date.toLocaleString('en-uk', { weekday: 'short' });
	const month = date.toLocaleString('en-uk', { month: 'short' });
	
	return (
		<div className={`eventTile ${expanded ? 'expanded' : ''}`} key={event.id} onClick={() => setExpanded(true)}>
			<img className="eventThumbnail" src={resolveImageUrl(event.attributes.image.data)} alt={event.attributes.title}></img>

			<div className="eventDetails">
				<div className="eventTitle">{event.attributes.title}</div>
				<div className="eventDate">{`${weekday}, ${day} ${month}`}</div>
			</div>

		</div>
	);
}
