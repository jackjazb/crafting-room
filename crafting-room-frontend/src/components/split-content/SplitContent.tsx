import type { FC, PropsWithChildren } from 'react';
import styles from './SplitContent.module.scss';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';
import type { Image } from '@/lib/types';

type Props = PropsWithChildren<{ image: Image; }>;

export const SplitContentSection: FC<Props> = props => {
	return (
		<section className={styles.wrapper}>
			<StrapiImage
				className={styles.image}
				image={props.image}
				format='xlarge'
				priority
			/>
			<div className={styles.content}>
				{props.children}
			</div>
		</section>
	);
};
