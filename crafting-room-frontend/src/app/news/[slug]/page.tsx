import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { Article } from '@/components/article/Article';
import { strapi } from '@/lib/server/utils';

type ServerProps = {
    params: { slug: string; };
};

const ArticlePage: NextPage<ServerProps> = async props => {
    const { slug } = props.params;
    const article = await strapi.getArticle({ slug }).catch(notFound);

    return (
        <main>
            <section>
                <Article article={article} />
            </section>
        </main>
    );
};

export default ArticlePage;