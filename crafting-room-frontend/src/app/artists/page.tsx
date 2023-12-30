import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import styles from './Artists.module.scss';
import { strapi } from '@/lib/server/services';
import { ArtistGrid } from '@/components/artist/ArtistGrid';

/**
 * The directory page for all artists.
 */
export const ArtistsPage: NextPage = async () => {
	const artistsPage = await strapi.getArtistsPage().catch(notFound);

	const activeGroups = artistsPage.attributes.groups;
	const inactive = artistsPage.attributes.inactive.artists.data;

	return (
		<main className='container'>
			{activeGroups.length > 0 && activeGroups.map(group => (
				(group.artists.data.length > 0 && (
					<section key={group.id}>
						<h2>
							{group.header}
						</h2>
						<ArtistGrid artists={group.artists.data} />
					</section>
				))
			))}

			{inactive.length > 0 && (
				<section className={styles.inactive}>
					<h2>
						{artistsPage.attributes.inactive.header}
					</h2>
					<ArtistGrid artists={inactive} />
				</section>
			)}
		</main>
	);
};

export default ArtistsPage;