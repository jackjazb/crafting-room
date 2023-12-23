import { FC } from 'react';
import styles from './Article.module.css';
import { Article as IArticle } from '@/types/strapi-responses';
import { StrapiImage } from '@/components/strapi-image/strapi-image';
import { markdown, markdownInline } from '@/lib/utils';

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
                <h1 dangerouslySetInnerHTML={markdownInline(article.attributes.title)} />

                {article.attributes.author && (
                    <h5
                        className={styles.author}
                        dangerouslySetInnerHTML={markdownInline(article.attributes.author)}
                    />
                )}

                <div
                    className={styles.articleContent}
                    dangerouslySetInnerHTML={markdown(article.attributes.content)}
                />
            </article>
        </>
    );
};