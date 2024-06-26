import type { FC } from 'react';
import styles from './ArtistGrid.module.scss';
import type { Artist } from '@/lib/types';
import { ArtistTile } from '@/components/artist/ArtistTile';

interface Props {
	artists: Artist[];
}

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
