import { RxExternalLink } from 'react-icons/rx';
import type { FC } from 'react';
import Link from 'next/link';
import styles from './ReleaseTile.module.scss';
import type { Release } from '@/lib/types';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';
import { makeClass, mdi } from '@/lib/utils';

type Props = {
	release: Release;
};

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
					className={makeClass(
						styles.title,
						'overlay-text'
					)}
					dangerouslySetInnerHTML={mdi(props.release.attributes.title)}
				/>
				<div
					className={makeClass(
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
						className={makeClass(
							styles.link,
							'button-black'
						)}
						href={props.release.attributes.link}
						target='_blank'
						rel='external'
					>
						<RxExternalLink />
						Bandcamp
					</Link>
				)}
			</div>
		</div>
	);
};
