import { ArtistBio } from "@/components/artist/ArtistBio";
import { Spinner } from "@/components/loading/Spinner";
import { ReleaseGrid } from "@/components/release/ReleaseGrid";
import { strapiFetch } from "@/lib/strapi-client";

async function getArtist(name: string) {
    const path = 'artists';
    const params = {
        filters: {
            name: {
                $eqi: name
            }
        },
        populate: {
            images: {
                populate: "*"
            },
            releases: {
                populate: "*"
            }
        }
    };
    const response = await strapiFetch(path, params);
    return response.data[0];
}

/**
 * An individual artist's bio page
 * 
 */
export default async function ArtistPage({ params }: { params: { name: string } }) {
    const { name } = params;
    const artist = await getArtist(name as string);


    if (!artist) {
        return (
            <Spinner />
        );
    }
    const imageUrl = process.env.STRAPI_URL + artist.attributes.images.data[0].attributes.url;

    return (
        <div className="container">
            <ArtistBio artist={artist} />
        </div>
    );
}