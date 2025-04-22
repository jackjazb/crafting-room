import type { FC } from "react";
import styles from "./Footer.module.scss";
import { IconLink } from "@/components/icon-link/IconLink";

/**
 * The page footer.
 */
export const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <IconLink
                icon="instagram"
                href="https://www.instagram.com/crafting_room"
                aria-label="Visit our Instagram"
            />
            <IconLink
                icon="youtube"
                href="https://www.youtube.com/channel/UCY_H8aUrjvI8iHobz5mi9sQ"
                aria-label="Visit our YouTube"
            />
            <IconLink
                icon="bandcamp"
                href="https://craftingroomrecordings.bandcamp.com"
                aria-label="Visit our Bandcamp"
            />
            <IconLink
                icon="twitter"
                href="https://twitter.com/crafting_room"
                aria-label="Visit our Twitter"
            />
        </footer>
    );
};
