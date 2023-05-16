import Image from 'next/image';
import styles from './Loading.module.css';

export function Loading() {

	return (
		<div className={styles.loadingContainer}>
			< img className="loading" src="/loading.svg" alt="" ></img>
		</div >
	);
}