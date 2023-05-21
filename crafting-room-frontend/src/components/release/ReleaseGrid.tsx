import { Release } from "@/lib/strapi-client";
import styles from './ReleaseGrid.module.css';
import { ReleaseTile } from "./ReleaseTile";

interface ReleaseGridProps {
	releases: Array<Release>;
	columns: number;
	dateOrder?: boolean;
}

const defaultProps: Partial<ReleaseGridProps> = {
	dateOrder: false
}

/**
 * Renders a grid of release tiles. Columns is set only for desktop and is overriden in CSS on smaller screens.
 * 
 * If dateOrder is set to true, releases are sorted on date.
 */
export function ReleaseGrid(props: ReleaseGridProps) {
	props = { ...defaultProps, ...props };
	let { releases, columns, dateOrder } = props;
	if (dateOrder) {
		releases.sort((a, b) => {
			const aDate = new Date(a.attributes.date);
			const bDate = new Date(b.attributes.date);

			if (aDate > bDate) {
				return -1;
			}
			if (aDate < bDate) {
				return 1;
			}
			return 0;
		});
	}


	return (
		<div className={styles.releaseGrid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
			{releases.map(release => (
				<ReleaseTile key={release.id} release={release} />
			)
			)}
		</div>
	);
}