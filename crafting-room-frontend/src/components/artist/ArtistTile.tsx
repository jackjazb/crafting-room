import type { FC } from 'react';
import Link from 'next/link';
import styles from './ArtistTile.module.scss';
import type { Artist } from '@/lib/types';
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
		<Link
			className={styles.link}
			href={`/artists/${props.artist.attributes.slug}`}
		>
			<StrapiImage
				className={styles.image}
				image={props.artist.attributes.images.data[0]}
				format='large'
				alt={props.artist.attributes.name}
			/>

			<div className={styles.overlay}>
				<div
					className={makeClass(
						styles.name,
						'overlay-text',
						'overlay-text--small'
					)}
					dangerouslySetInnerHTML={mdi(props.artist.attributes.name)}
				/>
			</div>
		</Link>
	);
};
