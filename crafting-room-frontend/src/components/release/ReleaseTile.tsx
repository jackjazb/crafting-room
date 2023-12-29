import { RxExternalLink } from 'react-icons/rx';
import { FC } from 'react';
import styles from './ReleaseTile.module.scss';
import { Release } from '@/types/strapi-responses';
import { StrapiImage } from '@/components/strapi-image/strapi-image';
import { makeClass, mdi } from '@/lib/utils';

type Props = {
	release: Release;
};

/**
 * Renders a single release with a Bandcamp link.
 */
export const ReleaseTile: FC<Props> = props => {
	return (
		<div className={styles.release}>
			<StrapiImage
				className={styles.releaseImage}
				image={props.release.attributes.artwork.data}
				format='medium'
				alt={props.release.attributes.title}
			/>

			<div className={styles.releaseOverlay}>
				<div
					className={makeClass(
						styles.releaseTitle,
						'overlay-text'
					)}
					dangerouslySetInnerHTML={mdi(props.release.attributes.title)}
				/>
				<div
					className={makeClass(
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
						className={makeClass(
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