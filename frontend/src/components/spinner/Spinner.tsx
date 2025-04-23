import Image from "next/image";
import styles from "./Spinner.module.scss";

/**
 * The loading spinner icon.
 */
export const Spinner = () => {
    return (
        <div className={styles.wrapper}>
            <Image
                src="/loading.svg"
                alt="Loading..."
                width={50}
                height={50}
                priority
            />
        </div>
    );
};
