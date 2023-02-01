import { Release, resolveImageUrl } from "../utils/api";

export function ReleaseTile(props: { key: number, release: Release; }) {
	const release = props.release;
	
	return (
		<div key={release.id} className="release">
			<img src={resolveImageUrl(release.attributes.artwork.data)} alt={release.attributes.title}></img>
			<div className="releaseOverlay">
				<div className="releaseTitle">{release.attributes.title}</div>
				<div className="releaseArtist">{release.attributes.artist.data.attributes.name}</div>
			</div>
		</div>
	);
}