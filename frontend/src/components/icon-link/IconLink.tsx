import type { SocialLinkType } from "@/lib/types";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { CSSProperties, FC, ReactNode } from "react";
import { BsGlobe } from "react-icons/bs";
import { SiBandcamp, SiFacebook, SiInstagram, SiLinktree, SiSpotify, SiX, SiYoutube } from "react-icons/si";
import styles from "./IconLink.module.scss";

const ICON_SIZE = 30;

type Icons = Record<SocialLinkType, {
    node: ReactNode;
    color: string;
}>;

const iconLinks: Icons = {
    spotify: { node: <SiSpotify size={ICON_SIZE} />, color: "#25d865" },
    instagram: { node: <SiInstagram size={ICON_SIZE} />, color: "#f24c5f" },
    facebook: { node: <SiFacebook size={ICON_SIZE} />, color: "#0865ff" },
    twitter: { node: <SiX size={ICON_SIZE} />, color: "#249ef0" },
    website: { node: <BsGlobe size={ICON_SIZE} />, color: "#0fa0ce" },
    linktree: { node: <SiLinktree size={ICON_SIZE} />, color: "#41e760" },
    youtube: { node: <SiYoutube size={ICON_SIZE} />, color: "#ff0000" },
    bandcamp: { node: <SiBandcamp size={ICON_SIZE} />, color: "#639aaa" },
};

type Props = {
    icon: SocialLinkType;
} & LinkProps;

/**
 * An icon with a link.
 */
export const IconLink: FC<Props> = (props) => {
    return (
        <Link
            {...props}
            className={styles.iconLink}
            style={{
                "--icon-link-color": iconLinks[props.icon]?.color
                    ?? "#0fa0ce",
            } as CSSProperties}
            href={props.href}
            target="_blank"
            rel="external"
        >
            {iconLinks[props.icon]?.node ?? <BsGlobe size={ICON_SIZE} />}
        </Link>
    );
};
