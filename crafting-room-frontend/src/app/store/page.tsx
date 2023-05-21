import { ReleaseGrid } from '@/components/release/ReleaseGrid';
import { StorePage, strapiFetch } from '@/lib/strapi-client';
import styles from './Store.module.css';

async function getStorePage() {
    const path = 'store-page';
    const params = {
        populate: {
            groups: {
                populate: {
                    releases: {
                        populate: "*"
                    }
                }
            }

        }
    };
    const response = await strapiFetch(path, params);
    return response.data;
}
export default async function Store() {
    const storePage: StorePage = await getStorePage();

    return (
        <div className="container">
            <h5>
                More available on
                <a href="https://craftingroomrecordings.bandcamp.com/"> Bandcamp</a>
            </h5>
            {storePage.attributes.groups.map(group =>
                <div className={styles.releaseGroup}>
                    <h2>{group.header}</h2>
                    <ReleaseGrid columns={4} releases={group.releases.data} />
                </div>
            )}
        </div>
    );
}