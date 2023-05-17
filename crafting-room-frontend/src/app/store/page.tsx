import { ReleaseGrid } from '@/components/release/ReleaseGrid';
import { strapiFetch } from '@/lib/strapi-client';

async function getReleases() {
    const path = 'releases';
    const params = {
        populate: {
            artwork: {
                populate: "*"
            },
            artist: {
                populate: "*"
            }
        },
        sort: ['date:desc']
    };
    const response = await strapiFetch(path, params);
    return response.data;
}

export default async function Store() {
    const releases = await getReleases();

    return (
        <div className="container">
            <h1>Store</h1>
            <h5>
                More available on
                <a href="https://craftingroomrecordings.bandcamp.com/"> Bandcamp</a>
            </h5>
            <ReleaseGrid columns={4} releases={releases} />
        </div>
    );
}