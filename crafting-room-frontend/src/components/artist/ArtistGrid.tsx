import { FC } from 'react';
import styles from './ArtistGrid.module.scss';
import { Artist } from '@/types/strapi-responses';
import { ArtistTile } from '@/components/artist/ArtistTile';

type Props = {
	artists: Artist[];
};

export const ArtistGrid: FC<Props> = props => {
	return (
		<div className={styles.artistGrid}>
			{props.artists.map(artist => (
				<ArtistTile
					key={artist.id}
					artist={artist}
				/>
			))}
		</div>
	);
};