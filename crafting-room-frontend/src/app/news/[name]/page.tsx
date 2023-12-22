import { notFound } from 'next/navigation';
import { NextPage } from 'next';
import { Article } from '@/components/article/Article';
import { strapi } from '@/lib/api/strapi-client';

const ArticlePage: NextPage<{ params: { name: string; }; }> = async ({ params }) => {
    const { name } = params;
    const article = await strapi.getArticle(decodeURI(name));

    if (!article)
        notFound();

    return (
        <Article article={article} />
    );
};

export default ArticlePage;