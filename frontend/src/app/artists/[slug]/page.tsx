import { IconLink } from "@/components/icon-link/IconLink";
import { ReleaseGrid } from "@/components/release/ReleaseGrid";
import { StrapiImage } from "@/components/strapi-image/StrapiImage";
import { content } from "@/lib/server/content";
import { PageProps } from "@/lib/types";
import { capitalize, md, mdi } from "@/lib/utils";
import type { NextPage } from "next";
import styles from "./Artist.module.scss";

/**
 * An individual artist's bio page
 */
const ArtistPage: NextPage<PageProps> = async ({ params }) => {
    const { slug } = await params;
    const artist = await content.artist(slug);// await cms.getArtist({ slug })
    // .catch(notFound);

    return (
        <main className="container">
            <section className="split-section">
                <StrapiImage
                    className="split-section__image"
                    image={artist.images[0]}
                    format="xlarge"
                    priority
                />

                <div className="split-section__content">
                    <h1 dangerouslySetInnerHTML={mdi(artist.name)} />
                    <div dangerouslySetInnerHTML={md(artist.bio)} />

                    {artist.links.length > 0 && (
                        <div className={styles.socialLinks}>
                            {artist.links.map(link => (
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

            {artist.releases.length > 0 && (
                <section>
                    <h2>
                        Releases
                    </h2>
                    <ReleaseGrid
                        releases={artist.releases}
                        order="date"
                    />
                </section>
            )}
        </main>
    );
};

export default ArtistPage;
