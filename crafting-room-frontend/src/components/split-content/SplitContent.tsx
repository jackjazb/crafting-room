import { FC, PropsWithChildren } from 'react';
import styles from './SplitContent.module.scss';
import { StrapiImage } from '@/components/strapi-image/strapi-image';
import { ImageData } from '@/types/strapi-types';

type Props = PropsWithChildren<{ image: ImageData | null | undefined; }>;

/**
 * The bio page for a single artist.
 */
export const SplitContentSection: FC<Props> = props => {
	return (
		<section className={styles.splitContent}>
			<StrapiImage
				className={styles.image}
				image={props.image}
				format='large'
				priority
			/>
			<div className={styles.content}>
				{props.children}
			</div>
		</section>
	);
};