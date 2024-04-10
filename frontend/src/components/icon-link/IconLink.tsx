import { BsGlobe } from 'react-icons/bs';
import { SiSpotify, SiInstagram, SiFacebook, SiTwitter, SiLinktree, SiYoutube, SiBandcamp } from 'react-icons/si';
import type { CSSProperties, FC, ReactNode } from 'react';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import styles from './IconLink.module.scss';
import type { SocialLinkType } from '@/lib/types';

const ICON_SIZE = 30;

type Icons = Record<SocialLinkType, {
	node: ReactNode;
	color: string;
}>;

const iconLinks: Icons = {
	Spotify: { node: <SiSpotify size={ICON_SIZE} />, color: '#25d865' },
	Instagram: { node: <SiInstagram size={ICON_SIZE} />, color: '#f24c5f' },
	Facebook: { node: <SiFacebook size={ICON_SIZE} />, color: '#0865ff' },
	Twitter: { node: <SiTwitter size={ICON_SIZE} />, color: '#249ef0' },
	Website: { node: <BsGlobe size={ICON_SIZE} />, color: '#0fa0ce' },
	Linktree: { node: <SiLinktree size={ICON_SIZE} />, color: '#41e760' },
	YouTube: { node: <SiYoutube size={ICON_SIZE} />, color: '#ff0000' },
	Bandcamp: { node: <SiBandcamp size={ICON_SIZE} />, color: '#639aaa' }
};

type Props = {
	icon: SocialLinkType;
} & LinkProps;

/**
 * An icon with a link.
 */
export const IconLink: FC<Props> = props => {
	return (
		<Link
			{...props}
			className={styles.iconLink}
			style={{
				'--icon-link-color': iconLinks[props.icon]?.color
					?? '#0fa0ce'
			} as CSSProperties}
			href={props.href}
			target='_blank'
			rel='external'
		>
			{iconLinks[props.icon]?.node ?? <BsGlobe size={ICON_SIZE} />}
		</Link>
	);
};
