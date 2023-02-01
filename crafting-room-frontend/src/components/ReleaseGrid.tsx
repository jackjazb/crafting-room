import { Release, resolveImageUrl } from "../utils/api";
import { useMediaQuery } from "react-responsive";
import '../css/ReleaseGrid.css';
import { ReleaseTile } from "./ReleaseTile";

/**
 * Renders a release image with bandcamp player and information
 * @param release a release 
 * @returns 
 */
export function ReleaseGrid(props: { columns: number, releases: Array<Release>; }) {
	const releases = props.releases;
	const columns = props.columns;

	//choose whether to override the provided column number for mobile
	const isDesktop = useMediaQuery({ query: '(min-width: 700px)' });
	const nColumns = isDesktop ? columns : 1;
	console.log(isDesktop);
	return (
		<div className="releases" style={{ gridTemplateColumns: `repeat(${nColumns}, 1fr)` }}>
			{releases.map(release => (
				<ReleaseTile key={release.id} release={release} />
			)
			)}
		</div>
	);
}