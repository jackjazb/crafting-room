import type { FC } from 'react';
import Link from 'next/link';
import styles from './EventTile.module.scss';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';
import { formatDate, createClass, mdi } from '@/lib/utils';
import type { Event } from '@/lib/types';

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
			<div className={styles.content}>
				<StrapiImage
					className={styles.thumbnail}
					image={props.event.attributes.image.data}
					format='medium'
					alt={props.event.attributes.title}
				/>

				<div className={styles.details}>
					<div
						className={styles.title}
						dangerouslySetInnerHTML={mdi(props.event.attributes.title)}
					/>
					<div className={styles.date}>
						{formatDate(props.event.attributes.date, 'full')}
					</div>
				</div>
			</div>

			<div className={styles.options}>
				<Link
					className='button'
					href={`/events/${props.event.attributes.slug}`}
					aria-label={`View the event '${props.event.attributes.title}'`}
				>
					More Info
				</Link>

				{props.canBook && props.event.attributes.link && (
					<Link
						className='button button-primary'
						href={props.event.attributes.link}
						target='_blank'
						rel='external'
						aria-label='Book tickets for the event (external)'
					>
						Book
					</Link>
				)}
			</div>
		</div>
	);
};
