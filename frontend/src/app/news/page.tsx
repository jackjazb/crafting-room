import { ArticleTile } from "@/components/article/ArticleTile";
import { content } from "@/lib/server/content";
import type { NextPage } from "next";

const NewsPage: NextPage = async () => {
    const articles = await content.articles();// cms.getArticles()
    // .catch(notFound);

    return (
        <main>
            <section className="container">
                {articles.map(article => (
                    <ArticleTile
                        key={article.id}
                        article={article}
                    />
                ))}
            </section>
        </main>
    );
};

export default NewsPage;
