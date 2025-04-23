import { ArtistGrid } from "@/components/artist/ArtistGrid";
import { StrapiImage } from "@/components/strapi-image/StrapiImage";
import { content } from "@/lib/server/content";
import { PageProps } from "@/lib/types";
import { createClass, formatDate } from "@/lib/utils";
import { md, mdi } from "@/lib/utils/markdown";
import { NextPage } from "next";
import Link from "next/link";
import styles from "./Event.module.scss";

const EventPage: NextPage<PageProps> = async ({ params }) => {
    const { slug } = await params;

    const event = await content.event(slug);

    const currentDate = new Date();
    const eventDate = new Date(event.date);
    const eventIsInFuture = eventDate > currentDate;

    return (
        <main className="container">
            <section className="split-section">
                <StrapiImage
                    className="split-section__image"
                    image={event.image}
                    format="xlarge"
                    priority
                />

                <div className="split-section__content">
                    <hgroup>
                        <h1 dangerouslySetInnerHTML={mdi(event.title)} />
                        <p className={styles.subtitle}>
                            <span
                                className={styles.venue}
                                dangerouslySetInnerHTML={mdi(event.venue)}
                            />
                            {" "}
                            ▸
                            {" "}
                            <span className={styles.date}>
                                {formatDate(event.date, "numeric")}
                            </span>
                        </p>
                    </hgroup>

                    {event.description && (
                        <div dangerouslySetInnerHTML={md(event.description)} />
                    )}

                    {event.link && eventIsInFuture && (
                        <Link
                            className={createClass(
                                styles.book,
                                "button",
                                "button-primary",
                            )}
                            href={event.link}
                            target="_blank"
                            rel="external"
                            aria-label="Book tickets for the event (external)"
                        >
                            Book Tickets
                        </Link>
                    )}
                </div>
            </section>

            {event.artists && event.artists.length > 0 && (
                <section>
                    <h1>
                        Artists
                    </h1>
                    <ArtistGrid artists={event.artists} />
                </section>
            )}
        </main>
    );
};

export default EventPage;
