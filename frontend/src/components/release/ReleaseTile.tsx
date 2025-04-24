import { StrapiImage } from "@/components/strapi-image/StrapiImage";
import { Release } from "@/lib/server/content";
import { createClass, mdi } from "@/lib/utils";
import { RiExternalLinkLine } from "react-icons/ri";
import styles from "./ReleaseTile.module.scss";

type Props = {
    release: Release;
};

/**
 * Renders a single release with a Bandcamp link.
 */
export const ReleaseTile = (props: Props) => {
    return (
        <div className={styles.wrapper}>
            <StrapiImage
                className={styles.image}
                image={props.release.artwork}
                format="large"
                alt={props.release.title}
            />

            <div className={styles.overlay}>
                <div
                    className={createClass(
                        styles.title,
                        "overlay-text",
                    )}
                    dangerouslySetInnerHTML={mdi(props.release.title)}
                />
                <div
                    className={createClass(
                        styles.artist,
                        "overlay-text",
                        "overlay-text--small",
                    )}
                    dangerouslySetInnerHTML={
                        mdi(props.release.artist?.name ?? "")
                    }
                />

                {props.release.link && (
                    <a
                        class="overlay"

                        href={props.release.link}
                        target="_blank"
                        rel="external"
                        aria-label={`View the release on our Bandcamp '${props.release.title}'`}
                    >
                        <RiExternalLinkLine />
                        Bandcamp
                    </a>
                )}
            </div>
        </div>
    );
};
