import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ReleaseGrid } from '@/components/release/ReleaseGrid';
import { cms } from '@/lib/server/services';
import { mdi } from '@/lib/utils';

const StorePage: NextPage = async () => {
    const storePage = await cms.getStorePage().catch(notFound);

    return (
        <main className='container'>
            <h5>
                More available on
                {' '}
                <Link
                    href='https://craftingroomrecordings.bandcamp.com/'
                    target='_blank'
                    rel='external'
                >
                    Bandcamp
                </Link>
            </h5>

            {storePage.attributes.groups.map(group => (
                <section key={group.id}>
                    <h2 dangerouslySetInnerHTML={mdi(group.header)} />
                    <ReleaseGrid releases={group.releases.data} />
                </section>
            ))}
        </main>
    );
};

export default StorePage;
