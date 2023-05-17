import './EventTile.module.css';
import { Event, resolveImageUrl } from "@/lib/strapi-client";
import { nth } from "@/lib/utils";
import { Stripe } from 'stripe';

const stripeInstance = new Stripe(process.env.STRIPE_API_KEY!, { apiVersion: '2022-11-15' });

async function getPaymentUrl(priceId: string) {
	if (!priceId) {
		return undefined;
	}
	// @ts-ignore
	const session = await stripeInstance.checkout.sessions.create({
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
	if (!priceId) {
		return undefined;
	}
	const price = await stripeInstance.prices.retrieve(priceId);
	return price;
}

export function EventTile(props: { key: number, event: Event; }) {
	const { event } = props;
	const priceId = event.attributes.priceId;
	const paymentUrl = undefined// await getPaymentUrl(priceId);
	const priceObj = undefined //await getPrice(priceId);

	const date = new Date(event.attributes.date);
	let day = date.toLocaleString('en-uk', { day: 'numeric' });
	day = day + nth(parseInt(day));
	const weekday = date.toLocaleString('en-uk', { weekday: 'short' });
	const month = date.toLocaleString('en-uk', { month: 'short' });

	let buyButton;
	let price;

	//upon receiving stripe data, populate event booking fields 
	// if (paymentUrl && priceObj) {
	// 	buyButton = (
	// 		<a className="eventOptions" href={paymentUrl}>
	// 			<button className="buyButton" >Book</button>
	// 		</a>);

	// 	let decPrice = priceObj.unit_amount / 100;
	// 	price = decPrice.toLocaleString('en-US', {
	// 		style: 'currency',
	// 		currency: priceObj.currency
	// 	});
	// } else {
	// 	buyButton = <></>;
	// 	price = undefined;
	// }

	return (
		// use ID here!
		<a className="eventTile" key={event.id} href={`events/${event.id}`}>
			<img className="eventThumbnail" src={resolveImageUrl(event.attributes.image.data)} alt={event.attributes.title}></img>

			<div className="eventDetails">
				<div className="eventTitle">{event.attributes.title}</div>
				<div className="eventDetails">
					{`${weekday}, ${day} ${month}`} {price ? `~ ${price}` : ''}
				</div >

			</div >
			{buyButton}
		</a >
	);
};