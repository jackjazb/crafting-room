import { FC } from 'react';
import styles from './ArticleTile.module.css';
import { Article } from '@/types/strapi-responses';
import { formatDate, md } from '@/lib/utils';
import { strapi } from '@/lib/api/strapi-client';

/**
 * An article tile within the news articles list.
 */
export const ArticleTile: FC<{ article: Article; }> = ({ article }) => {
	return (
		<a
			className={styles.articleTile}
			href={`news/${article.attributes.title}`}
		>
			<div
				className={styles.articleThumbnail}
				style={strapi.resolveBackgroundImage(article.attributes.images.data[0], 'medium')}
			>
				<span //TODO -> h2/h3/h4/h5 this
					className={styles.articleTitle}
					dangerouslySetInnerHTML={{ __html: md.renderInline(article.attributes.title) }}
				/>

				{article.attributes.author && (
					<span //TODO -> h2/h3/h4/h5 this (lower than above)
						className={styles.articleAuthor}
						dangerouslySetInnerHTML={{ __html: md.renderInline(article.attributes.author) }}
					/>
				)}

				<div className={styles.articleDate}>
					{formatDate(article.attributes.createdAt)}
				</div>
			</div>
		</a>
	);
};

