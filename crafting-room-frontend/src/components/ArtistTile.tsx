import { Artist } from '../utils/api'
import '../css/ArtistTile.css'

/**
 * Renders an artist portrait which reveals more detail when clicked
 * @param artist an artist 
 * @returns 
 */
export function ArtistTile(props: { key: number, artist: Artist }) {
	const artist = props.artist;
	console.log(artist);

	const imageUrl = process.env.REACT_APP_STRAPI_URL + artist.attributes.images.data[0].attributes.url;
	return (
		<a href={`artists/${artist.attributes.name.toLowerCase()}`} className="artist" style={{backgroundImage: `url(${imageUrl})`}}>
			<div className="name">{artist.attributes.name}</div>
		</a>
	)
}