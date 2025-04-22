import type { FC } from "react";
import Link from "next/link";
import styles from "./ArticleTile.module.scss";
import type { Article } from "@/lib/types";
import { formatDate, createClass, mdi } from "@/lib/utils";
import { media } from "@/lib/server/services";

type Props = {
    article: Article;
};

/**
 * An article tile within the news articles list.
 */
export const ArticleTile: FC<Props> = (props) => {
    return (
    // TODO: potentially convert this to StrapiImage (instead of css background image) like other tiles?
        <div className={styles.wrapper}>
            <Link
                className={styles.link}
                style={media.createBackground(
                    props.article.attributes.images.data[0],
                    "xlarge",
                )}
                href={`/news/${props.article.attributes.slug}`}
                aria-label={`View the article '${props.article.attributes.title}'`}
            >
                <div
                    className={createClass(
                        styles.title,
                        "overlay-text",
                    )}
                    dangerouslySetInnerHTML={mdi(props.article.attributes.title)}
                />
                <div
                    className={createClass(
                        styles.author,
                        "overlay-text",
                        "overlay-text--small",
                    )}
                    dangerouslySetInnerHTML={mdi(props.article.attributes.author)}
                />
                <div
                    className={createClass(
                        styles.date,
                        styles.dateAbbr,
                        "overlay-text",
                    )}
                >
                    {formatDate(props.article.attributes.createdAt, "abbreviated")}
                </div>
                <div
                    className={createClass(
                        styles.date,
                        styles.dateFull,
                        "overlay-text",
                    )}
                >
                    {formatDate(props.article.attributes.createdAt, "full")}
                </div>
            </Link>
        </div>
    );
};
