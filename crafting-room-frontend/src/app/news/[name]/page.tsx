import { Spinner } from "@/components/loading/Spinner";
import styles from './News.module.css';
import { strapiFetch } from "@/lib/strapi-client";
import { ArticlePage } from "@/components/article/ArticlePage";

async function getArticle(name: string) {
    const path = 'articles';
    const params = {
        filters: {
            title: {
                $eqi: name
            }
        },
        populate: {
            images: {
                populate: "*"
            }
        },
    };
    const response = await strapiFetch(path, params);
    return response.data[0];
}

export default async function NewsItem({ params }: { params: { name: string } }) {
    const { name } = params;
    const article = await getArticle(decodeURI(name));
    if (!article) {
        return (
            <Spinner />
        );
    }
    return (
        <ArticlePage article={article} />
    );
}