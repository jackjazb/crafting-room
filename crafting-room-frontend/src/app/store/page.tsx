import { NextPage } from 'next';
import styles from './Store.module.css';
import { ReleaseGrid } from '@/components/release/ReleaseGrid';
import { strapi } from '@/lib/api/strapi-client';
import { markdownInline } from '@/lib/utils';

const StorePage: NextPage = async () => {
    const res = await strapi.getStorePage();
    const storePage = res.data;

    return (
        <div className='container'>
            <h5>
                More available on
                {' '}
                <a
                    href='https://craftingroomrecordings.bandcamp.com/'
                    target='_blank'
                    rel='noreferrer'
                >
                    Bandcamp
                </a>
            </h5>

            {storePage.attributes.groups.map(group => (
                <div
                    key={group.id}
                    className={styles.releaseGroup}
                >
                    <h2 dangerouslySetInnerHTML={markdownInline(group.header)} />

                    <ReleaseGrid
                        columns={4}
                        releases={group.releases.data}
                    />
                </div>
            ))}
        </div>
    );
};

export default StorePage;