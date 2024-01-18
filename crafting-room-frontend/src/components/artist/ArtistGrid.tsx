import { FC } from 'react';
import styles from './ArtistGrid.module.scss';
import { Artist } from '@/lib/types/strapi-data';
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