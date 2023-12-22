import { FC } from 'react';
import styles from './Article.module.css';
import { Article as IArticle } from '@/types/strapi-responses';
import { StrapiImage } from '@/components/strapi-image/strapi-image';
import { md } from '@/lib/utils';

/**
 * An article on a news article page.
 */
export const Article: FC<{ article: IArticle; }> = ({ article }) => {
    return (
        <>
            <StrapiImage
                className={styles.articleTopImage}
                image={article.attributes.images.data[0]}
                format='medium'
                priority
            />

            <article className='container'>
                <h1 dangerouslySetInnerHTML={{ __html: md.renderInline(article.attributes.title) }} />

                {article.attributes.author && (
                    <h5
                        className={styles.author}
                        dangerouslySetInnerHTML={{ __html: md.renderInline(article.attributes.author) }}
                    />
                )}

                <div
                    className={styles.articleContent}
                    dangerouslySetInnerHTML={{ __html: md.render(article.attributes.content) }}
                />
            </article>
        </>
    );
};