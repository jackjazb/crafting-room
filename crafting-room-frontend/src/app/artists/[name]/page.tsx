import { ArtistBio } from "@/components/artist/ArtistBio";
import { strapiFetch } from "@/lib/strapi-client";
import { notFound } from "next/navigation";

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
            },
            links: {
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
    const artist = await getArtist(decodeURI(name) as string);

    if (!artist) {
        notFound();
    }
    return (
        <div className="container">
            <ArtistBio artist={artist} />
        </div>
    );
}