import { BsGlobe } from 'react-icons/bs';
import { SiSpotify, SiInstagram, SiFacebook, SiTwitter, SiLinktree, SiYoutube, SiBandcamp } from 'react-icons/si';
import { FC, ReactNode } from 'react';
import styles from './IconLink.module.scss';
import { LinkType } from '@/types/strapi-responses';

const ICON_SIZE = 30;

type IconType = LinkType
	| 'youtube'
	| 'bandcamp';

type Icons = Record<IconType, {
	node: ReactNode;
	color: string;
}>;

const iconLinks: Icons = {
	spotify: { node: <SiSpotify size={ICON_SIZE} />, color: '#25d865' },
	instagram: { node: <SiInstagram size={ICON_SIZE} />, color: '#f24c5f' },
	facebook: { node: <SiFacebook size={ICON_SIZE} />, color: '#0865ff' },
	twitter: { node: <SiTwitter size={ICON_SIZE} />, color: '#249ef0' },
	website: { node: <BsGlobe size={ICON_SIZE} />, color: '#565656' },
	linktree: { node: <SiLinktree size={ICON_SIZE} />, color: '#41e760' },
	youtube: { node: <SiYoutube size={ICON_SIZE} />, color: '#ff0000' },
	bandcamp: { node: <SiBandcamp size={ICON_SIZE} />, color: '#639aaa' }
};

type Props = {
	icon: IconType;
	link: string;
};

/**
 * An icon with a link.
 */
export const IconLink: FC<Props> = props => {
	return (
		<a
			className={styles.iconLink}
			href={props.link}
			target='_blank'
			rel='noreferrer'
			style={{
				'--icon-link-color': iconLinks[props.icon].color
			} as React.CSSProperties}
		>
			{iconLinks[props.icon].node}
		</a>
	);
};