import Image from 'next/image';
import styles from './Spinner.module.css';

export function Spinner() {

	return (
		<div className={styles.loadingContainer}>
			< img className="loading" src="/loading.svg" alt="" ></img>
		</div >
	);
}