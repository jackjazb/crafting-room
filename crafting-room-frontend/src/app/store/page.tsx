import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { ReleaseGrid } from '@/components/release/ReleaseGrid';
import { strapi } from '@/lib/server-utils';
import { mdi } from '@/lib/utils';

const StorePage: NextPage = async () => {
    const storePage = await strapi.getStorePage().catch(notFound);

    return (
        <div className='container'>
            <section>
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
                    <section key={group.id}>
                        <h2 dangerouslySetInnerHTML={mdi(group.header)} />

                        <ReleaseGrid releases={group.releases.data} />
                    </section>
                ))}
            </section>
        </div>
    );
};

export default StorePage;