import { Article, resolveImageUrl } from "@/lib/strapi-client";
import styles from './ArticleTile.module.css'
import { nth } from "@/lib/utils";


export function ArticleTile(props: { key: number, article: Article; }) {
	const { article } = props;

	const date = new Date(article.attributes.createdAt);
	let day = date.toLocaleString('en-uk', { day: 'numeric' });
	day = day + nth(parseInt(day));
	const weekday = date.toLocaleString('en-uk', { weekday: 'short' });
	const month = date.toLocaleString('en-uk', { month: 'short' });

	return (
		<a className={styles.articleTile} href={`news/${article.attributes.title}`}>
			<div className={styles.articleThumbnail} style={{ backgroundImage: `url(${resolveImageUrl(article.attributes.images.data[0])})` }}>
				<div className={styles.articleTitle}>{article.attributes.title}</div>
				<div className={styles.articleAuthor}>{article.attributes.author}</div>
				<div className={styles.articleDate}>{`${weekday}, ${day} ${month}`}</div>
			</div>
		</a>
	);
}

