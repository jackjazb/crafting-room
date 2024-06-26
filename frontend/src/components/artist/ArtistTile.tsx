import type { FC } from 'react';
import Link from 'next/link';
import styles from './ArtistTile.module.scss';
import type { Artist } from '@/lib/types';
import { createClass, mdi } from '@/lib/utils';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';

interface Props {
	artist: Artist;
}

/**
 * An artist portrait which reveals more details when clicked.
 */
export const ArtistTile: FC<Props> = props => {
	return (
		<Link
			className={styles.link}
			href={`/artists/${props.artist.attributes.slug}`}
			aria-label={`View the artist '${props.artist.attributes.name}'`}
		>
			<StrapiImage
				className={styles.image}
				image={props.artist.attributes.images.data[0]}
				format='large'
				alt={props.artist.attributes.name}
			/>

			<div className={styles.overlay}>
				<div
					className={createClass(
						styles.name,
						'overlay-text'
					)}
					dangerouslySetInnerHTML={mdi(props.artist.attributes.name)}
				/>
			</div>
		</Link>
	);
};
