import { RxExternalLink } from 'react-icons/rx';
import { FC } from 'react';
import styles from './ReleaseTile.module.scss';
import { Release } from '@/types/strapi-responses';
import { StrapiImage } from '@/components/strapi-image/strapi-image';
import { markdownInline } from '@/lib/utils';

/**
 * Renders a single release with a Bandcamp link.
 */
export const ReleaseTile: FC<{ release: Release; }> = ({ release }) => {
	return (
		<div
			key={release.id}
			className={styles.release}
		>
			<StrapiImage
				className={styles.releaseImage}
				image={release.attributes.artwork.data}
				format='medium'
				alt={release.attributes.title}
			/>

			<div className={styles.releaseOverlay}>
				<div //TODO -> h2/h3/h4/h5 this
					className={styles.releaseTitle}
					dangerouslySetInnerHTML={markdownInline(release.attributes.title)}
				/>

				<div //TODO -> h2/h3/h4/h5 this (lower than above)
					className={styles.releaseArtist}
					dangerouslySetInnerHTML={markdownInline(release.attributes.artist.data.attributes.name)}
				/>

				{release.attributes.link && (
					<a
						className={styles.releaseLink}
						href={release.attributes.link}
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