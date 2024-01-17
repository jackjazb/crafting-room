import { RxExternalLink } from 'react-icons/rx';
import { FC } from 'react';
import styles from './ReleaseTile.module.scss';
import { Release } from '@/lib/types/strapi-data';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';
import { createClass, mdi } from '@/lib/utils';

interface Props {
	release: Release;
}

/**
 * Renders a single release with a Bandcamp link.
 */
export const ReleaseTile: FC<Props> = props => {
	return (
		<div className={styles.release}>
			<StrapiImage
				className={styles.releaseImage}
				image={props.release.attributes.artwork.data}
				format='large'
				alt={props.release.attributes.title}
			/>

			<div className={styles.releaseOverlay}>
				<div
					className={createClass(
						styles.releaseTitle,
						'overlay-text'
					)}
					dangerouslySetInnerHTML={mdi(props.release.attributes.title)}
				/>
				<div
					className={createClass(
						styles.releaseArtist,
						'overlay-text',
						'overlay-text--small'
					)}
					dangerouslySetInnerHTML={
						mdi(props.release.attributes.artist.data.attributes.name)
					}
				/>

				{props.release.attributes.link && (
					<a
						className={createClass(
							styles.releaseLink,
							'button-black'
						)}
						href={props.release.attributes.link}
						target='_blank'
						rel='noreferrer'
					>
						<RxExternalLink />
						Bandcamp
					</a>
				)}
			</div>
		</div>
	);
};