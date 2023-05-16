import { SiInstagram, SiBandcamp, SiYoutube, SiTwitter } from 'react-icons/si'
import styles from './Footer.module.css';

const SOCIAL_ICON_SIZE = 30;

export function Footer() {
	return (
		<div className={styles.footer}>
			<a href="https://www.instagram.com/crafting_room/?hl=en"><SiInstagram size={SOCIAL_ICON_SIZE - 5} /></a>
			<a href="https://www.youtube.com/channel/UCY_H8aUrjvI8iHobz5mi9sQ"><SiYoutube size={SOCIAL_ICON_SIZE} /></a>
			<a href="https://craftingroomrecordings.bandcamp.com/"><SiBandcamp size={SOCIAL_ICON_SIZE} /></a>
			<a href="https://twitter.com/crafting_room"><SiTwitter size={SOCIAL_ICON_SIZE} /></a>
		</div>
	)
}