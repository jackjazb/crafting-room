import { SiFacebook, SiInstagram, SiLinktree, SiSpotify, SiTwitter } from 'react-icons/si';
import { BsGlobe } from 'react-icons/bs';
import { FC } from 'react';
import styles from './SocialLinks.module.css';
import { LinkType, SocialLink } from '@/types/strapi-responses';

const ICON_SIZE = 30;

const icons: Record<LinkType, JSX.Element> = {
    spotify: <SiSpotify size={ICON_SIZE} />,
    instagram: <SiInstagram size={ICON_SIZE} />,
    facebook: <SiFacebook size={ICON_SIZE} />,
    twitter: <SiTwitter size={ICON_SIZE} />,
    website: <BsGlobe size={ICON_SIZE} />,
    linktree: <SiLinktree size={ICON_SIZE} />
};

/**
 * Social links for an artist.
 */
export const SocialLinks: FC<{ links: Array<SocialLink>; }> = ({ links }) => {
    return (
        <div className={styles.socialLinks}>
            {links.map(link => (
                <a
                    key={link.linktype}
                    href={link.link}
                    target='_blank'
                    rel='noreferrer'
                >
                    {icons[link.linktype]}
                </a>
            ))}
        </div>
    );
};