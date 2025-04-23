import { StrapiImage } from "@/components/strapi-image/StrapiImage";
import { Artist } from "@/lib/server/content";
import { createClass, mdi } from "@/lib/utils";
import Link from "next/link";
import styles from "./ArtistTile.module.scss";

type Props = {
    artist: Artist;
};

/**
 * An artist portrait which reveals more details when clicked.
 */
export const ArtistTile = (props: Props) => {
    return (
        <Link
            className={styles.link}
            href={`/artists/${props.artist.slug}`}
            aria-label={`View the artist '${props.artist.name}'`}
        >
            <StrapiImage
                className={styles.image}
                image={props.artist.images[0]}
                format="large"
                alt={props.artist.name}
            />

            <div className={styles.overlay}>
                <div
                    className={createClass(
                        styles.name,
                        "overlay-text",
                    )}
                    dangerouslySetInnerHTML={mdi(props.artist.name)}
                />
            </div>
        </Link>
    );
};
