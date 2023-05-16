import { Release, resolveImageUrl } from "@/lib/strapi-client";
import Image from "next/image";
import { RxExternalLink } from "react-icons/rx";
import styles from './ReleaseGrid.module.css';

/**
 * Renders a single release with a Bandcamp link -  
 * 
 */
export function ReleaseTile(props: { key: number, release: Release; }) {
	const release = props.release;
	return (
		<div key={release.id} className={styles.release}>
			<img src={resolveImageUrl(release.attributes.artwork.data)} alt={release.attributes.title} />
			<div className={styles.releaseOverlay}>

				<div className={styles.releaseTitle}>{release.attributes.title}</div>
				<div className={styles.releaseArtist}>{release.attributes.artist.data.attributes.name}</div>
				{release.attributes.link ?
					<a href={release.attributes.link}>
						<div className={styles.releaseLink} ><RxExternalLink />Bandcamp</div>
					</a>
					: undefined
				}
			</div>
		</div>
	);
}