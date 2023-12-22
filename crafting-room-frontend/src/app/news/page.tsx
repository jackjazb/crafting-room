import { NextPage } from 'next';
import { ArticleTile } from '@/components/article/ArticleTile';
import { strapi } from '@/lib/api/strapi-client';

const NewsPage: NextPage = async () => {
	const res = await strapi.getArticles();
	const articles = res.data;

	return (
		<div className='container articles'>
			{articles.map(article => (
				<ArticleTile
					key={article.id}
					article={article}
				/>
			))}
		</div>
	);
};

export default NewsPage;