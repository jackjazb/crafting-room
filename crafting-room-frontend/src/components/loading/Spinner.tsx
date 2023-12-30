import Image from 'next/image';
import type { FC } from 'react';
import styles from './Spinner.module.scss';

/**
 * The loading spinner icon.
 */
export const Spinner: FC = () => {
	return (
		<div className={styles.loadingContainer}>
			<Image
				src='/loading.svg'
				alt='Loading...'
				width={50}
				height={50}
				priority
			/>
		</div>
	);
};
