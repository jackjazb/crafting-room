import { FC } from 'react';
import styles from './ArtistTile.module.css';
import { Artist } from '@/types/strapi-responses';
import { strapi } from '@/lib/api/strapi-client';
import { md } from '@/lib/utils';

/**
 * An artist portrait which reveals more details when clicked.
 */
export const ArtistTile: FC<{ artist: Artist; }> = ({ artist }) => {
	return (
		<a
			href={`artists/${artist.attributes.name.toLowerCase()}`}
			className={styles.artist}
			style={{ backgroundImage: `url(${strapi.imageFormat('medium', artist.attributes.images.data[0]).url})` }}
		>
			<div
				className={styles.name}
				dangerouslySetInnerHTML={{ __html: md.renderInline(artist.attributes.name) }}
			/>
		</a>
	);
};