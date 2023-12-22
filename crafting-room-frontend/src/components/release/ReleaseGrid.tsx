import { FC } from 'react';
import styles from './ReleaseGrid.module.scss';
import { ReleaseTile } from './ReleaseTile';
import { Release } from '@/types/strapi-responses';

interface ReleaseGridProps {
	releases: Release[];
	columns: number;
	dateOrder?: boolean;
}

const defaultProps: Partial<ReleaseGridProps> = {
	dateOrder: false
};

/**
 * Renders a grid of release tiles. Columns is set only for desktop and is
 * overriden in CSS on smaller screens.
 *
 * If `dateOrder` is set to true, releases are sorted on date.
 */
export const ReleaseGrid: FC<ReleaseGridProps> = props => {
	const { releases, columns, dateOrder } = { ...defaultProps, ...props };

	if (dateOrder) {
		releases.sort((a, b) => {
			const aDate = new Date(a.attributes.date);
			const bDate = new Date(b.attributes.date);

			if (aDate > bDate)
				return -1;
			else if (aDate < bDate)
				return 1;
			else
				return 0;
		});
	}

	return (
		<div
			className={styles.releaseGrid}
			style={{ '--columns': columns } as React.CSSProperties}
		>
			{releases.map(release => (
				<ReleaseTile
					key={release.id}
					release={release}
				/>
			))}
		</div>
	);
};