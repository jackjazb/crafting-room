import type { NextPage } from "next";
import { notFound } from "next/navigation";
import styles from "./Article.module.scss";
import { cms } from "@/lib/server/services";
import { StrapiImage } from "@/components/strapi-image/StrapiImage";
import { mdi, md, formatDate } from "@/lib/utils";

type ServerProps = {
    params: { slug: string; };
};

const ArticlePage: NextPage<ServerProps> = async (props) => {
    const { slug } = props.params;
    const article = await cms.getArticle({ slug })
        .catch(notFound);

    return (
        <main>
            <StrapiImage
                className={styles.image}
                image={article.attributes.images.data[0]}
                format="source"
                priority
            />

            <section className="container">
                <hgroup>
                    <h1 dangerouslySetInnerHTML={mdi(article.attributes.title)} />
                    <p className={styles.subtitle}>
                        <span className={styles.date}>
                            {formatDate(article.attributes.createdAt, "numeric")}
                        </span>
                        {" "}
                        ▸
                        {" "}
                        <span
                            className={styles.author}
                            dangerouslySetInnerHTML={mdi(article.attributes.author)}
                        />
                    </p>
                </hgroup>
                <div dangerouslySetInnerHTML={md(article.attributes.content)} />
            </section>
        </main>
    );
};

export default ArticlePage;
