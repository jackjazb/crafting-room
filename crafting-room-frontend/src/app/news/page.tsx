import { Article, strapiFetch } from "@/lib/strapi-client";
import { ArticleTile } from "@/components/article/ArticleTile";

async function getArticles() {
	const path = 'articles';
	const params = {
		populate: {
			images: {
				populate: "*"
			}
		},
		sort: ['createdAt:desc']
	};
	const response = await strapiFetch(path, params);
	return response.data;
}

export default async function News() {
	const articles: Array<Article> = await getArticles();

	return (
		<div className="container articles">
			{articles.map(article => {
				return (<ArticleTile key={article.id} article={article} />);
			})}
		</div>
	);
}