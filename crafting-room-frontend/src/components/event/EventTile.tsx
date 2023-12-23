import { FC } from 'react';
import styles from './EventTile.module.css';
import { StrapiImage } from '@/components/strapi-image/strapi-image';
import { formatDate, markdownInline } from '@/lib/utils';
import { Event } from '@/types/strapi-responses';

/**
 * An event tile on the events list page.
 */
export const EventTile: FC<{ event: Event; canBook: boolean; }> = ({ event, canBook }) => {
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
				<div //TODO -> h2/h3/h4/h5 this
					className={styles.eventTitle}
					dangerouslySetInnerHTML={markdownInline(event.attributes.title)}
				/>

				{/* TODO -> <p> this probably */}
				<div className={styles.eventDetails}>
					{formatDate(event.attributes.date)}
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
