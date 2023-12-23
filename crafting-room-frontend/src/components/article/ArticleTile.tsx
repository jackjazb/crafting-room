import { FC } from 'react';
import styles from './ArticleTile.module.css';
import { Article } from '@/types/strapi-responses';
import { backgroundCSS, formatDate, markdownInline } from '@/lib/utils';

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
				style={backgroundCSS(article.attributes.images.data[0], 'medium')}
			>
				<span //TODO -> h2/h3/h4/h5 this
					className={styles.articleTitle}
					dangerouslySetInnerHTML={markdownInline(article.attributes.title)}
				/>

				{article.attributes.author && (
					<span //TODO -> h2/h3/h4/h5 this (lower than above)
						className={styles.articleAuthor}
						dangerouslySetInnerHTML={markdownInline(article.attributes.author)}
					/>
				)}

				<div className={styles.articleDate}>
					{formatDate(article.attributes.createdAt)}
				</div>
			</div>
		</a>
	);
};

