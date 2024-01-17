/* eslint-disable react/jsx-closing-bracket-location */
import { BsGlobe } from 'react-icons/bs';
import { SiSpotify, SiInstagram, SiFacebook, SiTwitter, SiLinktree, SiYoutube, SiBandcamp } from 'react-icons/si';
import { CSSProperties, FC, ReactNode } from 'react';
import { IconBaseProps } from 'react-icons';
import styles from './IconLink.module.scss';
import { SocialLinkType } from '@/lib/types/strapi-data';

type IconType = SocialLinkType
	| 'youtube'
	| 'bandcamp';

type Icons = {
	[key in IconType]: {
		node: ReactNode;
		color: string;
	};
};

const iconProps: IconBaseProps = {
	overflow: 'visible',
	size: 30
};

const iconLinks: Icons = {
	spotify: {
		node: <SiSpotify {...iconProps} />,
		color: '#25d865'
	},
	instagram: {
		node: <SiInstagram {...iconProps} />,
		color: '#f24c5f'
	},
	facebook: {
		node: <SiFacebook {...iconProps} />,
		color: '#0865ff'
	},
	twitter: {
		node: <SiTwitter {...iconProps} />,
		color: '#249ef0'
	},
	website: {
		node: <BsGlobe {...iconProps} />,
		color: '#565656'
	},
	linktree: {
		node: <SiLinktree {...iconProps} />,
		color: '#41e760'
	},
	youtube: {
		node: <SiYoutube {...iconProps} />,
		color: '#ff0000'
	},
	bandcamp: {
		node: <SiBandcamp {...iconProps} />,
		color: '#639aaa'
	}
};

interface Props {
	icon: IconType;
	link: string;
}

/**
 * An icon with a link.
 */
export const IconLink: FC<Props> = props => {
	const icon = iconLinks[props.icon];
	const style = {
		'--icon-link-color': icon.color
	} as CSSProperties;

	return (
		<a
			className={styles.iconLink}
			href={props.link}
			target='_blank'
			rel='noreferrer'
			style={style}
		>
			{icon.node}
		</a>
	);
};