import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { ArtistBio } from '@/components/artist/ArtistBio';
import { strapi } from '@/lib/api/strapi-client';

/**
 * An individual artist's bio page
 */
const ArtistPage: NextPage<{ params: { name: string; }; }> = async ({ params }) => {
    const { name } = params;
    const artist = await strapi.getArtist(decodeURI(name));

    if (!artist)
        notFound();

    return (
        <div className='container'>
            <ArtistBio artist={artist} />
        </div>
    );
};

export default ArtistPage;