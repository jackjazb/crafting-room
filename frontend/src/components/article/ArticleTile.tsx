import type { FC } from 'react';
import Link from 'next/link';
import styles from './ArticleTile.module.scss';
import type { Article } from '@/lib/types';
import { formatDate, createClass, mdi } from '@/lib/utils';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';

interface Props {
	article: Article;
}

/**
 * An article tile within the news articles list.
 */
export const ArticleTile: FC<Props> = props => {
	return (
		<div className={styles.wrapper}>
			<Link
				className={styles.articleTile}
				href={`/news/${props.article.attributes.slug}`}
				aria-label={`View the article '${props.article.attributes.title}'`}
			>
				<StrapiImage
					className={styles.image}
					image={props.article.attributes.images.data[0]}
					format='xlarge'
					alt={props.article.attributes.title}
				/>

				<div className={styles.overlay}>
					<div
						className={createClass(
							styles.title,
							'overlay-text'
						)}
						dangerouslySetInnerHTML={mdi(props.article.attributes.title)}
					/>
					<div
						className={createClass(
							styles.author,
							'overlay-text',
							'overlay-text--small'
						)}
						dangerouslySetInnerHTML={mdi(props.article.attributes.author)}
					/>
					<div
						className={createClass(
							styles.date,
							styles.dateAbbr,
							'overlay-text'
						)}
					>
						{formatDate(props.article.attributes.createdAt, 'abbreviated')}
					</div>
					<div
						className={createClass(
							styles.date,
							styles.dateFull,
							'overlay-text'
						)}
					>
						{formatDate(props.article.attributes.createdAt, 'full')}
					</div>
				</div>
			</Link>
		</div>
	);
};

