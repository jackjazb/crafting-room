import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import styles from './Artists.module.scss';
import { cms } from '@/lib/server/services';
import { ArtistGrid } from '@/components/artist/ArtistGrid';
import { createClass, mdi } from '@/lib/utils';

/**
 * The directory page for all artists.
 */
const ArtistsPage: NextPage = async () => {
	const artistsPage = await cms.getArtistsPage()
		.catch(notFound);

	const activeGroups = artistsPage.attributes.groups;
	const inactive = artistsPage.attributes.inactive.artists.data;

	return (
		<main>
			{activeGroups.length > 0 && activeGroups.map(group => (
				(group.artists.data.length > 0 && (
					<section
						key={group.id}
						className='container'
					>
						<h2 dangerouslySetInnerHTML={mdi(group.header)} />
						<ArtistGrid artists={group.artists.data} />
					</section>
				))
			))}

			{inactive.length > 0 && (
				<section
					className={createClass(
						styles.inactive,
						'container'
					)}
				>
					<h2 dangerouslySetInnerHTML={mdi(artistsPage.attributes.inactive.header)} />
					<ArtistGrid artists={inactive} />
				</section>
			)}
		</main>
	);
};

export default ArtistsPage;
