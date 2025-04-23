import { ArtistGrid } from "@/components/artist/ArtistGrid";
import { content } from "@/lib/server/content";
import { createClass, mdi } from "@/lib/utils";
import type { NextPage } from "next";
import styles from "./Artists.module.scss";

/**
 * The directory page for all artists.
 */
const ArtistsPage: NextPage = async () => {
    const artistsPage = await content.artistsPage();// await cms.getArtistsPage()
    // .catch(notFound);

    const activeGroups = artistsPage.groups;
    const inactive = artistsPage.inactive.artists;

    return (
        <main>
            {activeGroups.length > 0 && activeGroups.map(group => (
                (group.artists.length > 0 && (
                    <section
                        key={group.id}
                        className="container"
                    >
                        <h2 dangerouslySetInnerHTML={mdi(group.header)} />
                        <ArtistGrid artists={group.artists} />
                    </section>
                ))
            ))}

            {inactive.length > 0 && (
                <section
                    className={createClass(
                        styles.inactive,
                        "container",
                    )}
                >
                    <h2 dangerouslySetInnerHTML={mdi(artistsPage.inactive.header)} />
                    <ArtistGrid artists={inactive} />
                </section>
            )}
        </main>
    );
};

export default ArtistsPage;
