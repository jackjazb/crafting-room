import type { FC } from "react";
import styles from "./ReleaseGrid.module.scss";
import { ReleaseTile } from "./ReleaseTile";
import type { Release } from "@/lib/types";

type Props = {
    className?: string | undefined;
    releases: Release[];
    order?: "date";
};

export const ReleaseGrid: FC<Props> = (props) => {
    if (props.order === "date")
        props.releases.sort((a, b) => {
            const aDate = new Date(a.attributes.date);
            const bDate = new Date(b.attributes.date);

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
