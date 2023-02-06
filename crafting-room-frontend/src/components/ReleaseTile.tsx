import { Release, resolveImageUrl } from "../utils/api";
import { RxExternalLink } from "react-icons/rx";

/**
 * Renders a single release with a Bandcamp link -  
 * 
 */
export function ReleaseTile(props: { key: number, release: Release; }) {
	const release = props.release;

	return (
		<div key={release.id} className="release">
			<img src={resolveImageUrl(release.attributes.artwork.data)} alt={release.attributes.title}></img>
			<div className="releaseOverlay">
				<div className="releaseTitle">{release.attributes.title}</div>
				<div className="releaseArtist">{release.attributes.artist.data.attributes.name}</div>
				{release.attributes.link ?
					<a href={release.attributes.link}>
						<div className="releaseLink" ><RxExternalLink />Bandcamp</div>
					</a>
					: undefined
				}
			</div>
		</div>
	);
}