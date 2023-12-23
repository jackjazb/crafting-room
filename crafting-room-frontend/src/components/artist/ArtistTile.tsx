import { FC } from 'react';
import styles from './ArtistTile.module.css';
import { Artist } from '@/types/strapi-responses';
import { backgroundCSS, markdownInline } from '@/lib/utils';

/**
 * An artist portrait which reveals more details when clicked.
 */
export const ArtistTile: FC<{ artist: Artist; }> = ({ artist }) => {
	return (
		<a
			href={`artists/${artist.attributes.name.toLowerCase()}`}
			className={styles.artist}
			style={backgroundCSS(artist.attributes.images.data[0], 'medium')}
		>
			<div //TODO -> h2/h3/h4/h5 this
				className={styles.name}
				dangerouslySetInnerHTML={markdownInline(artist.attributes.name)}
			/>
		</a>
	);
};