import { FC } from 'react';
import styles from './Article.module.css';
import { Article as StrapiArticle } from '@/types/strapi-responses';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';
import { md, mdi } from '@/lib/utils';

type Props = {
    article: StrapiArticle;
};

/**
 * An article on a news article page.
 */
export const Article: FC<Props> = props => {
    return (
        <>
            <StrapiImage
                className={styles.articleTopImage}
                image={props.article.attributes.images.data[0]}
                format='xlarge'
                priority
            />

            <article className='container'>
                <h1 dangerouslySetInnerHTML={mdi(props.article.attributes.title)} />
                <h5
                    className={styles.author}
                    dangerouslySetInnerHTML={mdi(props.article.attributes.author)}
                />
                <div dangerouslySetInnerHTML={md(props.article.attributes.content)} />
            </article>
        </>
    );
};