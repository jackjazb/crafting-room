import { FC } from 'react';
import styles from './EventTile.module.css';
import { StrapiImage } from '@/components/strapi-image/strapi-image';
import { getDateParts, md } from '@/lib/utils';
import { Event } from '@/types/strapi-responses';

/**
 * An event tile on the events list page.
 */
export const EventTile: FC<{ event: Event; canBook: boolean; }> = ({ event, canBook }) => {
	const { day, weekday, month } = getDateParts(event.attributes.date);

	const bookLink = event.attributes.link && (
		<a href={event.attributes.link}>
			<button className='button-primary'>
				Book
			</button>
		</a>
	);

	return (
		<div
			key={event.id}
			className={`${styles.eventTile} ${!canBook ? styles.noBook : ''}`}
		>
			<StrapiImage
				className={styles.eventThumbnail}
				image={event.attributes.image.data}
				format='medium'
				alt={event.attributes.title}
			/>

			<div className={styles.eventDetails}>
				<div
					className={styles.eventTitle}
					dangerouslySetInnerHTML={{ __html: md.renderInline(event.attributes.title) }}
				/>

				<div className={styles.eventDetails}>
					{`${weekday}, ${day} ${month}`}
				</div>
			</div>

			{canBook && (
				<div className={styles.eventOptions}>
					<a href={`events/${event.id}`}>
						<button>
							More Info
						</button>
					</a>
					{bookLink}
				</div>
			)}
		</div>
	);
};
