import Image from 'next/image';
import { FC } from 'react';
import styles from './Spinner.module.css';

/**
 * The loading spinner icon.
 */
export const Spinner: FC = () => {
	return (
		<div className={styles.loadingContainer}>
			<Image
				className='loading'
				src='/loading.svg'
				alt=''
				width='64'
				height='64'
				priority
			/>
		</div>
	);
};