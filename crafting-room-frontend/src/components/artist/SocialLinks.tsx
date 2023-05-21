import { LinkType, SocialLink } from "@/lib/strapi-client";
import styles from './SocialLinks.module.css';
import { SiFacebook, SiInstagram, SiLinktree, SiSpotify, SiTwitter } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";

const ICON_SIZE = 30;

const icons = new Map<LinkType, JSX.Element>([
    ['spotify', <SiSpotify size={ICON_SIZE} />],
    ['instagram', <SiInstagram size={ICON_SIZE} />],
    ['facebook', <SiFacebook size={ICON_SIZE} />],
    ['twitter', <SiTwitter size={ICON_SIZE} />],
    ['website', <BsGlobe size={ICON_SIZE} />],
    ['linktree', <SiLinktree size={ICON_SIZE} />]
]);

export function SocialLinks(props: { links: Array<SocialLink> }) {
    const { links } = props;

    return (
        <div className={styles.socialLinks}>
            {links.map(link =>
                <a href={link.link}>
                    {icons.get(link.linktype)}
                </a>)}
        </div>
    )

}