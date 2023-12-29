import { FC } from 'react';
import styles from './ArtistTile.module.scss';
import { Artist } from '@/types/strapi-responses';
import { makeClass, mdi } from '@/lib/utils';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';

type Props = {
	artist: Artist;
};

/**
 * An artist portrait which reveals more details when clicked.
 */
export const ArtistTile: FC<Props> = props => {
	return (
		<a
			href={`/artists/${props.artist.attributes.slug}`}
			className={styles.artist}
		>
			<StrapiImage
				className={styles.artistImage}
				image={props.artist.attributes.images.data[0]}
				format='large'
				alt={props.artist.attributes.name}
			/>

			<div className={styles.artistOverlay}>
				<div
					className={makeClass(
						styles.artistName,
						'overlay-text',
						'overlay-text--small'
					)}
					dangerouslySetInnerHTML={mdi(props.artist.attributes.name)}
				/>
			</div>
		</a>
	);
};