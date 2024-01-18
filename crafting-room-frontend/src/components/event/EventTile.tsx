import { FC } from 'react';
import Link from 'next/link';
import styles from './EventTile.module.scss';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';
import { formatDate, createClass, mdi } from '@/lib/utils';
import { Event } from '@/lib/types/strapi-data';

interface Props {
	event: Event;
	canBook: boolean;
}

/**
 * An event tile on the events list page.
 */
export const EventTile: FC<Props> = props => {
	return (
		<div
			key={props.event.id}
			className={createClass(
				styles.eventTile,
				!props.canBook ? styles.noBook : null
			)}
		>
			<div className={styles.eventMain}>
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
					<div className={styles.eventDate}>
						{formatDate(props.event.attributes.date)}
					</div>
				</div>
			</div>

			<div className={styles.eventOptions}>
				<Link
					href={`/events/${props.event.attributes.slug}`}
					className='button'
				>
					More Info
				</Link>

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
