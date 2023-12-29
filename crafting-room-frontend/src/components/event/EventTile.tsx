import { FC } from 'react';
import styles from './EventTile.module.css';
import { StrapiImage } from '@/components/strapi-image/strapi-image';
import { formatDate, makeClass, mdi } from '@/lib/utils';
import { Event } from '@/types/strapi-responses';

type Props = {
	event: Event;
	canBook: boolean;
};

/**
 * An event tile on the events list page.
 */
export const EventTile: FC<Props> = props => {
	return (
		<div
			key={props.event.id}
			className={makeClass(
				styles.eventTile,
				!props.canBook ? styles.noBook : null
			)}
		>
			<StrapiImage
				className={styles.eventThumbnail}
				image={props.event.attributes.image.data}
				format='medium'
				alt={props.event.attributes.title}
			/>

			<div className={styles.eventDetails}>
				<div
					className={styles.eventTitle}
					dangerouslySetInnerHTML={mdi(props.event.attributes.title)}
				/>
				<div className={styles.eventDetails}>
					{formatDate(props.event.attributes.date)}
				</div>
			</div>

			<div className={styles.eventOptions}>
				<a
					href={`/events/${props.event.attributes.slug}`}
					className='button'
				>
					More Info
				</a>

				{props.canBook && props.event.attributes.link && (
					<a
						href={props.event.attributes.link}
						className='button button-primary'
					>
						Book
					</a>
				)}
			</div>
		</div>
	);
};
