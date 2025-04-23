import { StrapiImage } from "@/components/strapi-image/StrapiImage";
import type { Event } from "@/lib/server/content";
import { createClass, formatDate, mdi } from "@/lib/utils";
import Link from "next/link";
import styles from "./EventTile.module.scss";

type Props = {
    event: Event;
    canBook: boolean;
};

/**
 * An event tile on the events list page.
 */
export const EventTile = (props: Props) => {
    return (
        <div
            key={props.event.id}
            className={createClass(
                styles.eventTile,
                !props.canBook ? styles.noBook : null,
            )}
        >
            <div className={styles.content}>
                <StrapiImage
                    className={styles.thumbnail}
                    image={props.event.image}
                    format="medium"
                    alt={props.event.title}
                />

                <div className={styles.details}>
                    <div
                        className={styles.title}
                        dangerouslySetInnerHTML={mdi(props.event.title)}
                    />
                    <div className={styles.date}>
                        {formatDate(props.event.date, "full")}
                    </div>
                </div>
            </div>

            <div className={styles.options}>
                <Link
                    className="button"
                    href={`/events/${props.event.slug}`}
                    aria-label={`View the event '${props.event.title}'`}
                >
                    More Info
                </Link>

                {props.canBook && props.event.link && (
                    <Link
                        className="button button-primary"
                        href={props.event.link}
                        target="_blank"
                        rel="external"
                        aria-label="Book tickets for the event (external)"
                    >
                        Book
                    </Link>
                )}
            </div>
        </div>
    );
};
