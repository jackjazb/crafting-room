import { FC } from 'react';
import styles from './ArticleTile.module.css';
import { Article } from '@/types/strapi-responses';
import { getDateParts, md } from '@/lib/utils';
import { strapi } from '@/lib/api/strapi-client';

/**
 * An article tile within the news articles list.
 */
export const ArticleTile: FC<{ article: Article; }> = ({ article }) => {
	const { day, weekday, month } = getDateParts(article.attributes.createdAt);

	return (
		<a
			className={styles.articleTile}
			href={`news/${article.attributes.title}`}
		>
			<div
				className={styles.articleThumbnail}
				style={{ backgroundImage: `url(${strapi.imageFormat('medium', article.attributes.images.data[0]).url})` }}
			>
				<span //TODO -> h2 this
					className={styles.articleTitle}
					dangerouslySetInnerHTML={{ __html: md.renderInline(article.attributes.title) }}
				/>

				{article.attributes.author && (
					<span //TODO -> h5 this
						className={styles.articleAuthor}
						dangerouslySetInnerHTML={{ __html: md.renderInline(article.attributes.author) }}
					/>
				)}

				<div className={styles.articleDate}>
					{`${weekday}, ${day} ${month}`}
				</div>
			</div>
		</a>
	);
};

