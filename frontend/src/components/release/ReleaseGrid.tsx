import { Release } from "@/lib/server/content";
import styles from "./ReleaseGrid.module.scss";
import { ReleaseTile } from "./ReleaseTile";

type Props = {
    className?: string | undefined;
    releases: Release[];
    order?: "date";
};

export const ReleaseGrid = (props: Props) => {
    if (props.order === "date")
        props.releases.sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);

            if (aDate > bDate)
                return -1;
            else if (aDate < bDate)
                return 1;
            else
                return 0;
        });

    return (
        <div className={styles.releaseGrid}>
            {props.releases.map(release => (
                <ReleaseTile
                    key={release.id}
                    release={release}
                />
            ))}
        </div>
    );
};
