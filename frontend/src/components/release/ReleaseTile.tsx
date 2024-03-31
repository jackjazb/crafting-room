import { RiExternalLinkLine } from 'react-icons/ri';
import type { FC } from 'react';
import Link from 'next/link';
import styles from './ReleaseTile.module.scss';
import type { Release } from '@/lib/types';
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
		<div className={styles.wrapper}>
			<StrapiImage
				className={styles.image}
				image={props.release.attributes.artwork.data}
				format='large'
				alt={props.release.attributes.title}
			/>

			<div className={styles.overlay}>
				<div
					className={createClass(
						styles.title,
						'overlay-text'
					)}
					dangerouslySetInnerHTML={mdi(props.release.attributes.title)}
				/>
				<div
					className={createClass(
						styles.artist,
						'overlay-text',
						'overlay-text--small'
					)}
					dangerouslySetInnerHTML={
						mdi(props.release.attributes.artist.data.attributes.name)
					}
				/>

				{props.release.attributes.link && (
					<Link
						className={createClass(
							styles.link,
							'black-button'
						)}
						href={props.release.attributes.link}
						target='_blank'
						rel='external'
						aria-label={`View the release on our Bandcamp '${props.release.attributes.title}'`}
					>
						<RiExternalLinkLine />
						Bandcamp
					</Link>
				)}
			</div>
		</div>
	);
};
