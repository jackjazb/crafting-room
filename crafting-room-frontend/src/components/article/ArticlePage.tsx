import styles from './ArticlePage.module.css';
import { Article, resolveImageUrl } from '@/lib/strapi-client';

export function ArticlePage(props: { article: Article }) {
    const { article } = props;
    return (
        <>
            <img className={styles.articleTopImage} src={resolveImageUrl(article.attributes.images.data[0])} alt="" />

            <div className={`${styles.article} container`}>
                <h1>{article.attributes.title}</h1>
                <h5 className={styles.author}>{article.attributes.author}</h5>
                <div className={styles.articleContent}>
                    {article.attributes.content}
                </div >
            </div >
        </>
    );
}