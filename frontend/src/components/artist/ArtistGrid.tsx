import { ArtistTile } from "@/components/artist/ArtistTile";
import { Artist } from "@/lib/server/content";
import styles from "./ArtistGrid.module.scss";

type Props = {
    artists: Artist[];
};

export const ArtistGrid = (props: Props) => {
    return (
        <div className={styles.artistGrid}>
            {props.artists.map(artist => (
                <ArtistTile
                    key={artist.id}
                    artist={artist}
                />
            ))}
        </div>
    );
};
