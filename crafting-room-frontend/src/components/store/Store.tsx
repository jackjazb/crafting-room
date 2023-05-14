import './Store.css';
import { Release, strapiFetch } from '../../utils/api';
import { useEffect, useState } from 'react';
import { ReleaseGrid } from '../releases/ReleaseGrid';

async function getReleases() {
	const path = 'releases';
	const params = {
		populate: {
			artwork: {
				populate: "*"
			},
			artist: {
				populate: "*"
			}
		},
		sort: ['date:desc']
	};
	const response = await strapiFetch(path, params);
	return response.data;
}

export function Store() {
	const [releases, setReleases]: [Array<Release>, any] = useState([]);

	useEffect(() => {
		getReleases().then(setReleases);
	}, []);

	return (
		<div className="container">
			<h1>Store</h1>
			<h5>
				More available on
				<a href="https://craftingroomrecordings.bandcamp.com/"> Bandcamp</a>
			</h5>
			<ReleaseGrid columns={4} releases={releases} />
		</div>
	);
}