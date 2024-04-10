import type { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';
import { ArticleTile } from '@/components/article/ArticleTile';
import { cms } from '@/lib/server/services';

export const generateMetadata = async (): Promise<Metadata> => {
	const data = await cms.getNewsPage()
		.catch(notFound);

	return {
		title: 'Crafting Room Recordings • News',
		description: data.attributes.meta.description
	};
};

const NewsPage: NextPage = async () => {
	const data = await cms.getArticles()
		.catch(notFound);

	return (
		<main>
			<section className='container'>
				{data.map(article => (
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
