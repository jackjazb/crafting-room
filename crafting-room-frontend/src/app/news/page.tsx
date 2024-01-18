import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { ArticleTile } from '@/components/article/ArticleTile';
import { strapi } from '@/lib/server/services';

const NewsPage: NextPage = async () => {
	const articles = await strapi.getArticles()
		.catch(notFound);

	return (
		<main>
			<section className='container'>
				{articles.map(article => (
					<ArticleTile
						key={article.id}
						article={article}
					/>
				))}
			</section>
		</main>
	);
};

export default NewsPage;