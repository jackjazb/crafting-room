import { SiInstagram, SiBandcamp, SiYoutube, SiTwitter } from 'react-icons/si';
import { FC } from 'react';
import styles from './Footer.module.css';

const SOCIAL_ICON_SIZE = 30;

/**
 * The page footer.
 */
export const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<a
				href='https://www.instagram.com/crafting_room/?hl=en'
				target='_blank'
				rel='noreferrer'
			>
				<SiInstagram size={SOCIAL_ICON_SIZE - 5} />
			</a>
			<a
				href='https://www.youtube.com/channel/UCY_H8aUrjvI8iHobz5mi9sQ'
				target='_blank'
				rel='noreferrer'
			>
				<SiYoutube size={SOCIAL_ICON_SIZE} />
			</a>
			<a
				href='https://craftingroomrecordings.bandcamp.com/'
				target='_blank'
				rel='noreferrer'
			>
				<SiBandcamp size={SOCIAL_ICON_SIZE} />
			</a>
			<a
				href='https://twitter.com/crafting_room'
				target='_blank'
				rel='noreferrer'
			>
				<SiTwitter size={SOCIAL_ICON_SIZE} />
			</a>
		</footer>
	);
};