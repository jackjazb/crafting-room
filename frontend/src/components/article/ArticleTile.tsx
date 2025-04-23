import { Article } from "@/lib/server/content";
import { media } from "@/lib/server/media";
import { createClass, formatDate, mdi } from "@/lib/utils";
import Link from "next/link";
import styles from "./ArticleTile.module.scss";

type Props = {
    article: Article;
};

/**
 * An article tile within the news articles list.
 */
export const ArticleTile = (props: Props) => {
    return (
        <div className={styles.wrapper}>
            <Link
                className={styles.link}
                style={media.createBackground(
                    props.article.images[0],
                    "xlarge",
                )}
                href={`/news/${props.article.slug}`}
                aria-label={`View the article '${props.article.title}'`}
            >
                <div
                    className={createClass(
                        styles.title,
                        "overlay-text",
                    )}
                    dangerouslySetInnerHTML={mdi(props.article.title)}
                />
                <div
                    className={createClass(
                        styles.author,
                        "overlay-text",
                        "overlay-text--small",
                    )}
                    dangerouslySetInnerHTML={mdi(props.article.author)}
                />
                <div
                    className={createClass(
                        styles.date,
                        styles.dateAbbr,
                        "overlay-text",
                    )}
                >
                    {formatDate(props.article.createdAt, "abbreviated")}
                </div>
                <div
                    className={createClass(
                        styles.date,
                        styles.dateFull,
                        "overlay-text",
                    )}
                >
                    {formatDate(props.article.createdAt, "full")}
                </div>
            </Link>
        </div>
    );
};
