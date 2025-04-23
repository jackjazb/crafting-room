import { ReleaseGrid } from "@/components/release/ReleaseGrid";
import { content } from "@/lib/server/content";
import { mdi } from "@/lib/utils";
import type { NextPage } from "next";
import Link from "next/link";
import styles from "./Store.module.scss";

const StorePage: NextPage = async () => {
    const storePage = await content.storePage();// await cms.getStorePage()
    // .catch(notFound);

    return (
        <main className="container">
            <p className={styles.bandcampMessage}>
                More available on
                {" "}
                <Link
                    href="https://craftingroomrecordings.bandcamp.com/"
                    target="_blank"
                    rel="external"
                    aria-label="Visit our Bandcamp"
                >
                    Bandcamp
                </Link>
            </p>

            {storePage.groups.map(group => (
                <section key={group.id}>
                    <h2 dangerouslySetInnerHTML={mdi(group.header)} />
                    <ReleaseGrid releases={group.releases} />
                </section>
            ))}
        </main>
    );
};

export default StorePage;
