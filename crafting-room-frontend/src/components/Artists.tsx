import { useEffect, useState } from "react";
import { Artist, strapiFetch} from "../utils/api";
import { ArtistTile } from "./ArtistTile";
import { Loading } from "./Loading";

async function getArtists(){
	const path = 'artists';
	const params = {
		populate: {
			images: {
				populate: "*"
			}
		}
	}
	const response = await strapiFetch(path, params);
	return response.data;
}

export function Artists() {
	const [artists, setArtists]: [Array<Artist>, any] = useState([]);


	useEffect(() => {
		getArtists().then(setArtists);
	}, [])

	if(artists.length === 0){
		return (<Loading/>)
	}
	return (
		<div className="artists container">
			{artists.map(artist => (
				<ArtistTile key={artist.id} artist={artist}/>
			))}
		</div>);
}