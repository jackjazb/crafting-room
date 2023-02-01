import { useEffect, useState } from "react";
import { Article, strapiFetch } from "../utils/api";
import { Loading } from "./Loading";
import { ArticleTile } from "./ArticleTile";
import '../css/News.css';

async function getArticles() {
	const path = 'articles';
	const params = {
		populate: {
			images: {
				populate: "*"
			}
		}
	};
	const response = await strapiFetch(path, params);
	console.log(response.data);
	return response.data;
}

export function News() {
	const [articles, setArticles]: [Array<Article>, any] = useState([]);

	useEffect(() => {
		getArticles().then(setArticles);
	}, []);

	if (articles.length === 0) {
		return (
			<Loading />
		);
	}

	return (
		<div className="container articles">
			{articles.map(article => {
				return (<ArticleTile key={article.id} article={article}/>);
			})}
		</div>
	);
}