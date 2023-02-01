import { useParams } from "react-router-dom";
import { Article, resolveImageUrl, strapiFetch } from "../utils/api";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import '../css/ArticlePage.css';

async function getArticle(name: string) {
	const path = 'articles';
	const params = {
		filters: {
			title: {
				$eqi: name
			}
		},
		populate: {
			images: {
				populate: "*"
			}
		},
	};
	const response = await strapiFetch(path, params);
	return response.data[0];
}

export function ArticlePage() {
	const [article, setArticle] = useState<Article>();
	const name = useParams().name;

	useEffect(() => {
		getArticle(name ? name : '').then(setArticle);
	}, [name]);
	console.log(article);
	if (!article) {
		return (
			<Loading />
		);
	}
	return (
		<>
			<img className="articleTopImage" src={resolveImageUrl(article.attributes.images.data[0])} />

			<div className="container article">
				<h1>{article.attributes.title}</h1>
				<h5 className="author">{article.attributes.author}</h5>
				<div className="articleContent">
					{article.attributes.content}
				</div>
			</div>
		</>
	);
}