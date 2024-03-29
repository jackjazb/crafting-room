import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { ArticleTile } from '@/components/article/ArticleTile';
import { cms } from '@/lib/server/services';

const NewsPage: NextPage = async () => {
	const articles = await cms.getArticles()
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
