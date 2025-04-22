import type { NextPage } from "next";
import { notFound } from "next/navigation";
import styles from "./Artist.module.scss";
import { cms } from "@/lib/server/services";
import { ReleaseGrid } from "@/components/release/ReleaseGrid";
import { mdi, md, capitalize } from "@/lib/utils";
import { IconLink } from "@/components/icon-link/IconLink";
import { StrapiImage } from "@/components/strapi-image/StrapiImage";

type ServerProps = {
    params: { slug: string; };
};

/**
 * An individual artist's bio page
 */
const ArtistPage: NextPage<ServerProps> = async (props) => {
    const { slug } = props.params;
    const artist = await cms.getArtist({ slug })
        .catch(notFound);

    return (
        <main className="container">
            <section className="split-section">
                <StrapiImage
                    className="split-section__image"
                    image={artist.attributes.images.data[0]}
                    format="xlarge"
                    priority
                />

                <div className="split-section__content">
                    <h1 dangerouslySetInnerHTML={mdi(artist.attributes.name)} />
                    <div dangerouslySetInnerHTML={md(artist.attributes.bio)} />

                    {artist.attributes.links.length > 0 && (
                        <div className={styles.socialLinks}>
                            {artist.attributes.links.map(link => (
                                <IconLink
                                    key={link.link}
                                    href={link.link}
                                    icon={link.linktype}
                                    aria-label={`Visit the artist's ${capitalize(link.linktype)}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {artist.attributes.releases.data.length > 0 && (
                <section>
                    <h2>
                        Releases
                    </h2>
                    <ReleaseGrid
                        releases={artist.attributes.releases.data}
                        order="date"
                    />
                </section>
            )}
        </main>
    );
};

export default ArtistPage;
