import { FC } from 'react';
import styles from './Footer.module.css';
import { IconLink } from '@/components/icon-link/IconLink';

/**
 * The page footer.
 */
export const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<IconLink
				icon='instagram'
				link='https://www.instagram.com/crafting_room'
			/>
			<IconLink
				icon='youtube'
				link='https://www.youtube.com/channel/UCY_H8aUrjvI8iHobz5mi9sQ'
			/>
			<IconLink
				icon='bandcamp'
				link='https://craftingroomrecordings.bandcamp.com'
			/>
			<IconLink
				icon='twitter'
				link='https://twitter.com/crafting_room'
			/>
		</footer>
	);
};