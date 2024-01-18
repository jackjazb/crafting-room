import { FC, PropsWithChildren } from 'react';
import styles from './SplitContent.module.scss';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';
import { Image } from '@/lib/types/strapi';
import { createClass } from '@/lib/utils';

interface Props extends PropsWithChildren<{
	className?: string;
	image: Image;
}> { }

export const SplitContentSection: FC<Props> = props => {
	return (
		<section
			className={createClass(
				styles.splitContent,
				props.className
			)}
		>
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