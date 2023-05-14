import { Article, resolveImageUrl } from "../../utils/api";
import { nth } from "../../utils/helpers";

export function ArticleTile(props: { key: number, article: Article; }) {
	const article = props.article;

	const date = new Date(article.attributes.createdAt);
	let day = date.toLocaleString('en-uk', { day: 'numeric' });
	day = day + nth(parseInt(day));
	const weekday = date.toLocaleString('en-uk', { weekday: 'short' });
	const month = date.toLocaleString('en-uk', { month: 'short' });

	return (
		<a className="articleTile" href={`articles/${article.attributes.title}`}>
			<div className="articleThumbnail" style={{ backgroundImage: `url(${resolveImageUrl(article.attributes.images.data[0])})` }}>
				<div className="articleTitle">{article.attributes.title}</div>
				<div className="articleAuthor">{article.attributes.author}</div>
				<div className="articleDate">{`${weekday}, ${day} ${month}`}</div>
			</div>
		</a>
	);
}

