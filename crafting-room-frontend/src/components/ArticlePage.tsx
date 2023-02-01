import { useParams } from "react-router-dom";
import { Article, strapiFetch } from "../utils/api";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";

async function getArticle(name: string) {
	const path = 'articles';
	const params = {
		filters: {
			title: {
				$eqi: name
			}
		},
		populate:{
			images:{
				populate: "*"
			}
		}
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
	if(!article){
		return (
			<Loading/>
		)
	}
	return (
		<div className="container">
			<h1>{article.attributes.title}</h1>
			<div className="articleContent">
				{article.attributes.content}
			</div>
		</div>
	);
}