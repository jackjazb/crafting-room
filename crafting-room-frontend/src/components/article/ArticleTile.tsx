import { FC } from 'react';
import styles from './ArticleTile.module.scss';
import { Article } from '@/types/strapi-responses';
import { formatDate, makeClass, mdi } from '@/lib/utils';
import { backgroundCSS } from '@/lib/server/utils';

type Props = {
	article: Article;
};

/**
 * An article tile within the news articles list.
 */
export const ArticleTile: FC<Props> = props => {
	return (
		<a
			className={styles.articleTile}
			href={`/news/${props.article.attributes.slug}`}
		>
			<div //TODO -> potentially convert this to StrapiImage like other tiles?
				className={styles.articleThumbnail}
				style={backgroundCSS(props.article.attributes.images.data[0], 'medium')}
			>
				<div
					className={makeClass(
						styles.articleTitle,
						'overlay-text'
					)}
					dangerouslySetInnerHTML={mdi(props.article.attributes.title)}
				/>
				<div
					className={makeClass(
						styles.articleAuthor,
						'overlay-text',
						'overlay-text--small'
					)}
					dangerouslySetInnerHTML={mdi(props.article.attributes.author)}
				/>
				<div
					className={makeClass(
						styles.articleDate,
						'overlay-text',
						'overlay-text--small'
					)}
				>
					{formatDate(props.article.attributes.createdAt)}
				</div>
			</div>
		</a>
	);
};

