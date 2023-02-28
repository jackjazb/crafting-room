import { useEffect, useState } from "react";
import { Event, resolveImageUrl } from '../utils/api';
import '../css/EventTile.css';
import { nth } from "../utils/helpers";

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_API_KEY);

async function getPaymentUrl(priceId: string) {
	if (!priceId) {
		return undefined;
	}
	// @ts-ignore
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
				price: priceId,
				quantity: 1,
			},
		],
		mode: 'payment',
		success_url: `${process.env.REACT_APP_BASE_URL}/bookingflow/true`,
		cancel_url: `${process.env.REACT_APP_BASE_URL}/bookingflow/false`
	});

	return session.url;
}

async function getPrice(priceId: string) {
	const price = await stripe.prices.retrieve(priceId);
	return price;
}

export function EventTile(props: { key: number, event: Event; }) {
	const [expanded, setExpanded] = useState(false);
	const [paymentUrl, setPaymentUrl] = useState<string>();
	const [priceObj, setPriceObj] = useState<any>();

	const event = props.event;

	const date = new Date(event.attributes.date);
	let day = date.toLocaleString('en-uk', { day: 'numeric' });
	day = day + nth(parseInt(day));
	const weekday = date.toLocaleString('en-uk', { weekday: 'short' });
	const month = date.toLocaleString('en-uk', { month: 'short' });
	const priceId = event.attributes.priceId;

	useEffect(() => {
		getPaymentUrl(priceId).then(setPaymentUrl);
		getPrice(priceId).then(setPriceObj);
	}, [priceId]);

	console.log(priceObj);

	let buyButton;
	let price;

	//upon receiving stripe data, populate event booking fields 
	if (paymentUrl && priceObj) {
		buyButton = (
			<a className="eventOptions" href={paymentUrl}>
				<button className="buyButton" >Book</button>
			</a>);

		let decPrice = priceObj.unit_amount / 100;
		price = decPrice.toLocaleString('en-US', {
			style: 'currency',
			currency: priceObj.currency
		});
	} else {
		buyButton = <></>;
		price = undefined;
	}

	console.log(priceObj);

	return (
		<div className={`eventTile ${expanded ? 'expanded' : ''} `} key={event.id} onClick={() => setExpanded(true)}>
			<img className="eventThumbnail" src={resolveImageUrl(event.attributes.image.data)} alt={event.attributes.title}></img>

			<div className="eventDetails">
				<div className="eventTitle">{event.attributes.title}</div>
				<div className="eventDetails">
					{`${weekday}, ${day} ${month}`} {price ? `~ ${price}` : ''}
				</div >

			</div >
			{buyButton}
		</div >
	);
};;;;
