import { FC, PropsWithChildren } from 'react';
import styles from './SplitContent.module.scss';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';
import { Image } from '@/types/strapi';

type Props = PropsWithChildren<{ image: Image; }>;

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