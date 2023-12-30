import type { FC } from 'react';
import Link from 'next/link';
import styles from './ArticleTile.module.scss';
import type { Article } from '@/lib/types';
import { formatDate, makeClass, mdi } from '@/lib/utils';
import { media } from '@/lib/server/services';

type Props = {
	article: Article;
};

/**
 * An article tile within the news articles list.
 */
export const ArticleTile: FC<Props> = props => {
	return (
		// TODO: potentially convert this to StrapiImage like other tiles?
		<div className={styles.tile}>
			<Link
				className={styles.link}
				href={`/news/${props.article.attributes.slug}`}
				style={media.createBackground(
					props.article.attributes.images.data[0],
					'xlarge'
				)}
			>
				<div
					className={makeClass(
						styles.title,
						'overlay-text'
					)}
					dangerouslySetInnerHTML={mdi(props.article.attributes.title)}
				/>
				<div
					className={makeClass(
						styles.author,
						'overlay-text',
						'overlay-text--small'
					)}
					dangerouslySetInnerHTML={mdi(props.article.attributes.author)}
				/>
				<div
					className={makeClass(
						styles.date,
						'overlay-text',
						'overlay-text--small'
					)}
				>
					{formatDate(props.article.attributes.createdAt, 'abbreviated')}
				</div>
			</Link>
		</div>
	);
};

