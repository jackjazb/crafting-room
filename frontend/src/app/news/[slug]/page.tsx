import { StrapiImage } from "@/components/strapi-image/StrapiImage";
import { content } from "@/lib/server/content";
import { PageProps } from "@/lib/types";
import { formatDate, md, mdi } from "@/lib/utils";
import type { NextPage } from "next";
import styles from "./Article.module.scss";

const ArticlePage: NextPage<PageProps> = async ({ params }) => {
    const { slug } = await params;
    const article = await content.article(slug);

    return (
        <main>
            <StrapiImage
                className={styles.image}
                image={article.images[0]}
                format="source"
                priority
            />

            <section className="container">
                <hgroup>
                    <h1 dangerouslySetInnerHTML={mdi(article.title)} />
                    <p className={styles.subtitle}>
                        <span className={styles.date}>
                            {formatDate(article.createdAt, "numeric")}
                        </span>
                        {" "}
                        ▸
                        {" "}
                        <span
                            className={styles.author}
                            dangerouslySetInnerHTML={mdi(article.author)}
                        />
                    </p>
                </hgroup>
                <div dangerouslySetInnerHTML={md(article.content)} />
            </section>
        </main>
    );
};

export default ArticlePage;
