import { useEffect, useState } from "react";
import { Homepage, strapiFetch } from "../utils/api";
import { Loading } from "./Loading";
import { ReleaseGrid } from "./ReleaseGrid";

async function getHomepage(): Promise<Homepage> {
	const path = 'homepage';
	const params = {
		populate: {
			feature: {
				populate: "*"
			},
			releases: {
				populate: "*"
			}
		}
	};

	const response = await strapiFetch(path, params);
	console.log(response);
	return response.data;
}

export function Home() {
	const [homepage, setHomepage] = useState<Homepage>();

	useEffect(() => {
		getHomepage().then(setHomepage);
	}, []);

	if (!homepage) {
		return <Loading></Loading>;
	}

	const featureImageUrl = process.env.REACT_APP_STRAPI_URL + homepage.attributes.feature.data.attributes.images.data[0].attributes.url;

	return (
		<div>
			<a href={`articles/${homepage.attributes.feature.data.attributes.title}`}>
				<div className="featuredImage" style={{ backgroundImage: `url(${featureImageUrl})` }}>
					<div className="featureTitle">{homepage.attributes.feature.data.attributes.title}</div>
				</div>
			</a>
			<div className="featuredReleases">
				<h1>Featured Releases</h1>
				<ReleaseGrid columns={4} releases={homepage.attributes.releases.data} />
			</div>
		</div>
	);
}