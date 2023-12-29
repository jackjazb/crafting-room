import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import styles from './Article.module.scss';
import { strapi } from '@/lib/server/utils';
import { StrapiImage } from '@/components/strapi-image/strapi-image';
import { mdi, md } from '@/lib/utils';

type ServerProps = {
    params: { slug: string; };
};

const ArticlePage: NextPage<ServerProps> = async props => {
    const { slug } = props.params;
    const article = await strapi.getArticle({ slug }).catch(notFound);

    return (
        <main>
            <section>
                <StrapiImage
                    className={styles.articleTopImage}
                    image={article.attributes.images.data[0]}
                    format='xlarge'
                    priority
                />

                <article className='container'>
                    <h1 dangerouslySetInnerHTML={mdi(article.attributes.title)} />
                    <h5
                        className={styles.author}
                        dangerouslySetInnerHTML={mdi(article.attributes.author)}
                    />
                    <div dangerouslySetInnerHTML={md(article.attributes.content)} />
                </article>
            </section>
        </main>
    );
};

export default ArticlePage;